import React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import ExerciseTimer from '../components/ExerciseTimer'
import ProgressCircle from '../components/ProgressCircle'


const PaymentHistoryScreen = () => {
  const theme=useTheme()
  return (
    <View style={{flex:1,backgroundColor:theme.colors.background.primary}}>
      <ProgressCircle/>
    </View>
  )
}

export default PaymentHistoryScreen