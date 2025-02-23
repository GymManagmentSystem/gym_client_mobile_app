import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import {useTheme} from '../context/ThemeContext';
import {useScheduleExerciseStore} from '../store/useTodayScheduleStore';

interface ExerciseSetTickBoxProps {
  exerciseName: string;
  index: number;
}

const ExerciseSetTickBox = ({exerciseName, index}: ExerciseSetTickBoxProps) => {
  const theme = useTheme();
  const exerciseDetails = useScheduleExerciseStore();
  const exerciseStatus =
    exerciseDetails.getExerciseByName(exerciseName)?.exerciseStatus;
  const completedSets =
    exerciseDetails.getExerciseByName(exerciseName)?.completedSets ?? 0;
  const [showImage, setShowImage] = useState<boolean>(false);
  const backgroundColor =
    exerciseStatus === 'Pending'
      ? theme.colors.background.quaternary.primary
      : theme.colors.background.other;

  useEffect(() => {
    // Update tick icon when completedSets changes in the store
    if (completedSets) {
      setShowImage(index <= completedSets);
    }
  }, [completedSets]);
  console.log('exercise in exerciseSetTickBox ', exerciseName);

  return (
    <TouchableOpacity
      style={[style.tickBoxContainer, {backgroundColor}]}
      disabled={
        exerciseStatus === 'OnGoing'
          ? index <= completedSets
            ? true
            : false
          : true
      }
      onPress={() => {
        setShowImage(true)
        exerciseDetails.updateScheduleExercise(exerciseName);
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
    width: '50%',
    height: '50%',
  },
});
