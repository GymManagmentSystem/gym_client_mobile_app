import React, {useState} from 'react';
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
              {[
                {type: 'chest'},
                {type: 'arm'},
                {type: 'leg'},
                {type: 'cardio'},
              ].map(({type}) => (
                <ScheduleTypeBox
                  key={type}
                  title={type}
                  onPress={() => {
                    setSelectedScheduleType(type);
                  }}
                  isFocused={selectedScheduleType === type ? true : false}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        <ScrollView nestedScrollEnabled style={style.bottomContainer}>
          <ExerciseBoxCard
            exerciseName="Bench Press"
            sets={3}
            reps={10}
            duration={0}
          />
          <ExerciseBoxCard
            exerciseName="Cycling"
            sets={0}
            reps={0}
            duration={20}
          />
          <ExerciseBoxCard
            exerciseName="Lat Pull Down"
            sets={3}
            reps={10}
            duration={0}
          />
          <ExerciseBoxCard
            exerciseName="Treadmill"
            sets={0}
            reps={0}
            duration={20}
          />
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
