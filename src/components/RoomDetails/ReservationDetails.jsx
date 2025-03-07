import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';
import moment from 'moment/moment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '../RoomDetails/Common.css'
import CheckoutForm from './CheckoutForm';
// import { useState } from 'react'


const ReservationDetails = ({ isOpen, setIsOpen, room, totalnight, refetch }) => {
  const { user } = useAuth()
  const stripePromise = loadStripe(import.meta.env.VITE_stripe_publishibe_key);
  const totalPrice = room?.price * parseInt(totalnight)
  // let [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-2xl rounded-md text-current space-y-4 border bg-[#f4f4f4] p-12">
            <DialogTitle className="font-bold text-2xl text-neutral-900 ">Payment Details:</DialogTitle>
            <Description className="text-lg font-semibold text-neutral-800">{room?.title.slice(0, 40)}..</Description>
            <div>
              <p className='text-base font-medium text-neutral-700'>Duration: {moment(room.from).format("MMM Do YY")} {'---->'} {moment(room.to).format("MMM Do YY")} </p>
              <p className='text-base font-medium text-neutral-700'>Email: {user?.email}</p>
              <p className='text-base font-medium text-neutral-700'>Total price: ${totalPrice}</p>
            </div>
            <div>
              <Elements stripe={stripePromise}>
                <CheckoutForm isOpen={isOpen} setIsOpen={setIsOpen} totalPrice={totalPrice} room={room} refetch={refetch} />
              </Elements>
            </div>
            {/* <div className="flex gap-4">
              <button className='btn bg-green-500 py-2 px-3 rounded-md text-white font-medium' onClick={() => setIsOpen(false)}>Payment</button>
              <button className='btn bg-red-500 py-2 px-3 rounded-md text-white font-medium' onClick={() => setIsOpen(false)}>Cancel</button>
            </div> */}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
ReservationDetails.propTypes = {
  isOpen: PropTypes.element,
  setIsOpen: PropTypes.element,
  room: PropTypes.object,
  totalnight: PropTypes.number,
  refetch:PropTypes.func
}

export default ReservationDetails;