import { useQuery } from '@tanstack/react-query';

import useAxiosCommon from './useAxiosCommon';
import useAuth from './useAuth';

const   useMyListing = () => {
    const {user,loading}=useAuth()
    const axiosCommon=useAxiosCommon()
    const {data:listing=[], refetch}=useQuery({
        enabled:user?.email && !loading,
        queryKey:[axiosCommon,user?.email],
        queryFn:async()=>{
            const res=await axiosCommon.get(`/listing/${user?.email}`)
            return res.data
        }
    })
    return [listing,refetch]
};

export default useMyListing;