import React from 'react'
import { View } from 'react-native'
import ThemeText from '../components/ThemeText'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { MainStackNavigationList } from '../navigation/stackNavigation/MainStackNavigation'


type LoginScreenNavigationProp=NativeStackNavigationProp<MainStackNavigationList,"LoginScreen">

const LoginScreen = () => {

  const navigation=useNavigation<LoginScreenNavigationProp>()

  return (
    <View>
        <ThemeText fontSize='large'>Hello world</ThemeText>
    </View>
  )
}

export default LoginScreen