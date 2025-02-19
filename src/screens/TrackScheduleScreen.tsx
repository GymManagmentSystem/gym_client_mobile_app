import {useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useUserDataStore from '../store/useNameStore';
import ExerciseTrackingCard from '../components/ExerciseTrackingCard';
import {getWidthPercentage} from '../utility/Dimensions';
import {useTheme} from '../context/ThemeContext';
import {useScheduleExerciseStore} from '../store/useTodayScheduleStore';
import {ScheduleExercise} from '../interfaces/currentSchedules';
import {TrackedExercise} from '../interfaces/TrackedExercise';
import * as Progress from 'react-native-progress';

const TrackScheduleScreen = () => {
  const queryClient = useQueryClient();
  const userStore = useUserDataStore();
  const theme = useTheme();
  const exerciseDetailStore = useScheduleExerciseStore();
  let completedExercise = exerciseDetailStore.getNoOfCompletedExercise();
  const [completedExercises, setCompletedExercises] = useState<number>(1);
  let todaySchedule: ScheduleExercise | null = null;
  const todayNameStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
  });
  const currentSchedules = queryClient.getQueryData<ScheduleExercise[]>([
    'currentScheduleList',
    userStore.loggedMmeberId,
  ]);

  if (!currentSchedules) {
    console.log('error');
  } else {
    todaySchedule =
      currentSchedules.find(
        schedule =>
          schedule.schedule.scheduleDay1 === todayNameStr ||
          schedule.schedule.scheduleDay2 === todayNameStr,
      ) || null;
  }

  useEffect(() => {
    if (todaySchedule) {
      const exerciseList: TrackedExercise[] = todaySchedule.exerciseList.map(
        exercise => ({
          exerciseName: exercise.exerciseName,
          totalSets: exercise.sets,
          duration: exercise.duration * 60,
          exerciseStatus: "Pending",
          completedSets: 0,
          totalDuration: exercise.duration * 60,
        }),
      );

      exerciseDetailStore.setInitialScheduleExercise(exerciseList);
    }
  }, [todaySchedule]);

  useEffect(() => {
    if (!completedExercise) {
      setCompletedExercises(1);
    } else {
      setCompletedExercises(completedExercise);
    }
  }, [exerciseDetailStore.scheduleExerciseList]);

  return (
    <View
      style={[
        style.mainContainer,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      <View>
        <Progress.Bar
          progress={Math.max(
            0,
            Math.min(
              completedExercises /
                exerciseDetailStore.scheduleExerciseList.length,
              1,
            ),
          )}
          color="yellow"
          style={{width:150}}
          unfilledColor={theme.colors.background.primary}
        />
      </View>

      {todaySchedule?.exerciseList.map(exercise => (
        <ExerciseTrackingCard
          key={exercise.exerciseName}
          exerciseName={exercise.exerciseName}
          sets={exercise.sets}
          reps={exercise.reps}
          exerciseUrl={exercise.exerciseUrl}
        />
      ))}
    </View>
  );
};

export default TrackScheduleScreen;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingLeft: getWidthPercentage(16),
    paddingRight: getWidthPercentage(16),
  },
});
