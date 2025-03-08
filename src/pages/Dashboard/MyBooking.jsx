// import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import BookingDataRow from './BookingDataRow'
import useAuth from '../../hooks/useAuth'
import {useQuery }from '@tanstack/react-query'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'




const MyBooking = () => {
  const axiosSecure=useAxiosSecure()
  // const [bookings,setBookings]=useState([])
  const {user}=useAuth()
  // useEffect(()=>{
  //   axiosSecure.get(`/mybooking/${user?.email}`)
  //   .then(res=>{
  //     console.log(res.data);
  //     setBookings(res.data)
  //   })
  // },[])
  const {data:bookings=[],isPending,refetch}=useQuery({
    queryKey:['mybooking',user?.email],
    queryFn:async()=>{
      const res=await axiosSecure.get(`/mybooking/${user?.email}`)
      console.log(res.data);
      return res.data
    }
  })
  console.log(bookings);
  return (
    <>
      <Helmet>
        <title>My Bookings</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Info
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      From
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      To
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{/* Table Row Data */}
                  {
                    isPending && <LoadingSpinner></LoadingSpinner>
                  }
                  {bookings.map(booking=><BookingDataRow key={booking._id} booking={booking} refetch={refetch}></BookingDataRow>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyBooking