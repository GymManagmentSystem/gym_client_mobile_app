import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import useUserDataStore from '../store/useNameStore'
import ExerciseTrackingCard from '../components/ExerciseTrackingCard'
import { getHeightPercentage, getWidthPercentage } from '../utility/Dimensions'
import { useTheme } from '../context/ThemeContext'


const TrackScheduleScreen = () => {
  const queryClient=useQueryClient()
  const userStore=useUserDataStore()
  const theme=useTheme()

  const todaySchedule=queryClient.getQueryData(['currentScheduleList',userStore.loggedMmeberId])

  console.log(todaySchedule)
  return (
    <View style={[style.mainContainer,{backgroundColor:theme.colors.background.primary}]}>
        <ExerciseTrackingCard exerciseName='Bench press' sets={3} reps='10' isDisabale={false}/>
        <ExerciseTrackingCard exerciseName='Lat pull down' sets={3} reps='10' isDisabale={true}/>
        <ExerciseTrackingCard exerciseName='Dumble up' sets={3} reps='10' isDisabale={true}/>
        <ExerciseTrackingCard exerciseName='Leg press' sets={3} reps='10' isDisabale={true}/>
    </View>
  )
}

export default TrackScheduleScreen

const style=StyleSheet.create({
  mainContainer: {
      flex: 1,
      paddingLeft: getWidthPercentage(16),
      paddingRight: getWidthPercentage(16),
    },
})