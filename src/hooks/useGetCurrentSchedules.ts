import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/AxiosInstance";
import { AxiosError } from "axios";
import { ScheduleExercise } from "../interfaces/currentSchedules";


interface SuccessResponse{
    dataList:ScheduleExercise[]
}


interface ErrorResponse{
    errorMessage:string
}

const useGetCurrentSchedules=(memberId:number)=>{
    console.log("member id",memberId);
    const getCurrentSchedule=async()=>{
        try{
        const {data}=await axiosInstance.get<SuccessResponse>(`/schedules/current/${memberId}`)
        console.log(data.dataList)
        return data.dataList;
        }catch(e){
            console.log(e)
            if(e instanceof AxiosError){
                const error=((e.response?.data) as ErrorResponse).errorMessage || "Request failed"
                throw new Error(error)
                        }
            
                throw new Error("Un expected error occured")
        }
    }

    return useQuery<ScheduleExercise[],Error>({
        queryKey:["currentScheduleList",memberId],
        queryFn:getCurrentSchedule
    })

}
export default useGetCurrentSchedules;