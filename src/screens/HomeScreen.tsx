import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import ThemeText from '../components/ThemeText';
import {getGreeting} from '../utility/Greeting';
import ScheduleTypeBox from '../components/ScheduleTypeBox';
import ExerciseBoxCard from '../components/ExerciseBoxCard';
import useUserDataStore from '../store/useNameStore';
import useGetCurrentSchedules from '../hooks/useGetCurrentSchedules';
import CustomModal from '../modals/CustomModal';
import LoadingActivityIndicator from '../modals/LoadingActivityIndicator';
import {useQueryClient} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStoredExercise} from '../interfaces/LocalStoredExercise';

const HomeScreen = () => {
  const theme = useTheme();
  const userDataStore = useUserDataStore();
  const [todayScheduleType, settodayScheduleType] = useState<string>();
  const {
    data: currentScheduleList,
    error,
    isLoading,
    isError,
  } = useGetCurrentSchedules(userDataStore.loggedMmeberId);

  const todayNameStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const [selectedScheduleType, setSelectedScheduleType] =
    useState<string>('Arms');

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  useEffect(() => {
    if (isError) {
      setShowErrorModal(true);
    }
  }, [isError]);

  const queryClinet = useQueryClient();

  useEffect(() => {
    if(currentScheduleList && !isLoading){
      storeTodaySchedule();
    }
   
  }, [currentScheduleList,isLoading]);

  const storeTodaySchedule = async () => {
    try {
      const todaySchedule = currentScheduleList?.find(
        todaySchedule =>
          todaySchedule.schedule.scheduleDay1 === todayNameStr ||
          todaySchedule.schedule.scheduleDay2 === todayNameStr,
      );

      console.log(JSON.stringify(todaySchedule))
      const lastLoginDate = await AsyncStorage.getItem('lastLoginDate');
      const today = new Date().toLocaleDateString('en-CA');
      if (!todaySchedule) {
        console.log("the today schedule is ",todaySchedule)
        await AsyncStorage.removeItem('todaySchedule')
        await AsyncStorage.setItem('todaySchedule', "404");
        settodayScheduleType("Rest");
      } else {
        setSelectedScheduleType(todaySchedule.schedule?.scheduleType);
        settodayScheduleType(todaySchedule.schedule?.scheduleType);
        console.log("last login date",lastLoginDate)
        console.log("today is",today);
        if (lastLoginDate != today) {
          console.log("last login date",lastLoginDate)
          console.log("today is",today);
          console.log("need  storing new schedule for today")
          const initialExerciseSchedule: LocalStoredExercise[] =
            todaySchedule.exerciseList.map(exercise => ({
              ...exercise,
              exerciseStatus: 'Pending',
              completedSets:0,
              totalDuration:exercise.duration
            }));
          await AsyncStorage.removeItem('todaySchedule')
          await AsyncStorage.setItem(
            'todaySchedule',
            JSON.stringify(initialExerciseSchedule),
          );
        }
        console.log("no need for storing new schedule for today")
      }
    } catch (e) {
      setShowErrorModal(true);
    }
  };

  return (
    <SafeAreaView
      style={[
        style.mainContainer,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      <View>
        {showErrorModal && (
          <CustomModal
            message={error?.message || 'unexpected error'}
            modalType="error"
            visibility={showErrorModal}
            onClick={() => {
              setShowErrorModal(false);
              queryClinet.invalidateQueries([
                'currentScheduleList',
                userDataStore.loggedMmeberId,
              ]);
            }}
          />
        )}
        <LoadingActivityIndicator
          title="Loading Schedules..."
          visibility={isLoading}
        />
      </View>

      <View style={style.greetingContainer}>
        <ThemeText fontType="primary" fontSize="medium" fontStyle="medium">
          {getGreeting()}
        </ThemeText>
        <ThemeText fontType="primary" fontSize="small" fontStyle="semiBold">
          {userDataStore.loggedUserName}
        </ThemeText>
      </View>
      <View
        style={[
          style.homeContainer,
          {backgroundColor: theme.colors.background.secondary},
        ]}>
        <View style={style.homeTextConatiner}>
          <View style={style.scheduleTypeContainer}>
            <ThemeText
              fontType="secondary"
              fontSize="medium"
              fontStyle="regular"
              fontColor="other">
              Today is your
            </ThemeText>
            <ThemeText
              fontType="secondary"
              fontSize="medium"
              fontStyle="bold"
              fontColor="other">
              {`${todayScheduleType}  Day`}
            </ThemeText>
          </View>
          <View style={style.motivationTextContainer}>
            <ThemeText
              fontType="secondary"
              fontSize="xsmall"
              fontStyle="regular"
              fontColor="primary">
              Stay focused, lift
            </ThemeText>
            <ThemeText
              fontType="secondary"
              fontSize="xsmall"
              fontStyle="regular"
              fontColor="primary"
              style={{marginTop: 5}}>
              strong, and make
            </ThemeText>
            <ThemeText
              fontType="secondary"
              fontSize="xsmall"
              fontStyle="regular"
              fontColor="primary"
              style={{marginTop: 5}}>
              every rep count!
            </ThemeText>
          </View>
        </View>
        <ImageBackground
          style={style.homeImageConatiner}
          source={require('../../assets/images/homeBackgroundImage.png')}></ImageBackground>
      </View>

      <View style={style.bodyContainer}>
        <View style={style.middleContainer}>
          <ThemeText fontType="primary" fontSize="xmedium" fontStyle="regular">
            Assigned Schedules
          </ThemeText>

          <ScrollView horizontal={true}>
            <View style={style.scheduleBoxContainer}>
              {currentScheduleList &&
                currentScheduleList.map(type => (
                  <ScheduleTypeBox
                    key={type.schedule.scheduleId}
                    title={type.schedule.scheduleType}
                    onPress={() => {
                      setSelectedScheduleType(type.schedule.scheduleType);
                    }}
                    isFocused={
                      selectedScheduleType === type.schedule.scheduleType
                        ? true
                        : false
                    }
                  />
                ))}
            </View>
          </ScrollView>
        </View>
        <ScrollView nestedScrollEnabled style={style.bottomContainer}>
          {currentScheduleList &&
            currentScheduleList
              .filter(
                todaySchedule =>
                  todaySchedule.schedule.scheduleType === selectedScheduleType,
              )
              .map(scheduleList =>
                scheduleList.exerciseList.map(exercise => (
                  <ExerciseBoxCard
                    key={exercise.exerciseName}
                    url={exercise.exerciseUrl}
                    exerciseName={exercise.exerciseName}
                    sets={exercise.sets}
                    reps={exercise.reps}
                    duration={exercise.duration}
                  />
                )),
              )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingLeft: getWidthPercentage(16),
    paddingRight: getWidthPercentage(16),
  },
  greetingContainer: {
    marginTop: getHeightPercentage(20),
  },
  homeContainer: {
    marginTop: getHeightPercentage(20),
    width: getWidthPercentage(370),
    height: getHeightPercentage(205),
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: getWidthPercentage(16),
  },
  homeTextConatiner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  homeImageConatiner: {
    height: getHeightPercentage(205),
    width: getWidthPercentage(200),
    paddingLeft: getWidthPercentage(16),
  },
  scheduleTypeContainer: {
    marginTop: getHeightPercentage(28),
  },
  motivationTextContainer: {
    marginTop: getHeightPercentage(30),
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: getHeightPercentage(20),
    marginBottom: 10,
    flex: 1,
  },
  middleContainer: {
    alignItems: 'flex-start',
  },
  bottomContainer: {
    marginTop: getHeightPercentage(10),
  },
  scheduleBoxContainer: {
    marginTop: getHeightPercentage(15),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    flex: 1,
  },
});
