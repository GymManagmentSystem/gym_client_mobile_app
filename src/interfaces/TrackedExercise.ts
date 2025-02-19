export interface TrackedExercise{
    exerciseName:string,
    exerciseStatus:"Pending"|"OnGoing"|"Completed",
    totalSets: number,
    duration:number,
    totalDuration:number
    completedSets:number
}