
import React from 'react'
import { StyleSheet, View } from 'react-native'
import ThemeText from './ThemeText'
import { useTheme } from '../context/ThemeContext'
import { getHeightPercentage, getWidthPercentage } from '../utility/Dimensions'

interface TextViewContainerProp{
    label:string
    value:string|number
}

const TextViewContainer = ({label,value}:TextViewContainerProp) => {
    const theme=useTheme()



  return (
    <View style={style.textConatiner}>
        <ThemeText fontType='secondary' fontStyle='regular' fontSize='medium'>{label}</ThemeText>
        <View style={[style.valueContainer,{backgroundColor:theme.colors.background.secondary}]}>
            <ThemeText fontType='secondary' fontStyle='regular' fontSize='small'>{value}</ThemeText>
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