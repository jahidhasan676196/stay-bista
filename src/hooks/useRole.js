
import useAuth from './useAuth';
import useAxiosCommon from './useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const {user}=useAuth()
    const axiosCommon=useAxiosCommon()
    const {data:role=''}=useQuery({
        queryKey:[],
        queryFn:async()=>{
            const res=await axiosCommon.get(`/user/${user?.email}`)
            return res.data.role
        }
    })
    return [role]
};

export default useRole;