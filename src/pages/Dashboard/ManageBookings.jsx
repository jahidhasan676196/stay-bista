import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import RoomBookingDataRow from './RoomBookingDataRow'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'


const ManageBookings = () => {
  const axiosSecure=useAxiosSecure()
  const {user}=useAuth()
  const {data:bookingRooms=[],isPending,refetch}=useQuery({
    queryKey:['booking-room',user?.email],
    queryFn:async()=>{
      const {data}=await axiosSecure.get(`/booking-room/${user?.email}`)
      return data
  
    }
  })
  console.log(bookingRooms);
  return (
    <>
      <Helmet>
        <title>Manage Bookings</title>
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
                      Guest Info
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
                <tbody>{/* Table row data */}
                  {isPending && <LoadingSpinner></LoadingSpinner>}
                  {
                    bookingRooms.map( booking=><RoomBookingDataRow key={booking._id} booking={booking} refetch={refetch}></RoomBookingDataRow>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageBookings