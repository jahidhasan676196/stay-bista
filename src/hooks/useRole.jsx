// import useQuery from '@tanstack/react-query'

import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";
import useAuth from "./useAuth";

const useRole = () => {
    const axiosCommon=useAxiosCommon()
    const {user,loading}=useAuth()
    const {data:role=[], isLoading}=useQuery({
        enabled: user?.email && !loading,
        queryKey:[axiosCommon,user?.email],
        queryFn:async()=>{
            const res=await axiosCommon.get(`/users/${user?.email}`)
            return res.data.role
        }
    })
    return [role,isLoading]
};

export default useRole;