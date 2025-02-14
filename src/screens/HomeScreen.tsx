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

const HomeScreen = () => {
  const theme = useTheme();
  const userDataStore = useUserDataStore();
  const {data:currentScheduleList,error,isLoading}=useGetCurrentSchedules(userDataStore.loggedMmeberId)

  const [selectedScheduleType, setSelectedScheduleType] =
    useState<string>('chest');


  return (
    <SafeAreaView
      style={[
        style.mainContainer,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      <View style={style.greetingContainer}>
        <ThemeText fontType="primary" fontSize="medium" fontStyle="medium">
          {getGreeting()}
        </ThemeText>
        <ThemeText fontType="primary" fontSize="large" fontStyle="semiBold">
          {userDataStore.loggedUserName}
        </ThemeText>
      </View>
      <ImageBackground
        borderRadius={20}
        style={style.homeImageConatiner}
        source={require('../../assets/images/updatedHomeImage.png')}>
        <View style={style.scheduleTypeContainer}>
          <ThemeText
            fontType="secondary"
            fontSize="xmedium"
            fontStyle="regular">
            Today is your
          </ThemeText>
          <ThemeText
            fontType="secondary"
            fontSize="xmedium"
            fontStyle="bold"
            fontColor="other">
            Chest Day
          </ThemeText>
        </View>

        <View style={style.motivationTextContainer}>
          <ThemeText fontType="secondary" fontSize="medium" fontStyle="bold">
            Stay focused, lift strong, and make
          </ThemeText>
          <ThemeText fontType="secondary" fontSize="medium" fontStyle="bold">
            every rep count!
          </ThemeText>
        </View>
      </ImageBackground>

      <View style={style.bodyContainer}>
        <View style={style.middleContainer}>
          <ThemeText fontType="primary" fontSize="xmedium" fontStyle="regular">
            Assigned Schedules
          </ThemeText>

          <ScrollView horizontal={true}>
            <View style={style.scheduleBoxContainer}>

              {currentScheduleList && currentScheduleList.map((type) => (
                <ScheduleTypeBox
                  key={type.schedule.scheduleId}
                  title={type.schedule.scheduleType}
                  onPress={() => {
                    setSelectedScheduleType(type.schedule.scheduleType);
                  }}
                  isFocused={selectedScheduleType === type.schedule.scheduleType ? true : false}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        <ScrollView nestedScrollEnabled style={style.bottomContainer}>
          {
            currentScheduleList && currentScheduleList.filter((todaySchedule)=>(
              todaySchedule.schedule.scheduleType ===selectedScheduleType
            )).map((scheduleList)=>(scheduleList.exerciseList.map((exercise)=>(
              <ExerciseBoxCard
            key={exercise.exerciseName}
            url={exercise.exerciseUrl}
            exerciseName={exercise.exerciseName}
            sets={exercise.sets}
            reps={exercise.reps}
            duration={exercise.duration}
          />
            ))))
            
          }
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
  homeImageConatiner: {
    marginTop: getHeightPercentage(10),
    height: getHeightPercentage(250),
    width: getWidthPercentage(361),
    paddingLeft: getWidthPercentage(16),
  },
  scheduleTypeContainer: {
    marginTop: getHeightPercentage(30),
  },
  motivationTextContainer: {
    marginTop: getHeightPercentage(100),
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: getHeightPercentage(10),
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    flex: 1,
  },
});
