import { useQuery } from '@tanstack/react-query';

import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';



const   useMyListing = () => {
    
    const axiosSecure=useAxiosSecure()

    const {user}=useAuth()
    const {data:my_addData = [], refetch}=useQuery({
        queryKey:['listing',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/listing/${user?.email}`)
            return res.data
        }
        
    })

    return [my_addData,refetch]
};

export default useMyListing;