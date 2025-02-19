import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import {useTheme} from '../context/ThemeContext';
import { useScheduleExerciseStore } from '../store/useTodayScheduleStore';


interface ExerciseSetTickBoxProps {
  exerciseName:string
}

const ExerciseSetTickBox = ({exerciseName}: ExerciseSetTickBoxProps) => {
  const theme = useTheme();
  const exerciseDetails=useScheduleExerciseStore();
  const exerciseStatus=exerciseDetails.getExerciseByName(exerciseName)?.exerciseStatus;
  const [showImage, setShowImage] = useState<boolean>(false);
  const backgroundColor = exerciseStatus==="Pending"
    ? theme.colors.background.quaternary.primary
    : theme.colors.background.other;

  return (
    <TouchableOpacity
      style={[style.tickBoxContainer, {backgroundColor}]}
      disabled={exerciseStatus==="OnGoing"?false:true}
      onPress={() => {
        setShowImage(true)
        exerciseDetails.updateScheduleExercise(exerciseName)
        }}>
      {showImage && (
        <Image
          source={require('../../assets/icons/tickIcon.png')}
          style={style.image}
        />
      )}
    </TouchableOpacity>
  );
};

export default ExerciseSetTickBox;

const style = StyleSheet.create({
  tickBoxContainer: {
    width: getWidthPercentage(30),
    height: getHeightPercentage(30),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
