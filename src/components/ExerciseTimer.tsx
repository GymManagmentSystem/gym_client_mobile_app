import {useEffect, useMemo, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import { useTheme } from '../context/ThemeContext';
import ThemeText from './ThemeText';
import { useScheduleExerciseStore } from '../store/useTodayScheduleStore';
import { TrackedExercise } from '../interfaces/TrackedExercise';



interface ExerciseTimer{
  exerciseName:string
}

const ExerciseTimer = ({exerciseName}:ExerciseTimer) => {
  const theme=useTheme()
  const exerciseDetailsStore=useScheduleExerciseStore();
  const selectedExercise=exerciseDetailsStore.getExerciseByName(exerciseName);
  const [isRunning, setRunning] = useState<boolean>(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedExerciseStatus,setSelectedExerciseStatus]=useState<TrackedExercise|null>()


  useEffect(()=>{
    console.log("can i pass before initializing exercise in state")
    if(!selectedExercise){
      setSelectedExerciseStatus(null)
    }else{
      setSelectedExerciseStatus(selectedExercise)
    }
    
  },[selectedExercise])


  


  const backgroundColor=selectedExerciseStatus?.exerciseStatus?theme.colors.background.quaternary.secondary:theme.colors.background.other
  const fontColor=selectedExerciseStatus?.exerciseStatus?"primary":"tertiory"



  
  // let remainingTimeFromStore:number; 

  

  // console.log(`exercise is ${exercise?.exerciseName} ${exercise?.duration} ${exercise?.totalSets}`)
 
  // const TOTAL_TIME = useMemo(() => (exercise ? exercise.duration  : null), [exercise]);
  // const backgroundColor=exercise?.exerciseStatus?theme.colors.background.quaternary.secondary:theme.colors.background.other
  // const fontColor=exercise?.exerciseStatus?"primary":"tertiory"
  // const [remainingTime, setRemainingTime] = useState<number|null>(0);
  // const [isRunning, setRunning] = useState<boolean>(false);
  // const timeRef = useRef<NodeJS.Timeout | null>(null);

  // console.log("Total Time",TOTAL_TIME)

  // useEffect(()=>{
  //   remainingTimeFromStore = exercise?.duration ?? (exercise?.duration ? exercise.duration * 60 : 0)
  //   setRemainingTime(remainingTimeFromStore)
  //   console.log("the whole exercise is :",JSON.stringify(exerciseDetails.scheduleExerciseList))

  // },[exercise])
 

  

  useEffect(() => {
    if (isRunning && selectedExerciseStatus?.duration && selectedExerciseStatus.duration > 0) {
      console.log("inside time minus function")
      timeRef.current = setInterval(
        () => setSelectedExerciseStatus((prevState)=>{
          if(!prevState){
            return prevState
          }else{
            if(prevState.duration>0){
              
              return {...prevState,duration:prevState.duration-1}
            }
            else{
              console.log("i'm catching in first condition dear")
              return prevState
            }
          }
        }),
        1000,
      );
    } 
    else if(selectedExerciseStatus?.duration==0){
      console.log("i'm catching in first condition dear")
      setRunning(false)
      exerciseDetailsStore.updateScheduleExercise(exerciseName,selectedExerciseStatus.duration)
    }
    else {
      if (timeRef.current) clearInterval(timeRef.current);
    }

    return () => {
      if (timeRef.current) clearInterval(timeRef.current);
    };
  }, [isRunning, selectedExerciseStatus]);
  
  // if (!TOTAL_TIME || remainingTime === null) {
  //   return <ThemeText>Loading...</ThemeText>;
  // }

  if(!selectedExerciseStatus){
    console.log("can i pass if data is loading")
    return <ThemeText>Loading...</ThemeText>;
  }  
  

  return (
    <View style={style.conatiner}>
      <View style={style.progressBarContainer}>
        <TouchableOpacity
        disabled={selectedExercise?.exerciseStatus}
          onPress={() => {
            exerciseDetailsStore.updateScheduleExercise(exerciseName,selectedExerciseStatus.duration)
            setRunning(!isRunning)
          }}
          style={style.imageContainer}>
          {isRunning ? (
            <Image
              source={require('../../assets/icons/startIcon.png')}
              style={style.image}
            />
          ) : (
            <Image
              source={require('../../assets/icons/stopIcon.png')}
              style={style.image}
            />
          )}
        </TouchableOpacity>

          <Progress.Bar
          progress={Math.max(0, Math.min(selectedExerciseStatus.duration / selectedExerciseStatus.totalDuration,1))}
          color={backgroundColor}
          style={style.progreesBar}
          unfilledColor={theme.colors.background.primary}
        /> 

            
      </View>
      <View style={[style.timeContainer,{backgroundColor}]}>
        <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular' fontColor={fontColor}>{`${Math.floor(selectedExerciseStatus.duration / 60)} :`}</ThemeText>
        <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular' fontColor={fontColor}>{` ${Math.floor(selectedExerciseStatus.duration % 60)}`}</ThemeText>
      </View>  
    </View>
  );
};

export default ExerciseTimer;

const style = StyleSheet.create({
  conatiner: {
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  progressBarContainer: {
    marginTop:getHeightPercentage(10),
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  progreesBar:{
    borderRadius:4,
    width:140,
    height:8,
  },
  imageContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent:"center",
    alignItems:"center"
  },
  image: {
    width: '100%',
    height: '100%',
  },
  timeContainer:{
    marginTop:getHeightPercentage(15),
    marginLeft:getWidthPercentage(10),
    width:getWidthPercentage(111),
    height:getHeightPercentage(30),
    borderRadius:10,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  }
});
