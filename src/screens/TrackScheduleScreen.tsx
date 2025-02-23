import {useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import useUserDataStore from '../store/userDetailStore';
import ExerciseTrackingCard from '../components/ExerciseTrackingCard';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import {useTheme} from '../context/ThemeContext';
import {useScheduleExerciseStore} from '../store/useTodayScheduleStore';
import {ScheduleExercise} from '../interfaces/currentSchedules';
import {TrackedExercise} from '../interfaces/TrackedExercise';
import ThemeText from '../components/ThemeText';
import ProgressCircle from '../components/ProgressCircle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStoredExercise} from '../interfaces/LocalStoredExercise';

const TrackScheduleScreen = () => {
  const theme = useTheme();
  const exerciseDetailStore = useScheduleExerciseStore();
  const [todaySchedule, setTodaySchedule] = useState<LocalStoredExercise[]>([]);
  const [scheduleAvailability, setScheduleAvailbility] =
    useState<boolean>(false);

  useEffect(() => {
    loadSchedule();
  }, []);

  const getTodayScheduleFromStore = async (): Promise<
    LocalStoredExercise[] | string
  > => {
    try {
      console.log("get Schedule from store function start")
      const todayScheduleStr: string | null = await AsyncStorage.getItem(
        'todaySchedule',
      );
      console.log('today exercise schedule from async is ' + todayScheduleStr);
      if (!todayScheduleStr) {
        return [];
      }
      return todaySchedule?JSON.parse(todayScheduleStr):[];
    } catch (e) {
      return [];
    }
  };

  const loadSchedule = async () => {
    console.log("load schedule function start")
    let schedule = await getTodayScheduleFromStore();
    if (!Array.isArray(schedule) || schedule.length === 0) {
      console.log("schedule is unavailable")
      setTodaySchedule([]);
      setScheduleAvailbility(false);
      return;
    }
    setTodaySchedule(schedule as LocalStoredExercise[]);
    setScheduleAvailbility(true);
    console.log('Today schedule is ', schedule);
    const exerciseList: TrackedExercise[] = schedule.map(exercise => ({
      exerciseName: exercise.exerciseName,
      totalSets: exercise.sets,
      duration: exercise.duration * 60,
      exerciseStatus: exercise.exerciseStatus,
      completedSets: exercise.completedSets,
      totalDuration: exercise.duration * 60,
    }));
    exerciseDetailStore.setInitialScheduleExercise(exerciseList);
  };

  return (
    <View
      style={[
        style.mainContainer,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      <View style={style.topTextContainer}>
        <ThemeText fontType="primary" fontSize="medium" fontStyle="medium">
          Today Schedule
        </ThemeText>
        {scheduleAvailability ? (
          <ThemeText fontType="primary" fontSize="xsmall" fontStyle="regular">
            This is your workout plan and the order for today.
          </ThemeText>
        ) : (
          <ThemeText fontType="primary" fontSize="xsmall" fontStyle="regular">
            No workout scheduled
          </ThemeText>
        )}
      </View>

      {scheduleAvailability ? (
        <View style={style.progressBarContainer}>
          <View style={style.ProgressBarTitleContainer}>
            <ThemeText fontType="primary" fontSize="large" fontStyle="medium">
              My Progress
            </ThemeText>
          </View>
          <View style={style.progressBarBodyContainer}>
            <ProgressCircle />
            <View style={style.progressBarColorIdentifierContainer}>
              <View style={style.progressBarColorIdentifier}>
                <View
                  style={[
                    style.progressBarColorBox,
                    {backgroundColor: theme.colors.background.highlight},
                  ]}></View>
                <ThemeText
                  fontType="primary"
                  fontStyle="regular"
                  fontSize="xsmall">
                  Completed Exercises
                </ThemeText>
              </View>
              <View style={style.progressBarColorIdentifier}>
                <View
                  style={[
                    style.progressBarColorBox,
                    {
                      backgroundColor:
                        theme.colors.background.quaternary.primary,
                    },
                  ]}></View>
                <ThemeText
                  fontType="primary"
                  fontStyle="regular"
                  fontSize="xsmall">
                  Pending Exercises
                </ThemeText>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={[
            style.noScheduleContainer,
            {backgroundColor: theme.colors.background.secondary},
          ]}>
          <ThemeText
            fontColor="other"
            fontSize="small"
            fontStyle="regular"
            fontType="primary">
            Today is your Rest Day!
          </ThemeText>
          <ThemeText fontSize="small" fontStyle="regular" fontType="primary">
            Take this time to recover, recharge, and
          </ThemeText>
          <ThemeText fontSize="small" fontStyle="regular" fontType="primary">
            come back stronger!
          </ThemeText>
        </View>
      )}

      <ScrollView style={style.exerciseContainer}>
        {Array.isArray(todaySchedule) &&
          todaySchedule.length > 0 &&
          todaySchedule.map(exercise => (
            <ExerciseTrackingCard
              key={exercise.exerciseName}
              exerciseName={exercise.exerciseName}
              sets={exercise.sets}
              reps={exercise.reps}
              exerciseUrl={exercise.exerciseUrl}
              completedSets={exercise.completedSets}
            />
          ))}
      </ScrollView>
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
  topTextContainer: {
    justifyContent: 'flex-start',
    gap: 10,
    marginTop: 20,
  },
  progressBarContainer: {
    marginTop: 25,
  },
  ProgressBarTitleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarBodyContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressBarColorIdentifierContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  progressBarColorIdentifier: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5,
  },
  progressBarColorBox: {
    width: 13,
    height: 13,
  },
  exerciseContainer: {
    marginTop: 15,
  },
  noScheduleContainer: {
    marginTop: getHeightPercentage(60),
    width: getWidthPercentage(362),
    height: getHeightPercentage(170),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
