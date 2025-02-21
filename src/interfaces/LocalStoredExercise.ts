export interface LocalStoredExercise{
    exerciseName:string,
    exerciseStatus:"Pending"|"OnGoing"|"Completed",
    duration:number,
    sets:number
    exerciseUrl:string
    reps:string
}