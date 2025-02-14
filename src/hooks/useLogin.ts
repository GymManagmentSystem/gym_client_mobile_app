import { useMutation } from '@tanstack/react-query'
import axios, {  AxiosError } from "axios"
import axiosInstance from '../api/AxiosInstance'



interface UserCredentials{
    userName:string,
    password:string
}

interface SuccessResponse{
    successMessage:String,
    token:String
}

interface ErrorResponse{
    error:string
}


const useLogin = () => {
    return useMutation<SuccessResponse,AxiosError<ErrorResponse>,UserCredentials>({
        mutationFn:async({userName,password}:UserCredentials)=>{
            try{
                const {data}=await axiosInstance.post<SuccessResponse>('/auth/token',{
                        userName:userName,
                        password:password,
                        userType:"MEMBER"
                })
                axiosInstance.defaults.headers.common['Authorization']=`Bearer ${data.token}`
                return data;
            }catch(e){
                if(e instanceof AxiosError){
                    const error=((e.response?.data) as ErrorResponse).error||"Request failed"
                    console.log(error);
                    throw new Error(error);
                }
                throw new Error("unexpected error occured")
            }
        }
    })
}

export default useLogin