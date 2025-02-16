import React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import ExerciseTimer from '../components/ExerciseTimer'


const PaymentHistoryScreen = () => {
  const theme=useTheme()
  return (
    <View style={{flex:1,backgroundColor:theme.colors.background.primary}}>
      <ExerciseTimer/>
    </View>
  )
}

export default PaymentHistoryScreen