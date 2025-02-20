import React from 'react'
import { View } from 'react-native'
import * as Progress from 'react-native-progress';

const ProgressCircle = () => {
  return (
    <View>
      <Progress.Circle size={120}  progress={0.5} color='#F1B900' unfilledColor='#8F918F'  thickness={20}/>
    </View>
  )
}

export default ProgressCircle