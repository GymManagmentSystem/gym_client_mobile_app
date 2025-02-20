import { create } from "zustand";
import { TrackedExercise } from "../interfaces/TrackedExercise";




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
                    completedSets:0,
                    exerciseStatus:index==0?"OnGoing":"Pending"
                }))
                console.log("initializes list is : ",JSON.stringify(initializedExerciseList));
                return{scheduleExerciseList:initializedExerciseList}
            }
            return {scheduleExerciseList:[]}
        })
    },
    updateScheduleExercise:(exerciseName,remainingTime)=>{
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