

// import '../styles/common.css';

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ setIsOpen, totalPrice ,room,refetch}) => {
    const axiosCommon = useAxiosCommon()
    const stripe = useStripe();
    const elements = useElements();
    const [client_secret, setClient_secret] = useState()
    const [error, setError] = useState('')
    const {user}=useAuth()
    console.log(room);
    useEffect(() => {
        axiosCommon.post('/create-payment-intent', { totalPrice })
            .then(res => {
                console.log(res.data.client_secret);
                setClient_secret(res.data.client_secret)
            })
    }, [])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }
        // confirm payments
        const { paymentIntent, error: confirmErro } = await stripe.confirmCardPayment(
            client_secret,
            {
                payment_method: {
                    card: card,
                },
            }
        );
        if (confirmErro) {
            setError(confirmErro.message)
            return
        }
        if(paymentIntent.status==='succeeded'){
            
            const bookingInfo={
                ...room,
                totalPrice:totalPrice,
                paymentsStatus:paymentIntent.status,
                transactions:paymentIntent.id,
                roomId:room?._id,
                guest:{
                    email:user?.email,
                    name:user?.displayName
                }
            }
            delete bookingInfo._id
            const {data:confirmBooking}=await axiosCommon.post('/my-booking',bookingInfo)
            console.log(confirmBooking);
            // console.log(paymentIntent);
            const {data:updateBooked}=await axiosCommon.patch(`/room/update/booked/${room?._id}`,{booked:true})
            refetch()
            console.log(updateBooked);
            setError('')
            // event.target.reset()
        }
        console.log(paymentIntent.status);
        // console.log(confirmErro);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="flex gap-4">
                    <button className='btn bg-green-500 py-2 px-3 rounded-md text-white font-medium' onClick={handleSubmit}>Payment</button>
                    <button className='btn bg-red-500 py-2 px-3 rounded-md text-white font-medium' onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};
CheckoutForm.propTypes = {
    setIsOpen: PropTypes.func,
    totalPrice: PropTypes.number,
    room:PropTypes.object,
    refetch:PropTypes.func
}
export default CheckoutForm
