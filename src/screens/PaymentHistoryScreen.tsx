import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import ExerciseTimer from '../components/ExerciseTimer'
import ProgressCircle from '../components/ProgressCircle'
import { getHeightPercentage, getWidthPercentage } from '../utility/Dimensions'
import ThemeText from '../components/ThemeText'
import PaymentHistoryCard from '../components/PaymentHistoryCard'



const PaymentHistoryScreen = () => {
  const theme=useTheme()
  return (
    <View style={[style.mainContainer,{backgroundColor:theme.colors.background.primary}]}>
      <View style={style.headingTextContainer}>
        <ThemeText fontType='primary' fontStyle='medium' fontSize='medium'>Payments</ThemeText>
        <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall'>Your payment History</ThemeText>
      </View>
      <PaymentHistoryCard/>
    </View>
  )
}

export default PaymentHistoryScreen

const style=StyleSheet.create({
  mainContainer: {
      flex: 1,
      paddingLeft: getWidthPercentage(16),
      paddingRight: getWidthPercentage(16),
    },
  headingTextContainer:{
    marginTop:getHeightPercentage(20),
    gap:5
  }  
})