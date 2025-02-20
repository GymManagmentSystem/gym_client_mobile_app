import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import * as Progress from 'react-native-progress';
import {useScheduleExerciseStore} from '../store/useTodayScheduleStore';
import ThemeText from './ThemeText';
import {useTheme} from '../context/ThemeContext';

const ProgressCircle = () => {
  const exerciseScheduleStore = useScheduleExerciseStore();
  const theme = useTheme();
  const [statusCount, setStatusCount] = useState<number | null>(0);
  const [totalExerciseCount, setTotalExerciseCount] = useState<number | null>(
    1,
  );

  useEffect(() => {
    if (!exerciseScheduleStore) {
      setStatusCount(null);
      setTotalExerciseCount(null);
    } else {
      setStatusCount(
        exerciseScheduleStore?.getNoOfCompletedExercise('Completed'),
      );
      setTotalExerciseCount(exerciseScheduleStore?.scheduleExerciseList.length);
    }
  }, [exerciseScheduleStore.scheduleExerciseList]);

  if (statusCount===null || totalExerciseCount===null || totalExerciseCount===0) {
    return (
      <ThemeText fontSize="small" fontType="primary" fontStyle="regular">
        Loading ....
      </ThemeText>
    );
  } 

  return (
    <View>
      <Progress.Circle
        size={120}
        progress={Math.max(0, Math.min(statusCount / totalExerciseCount, 1))}
        color={theme.colors.background.highlight}
        unfilledColor={theme.colors.background.quaternary.primary}
        thickness={20}
        borderColor={theme.colors.background.primary}
      />
    </View>
  );
};

export default ProgressCircle;
