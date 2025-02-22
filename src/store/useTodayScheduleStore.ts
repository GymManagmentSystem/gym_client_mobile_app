import { create } from "zustand";
import { TrackedExercise } from "../interfaces/TrackedExercise";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalStoredExercise } from "../interfaces/LocalStoredExercise";




interface ScheduleState{
    scheduleExerciseList:TrackedExercise[],
    getExerciseByName:(exerciseName:string)=>TrackedExercise|null,
    setInitialScheduleExercise:(exercises:TrackedExercise[])=>void,
    updateScheduleExercise:(exerciseName:string,remainingTime?:number)=>void,
    getNoOfCompletedExercise:(status:"Completed"|"Pending")=>number
}

export const useScheduleExerciseStore=create<ScheduleState>((set,get)=>({
    scheduleExerciseList:[],
    getExerciseByName:(exerciseName)=>{
        return get().scheduleExerciseList.find((exercise)=>exercise.exerciseName===exerciseName)||null
    },
    setInitialScheduleExercise:(exercises)=>{
        set(()=>{
            if(exercises.length>0){
                const initializedExerciseList:TrackedExercise[]=exercises.map((exercise,index)=>({
                    exerciseName:exercise.exerciseName,
                    totalSets:exercise.totalSets??0,
                    duration:exercise.duration??0,
                    totalDuration:exercise.duration??0,
                    completedSets:exercise.completedSets??0,
                    exerciseStatus:exercise.exerciseStatus
                }))
                console.log("initializes list is : ",JSON.stringify(initializedExerciseList));
                return{scheduleExerciseList:initializedExerciseList}
            }
            return {scheduleExerciseList:[]}
        })
    },
    updateScheduleExercise:async(exerciseName,remainingTime)=>{
        set((store)=>{
            const selectedExercise=store.scheduleExerciseList.find((exercise)=>exercise.exerciseName===exerciseName)

            if(!selectedExercise){
                return store
            }

            if(selectedExercise?.totalSets>0){
                if(selectedExercise.completedSets<selectedExercise.totalSets-1){
                    const completedSets=selectedExercise.completedSets+1;
                    console.log(JSON.stringify(selectedExercise))
                    console.log("total noof sets are : "+selectedExercise.totalSets)
                    console.log("completed noof sets are : "+completedSets)
                    return {
                        scheduleExerciseList:store.scheduleExerciseList.map((exercise)=>(
                            exercise.exerciseName==exerciseName?
                            {...exercise,completedSets:completedSets}:exercise
                        ))
                    }
                }

                const currentIndex=store.scheduleExerciseList.findIndex((exercise)=>exercise.exerciseName===exerciseName)

                return {
                    scheduleExerciseList:store.scheduleExerciseList.map((exercise,index)=>{
                        if (index === currentIndex) {
                            console.log("next exercise is : "+exercise.exerciseName)
                            return { ...exercise, exerciseStatus: "Completed" }; // Mark next exercise as active
                        }
                        if (index === currentIndex + 1) {
                            console.log("next exercise is : "+exercise.exerciseName)
                            return { ...exercise, exerciseStatus: "OnGoing" }; // Mark next exercise as active
                        }
                        return exercise;
                    })
                }
            }else{
                if (remainingTime !== undefined) {
                    if(remainingTime != 0){
                        return {
                            scheduleExerciseList:store.scheduleExerciseList.map((exercise)=>(
                                exercise.exerciseName===exerciseName?
                                {...exercise,duration:remainingTime}:exercise
                            ))
                        }
                    }
                    const currentIndex=store.scheduleExerciseList.findIndex((exercise)=>exercise.exerciseName===exerciseName)

                return {
                    scheduleExerciseList:store.scheduleExerciseList.map((exercise,index)=>{
                        if (index === currentIndex) {
                            console.log("next exercise is : "+exercise.exerciseName)
                            return { ...exercise, exerciseStatus: "Completed" }; // Mark next exercise as active
                        }
                        if (index === currentIndex + 1) {
                            console.log("next exercise is : "+exercise.exerciseName)
                            return { ...exercise, exerciseStatus: "OnGoing" }; // Mark next exercise as active
                        }
                        return exercise;
                    })
                }
                }
                
                return {
                    scheduleExerciseList:store.scheduleExerciseList.map((exercise)=>(
                        exercise.exerciseName===exerciseName?
                        {...exercise,exerciseStatus:"Pending"}:exercise
                    ))
                }

            }
        })

        try{
            const storedScheduleStr=await AsyncStorage.getItem('todaySchedule');
            const storedSchedule:LocalStoredExercise[]=storedScheduleStr?JSON.parse(storedScheduleStr):[]

            const updateSchedule:TrackedExercise[]=get().scheduleExerciseList

            const mergedSchedule:LocalStoredExercise[]=storedSchedule.map(storedExercise=>{
              const updateExercise=updateSchedule.find((updateExercise)=>updateExercise.exerciseName===storedExercise.exerciseName)
              return updateExercise?{
                ...storedExercise,
                exerciseStatus:updateExercise.exerciseStatus,
                sets:updateExercise.totalSets,
                duration:updateExercise.duration/60,
                completedSets:updateExercise.completedSets  
              }:storedExercise

            })
            await AsyncStorage.setItem('todaySchedule', JSON.stringify(mergedSchedule));
            console.log('Schedule successfully updated!');
        }catch(error){
            console.log("error is happend"+error);
        }
    },
    getNoOfCompletedExercise:(status)=>{
        let exerciseCount:number=0
         get().scheduleExerciseList.map((exercise)=>{
            if(exercise.exerciseStatus==status){
                exerciseCount=exerciseCount+1
            }
         })
         return exerciseCount;
    }
}))