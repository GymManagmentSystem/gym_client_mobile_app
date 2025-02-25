import { RouteProp, useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScheduleStackNavigation } from '../navigation/stackNavigation/ScheduleStackNavigation';
import { useTheme } from '../context/ThemeContext';
import { getWidthPercentage } from '../utility/Dimensions';
import ExerciseDetailCard from '../components/ExerciseDetailCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type ExerciseDetailsScreenRouteProp = RouteProp<
  ScheduleStackNavigation,
  'ExerciseDeatailsScreen'
>;




type ExerciseDetailCardNavigationProp = NativeStackNavigationProp<
  ScheduleStackNavigation,
  'ExerciseDeatailsScreen'
>
const ExerciseDetailsScreen = ({route}:{route:ExerciseDetailsScreenRouteProp}) => {
    const theme=useTheme();
    // const {exerciseName}=route.params;

    // console.log(exerciseName);

    const navigation=useNavigation<ExerciseDetailCardNavigationProp>()

    const navigateBack=()=>{
        navigation.navigate("TrackScheduleScreen")
    }


  return (
    <View style={[style.container,{backgroundColor:theme.colors.background.primary}]}>
        <ExerciseDetailCard navigateBack={navigateBack}/>
    </View>
  )
}

export default ExerciseDetailsScreen

const style=StyleSheet.create({
    container:{
        flex:1,
        padding:getWidthPercentage(16),
        paddingRight:getWidthPercentage(16)
    }
})