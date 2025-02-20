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
import ThemeText from '../components/ThemeText';
import ProgressCircle from '../components/ProgressCircle';

const TrackScheduleScreen = () => {
  const queryClient = useQueryClient();
  const userStore = useUserDataStore();
  const theme = useTheme();
  const exerciseDetailStore = useScheduleExerciseStore();
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


  return (
    <View
      style={[
        style.mainContainer,
        {backgroundColor: theme.colors.background.primary},
      ]}>

        <View style={style.topTextContainer}>
          <ThemeText fontType='primary' fontSize='medium' fontStyle='medium'>Today Schedule</ThemeText>
          <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular'>This is your workout plan and the order for today.</ThemeText>
        </View>

        <View style={style.progressBarContainer}>
          <View style={style.ProgressBarTitleContainer}>
            <ThemeText fontType='primary' fontSize='large' fontStyle='medium'>My Progress</ThemeText>
          </View>
          <View style={style.progressBarBodyContainer}>
            <ProgressCircle/>
            <View style={style.progressBarColorIdentifierContainer}>
              <View style={style.progressBarColorIdentifier}>
                <View style={[style.progressBarColorBox,{backgroundColor:theme.colors.background.highlight}]}></View>
                <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall'>Completed Exercises</ThemeText>
              </View>
              <View style={style.progressBarColorIdentifier}>
                <View style={[style.progressBarColorBox,{backgroundColor:theme.colors.background.quaternary.primary}]}></View>
                <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall'>Pending Exercises</ThemeText>
              </View>
            </View>
          </View>
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
  topTextContainer:{
    justifyContent:"flex-start",
    gap:10,
    marginTop:20
  },
  progressBarContainer:{
    marginTop:40
  },
  ProgressBarTitleContainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  progressBarBodyContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around"
  },
  progressBarColorIdentifierContainer:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"flex-start"
  },
  progressBarColorIdentifier:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    gap:5,
  },
  progressBarColorBox:{
    width:13,
    height:13
  }
});
