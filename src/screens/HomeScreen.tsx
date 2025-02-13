import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { ScreenContainerStyles } from '../styles/ScreenContainerStyles'
import { useTheme } from '../context/ThemeContext'

const HomeScreen = () => {
    const theme=useTheme()
  return (
    <SafeAreaView style={[ScreenContainerStyles.container,{backgroundColor:theme.colors.background.primary}]}>
        
    </SafeAreaView>
  )
}

export default HomeScreen