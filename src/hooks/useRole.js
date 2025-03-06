
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const {user,loading}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data:role='',isLoading}=useQuery({
        enabled:!!user && !loading,
        queryKey:[axiosSecure,user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/user/${user?.email}`)
            return res.data.role
        }
    })
    return [role,isLoading]
};

export default useRole;