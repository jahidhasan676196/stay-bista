import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";


const useUsers = () => {
    const axiosCommon=useAxiosCommon()
    const {data:users=[],refetch}=useQuery({
        queryKey:[axiosCommon],
        queryFn:async()=>{
            const res=await axiosCommon.get('/users')
            return res.data
        }
    })
    return [users,refetch];
};

export default useUsers;