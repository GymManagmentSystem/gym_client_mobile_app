import {RouteProp, useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScheduleStackNavigation} from '../navigation/stackNavigation/ScheduleStackNavigation';
import {useTheme} from '../context/ThemeContext';
import {getWidthPercentage} from '../utility/Dimensions';
import ExerciseDetailCard from '../components/ExerciseDetailCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useGetExerciseById from '../hooks/useGetExerciseById';
import LoadingActivityIndicator from '../modals/LoadingActivityIndicator';
import CustomModal from '../modals/CustomModal';

type ExerciseDetailsScreenRouteProp = RouteProp<
  ScheduleStackNavigation,
  'ExerciseDeatailsScreen'
>;

type ExerciseDetailCardNavigationProp = NativeStackNavigationProp<
  ScheduleStackNavigation,
  'ExerciseDeatailsScreen'
>;
const ExerciseDetailsScreen = ({
  route,
}: {
  route: ExerciseDetailsScreenRouteProp;
}) => {
  const theme = useTheme();
  const {exerciseName} = route.params;
  console.log(exerciseName);

  const {
    data: exerciseData,
    error,
    isLoading,
  } = useGetExerciseById(exerciseName);

  const [showErrorModal,setErrorModal]=useState<boolean>(false);

  useEffect(()=>{
    if(error){
        setErrorModal(true)
    }
  },[error])

  const navigation = useNavigation<ExerciseDetailCardNavigationProp>();

  const navigateBack = () => {
    navigation.navigate('TrackScheduleScreen');
  };

  return (
    <View
      style={[
        style.container,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      <View>
        <LoadingActivityIndicator
          title="Loading Details..."
          visibility={isLoading}
        />
        <CustomModal
        modalType='error'
        message={error?error.message:"Some thing went wrong"}
        visibility={showErrorModal}
        onClick={()=>setErrorModal(false)}
        />
      </View>
      {exerciseData && (
        <ExerciseDetailCard
          exercise={exerciseData}
          navigateBack={navigateBack}
        />
      )}
    </View>
  );
};

export default ExerciseDetailsScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: getWidthPercentage(16),
    paddingRight: getWidthPercentage(16),
  },
});
