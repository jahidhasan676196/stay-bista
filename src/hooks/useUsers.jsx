import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useRole from "./useRole";
import useAuth from "./useAuth";


const useUsers = () => {
    const [role]=useRole()
    const {loading}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data:users=[],refetch}=useQuery({
        enabled:role==='admin' && !loading,
        queryKey:['users'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/users')
            return res.data
        }
    })
    return [users,refetch];
};

export default useUsers;