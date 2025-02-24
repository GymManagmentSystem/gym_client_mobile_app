import { AxiosError } from "axios";
import axiosInstance from "../api/AxiosInstance";
import { Member } from "../interfaces/Member";
import { useQuery } from "@tanstack/react-query";

interface SuccessResponse{
    data:{
        member:Member
    }
}

interface ErrorResponse{
    errorMessage:string
}



const useGetMemberDetailsById=(memberId:number)=>{


    const getMemberDetails=async()=>{
        try{
            const result=await axiosInstance.get<SuccessResponse>(`/members/${memberId}`);
            return result.data.data.member
        }catch(e){
            if(e instanceof AxiosError){
                const error=((e.response?.data) as ErrorResponse).errorMessage||"Request failed"
                console.log(error);
                throw new Error(error);
            }
            throw new Error("unexpected error occured")
        }
    }

    return useQuery<Member,Error>({
        queryKey:['memberDetailsById',memberId],
        queryFn:getMemberDetails
    })
    
}

export default useGetMemberDetailsById;