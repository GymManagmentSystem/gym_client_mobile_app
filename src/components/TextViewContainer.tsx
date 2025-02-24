
import React from 'react'
import { StyleSheet, View } from 'react-native'
import ThemeText from './ThemeText'
import { useTheme } from '../context/ThemeContext'
import { getHeightPercentage, getWidthPercentage } from '../utility/Dimensions'


const TextViewContainer = () => {
    const theme=useTheme()



  return (
    <View style={style.textConatiner}>
        <ThemeText fontType='secondary' fontStyle='regular' fontSize='medium'>User Name</ThemeText>
        <View style={[style.valueContainer,{backgroundColor:theme.colors.background.secondary}]}>
            <ThemeText fontType='secondary' fontStyle='regular' fontSize='small'>Nethupama Shavinda</ThemeText>
        </View>
    </View>
  )
}

export default TextViewContainer

const style=StyleSheet.create({
    textConatiner:{
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        gap:10
    },
    valueContainer:{
        display:"flex",
        alignItems:"flex-start",
        justifyContent:"center",
        height:getHeightPercentage(45),
        width:getWidthPercentage(355),
        borderRadius:20,
        paddingLeft:20
    }

})