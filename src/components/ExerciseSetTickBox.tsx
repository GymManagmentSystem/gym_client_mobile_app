import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { getHeightPercentage, getWidthPercentage } from '../utility/Dimensions'
import { useTheme } from '../context/ThemeContext'


const ExerciseSetTickBox = () => {

    const theme=useTheme()


  return (
    <TouchableOpacity style={[style.tickBoxContainer,{backgroundColor:theme.colors.background.other}]} disabled={true}>
        <Image source={require('../../assets/icons/tickIcon.png')} style={style.image}/>
    </TouchableOpacity>
  )
}

export default ExerciseSetTickBox

const style=StyleSheet.create({
    tickBoxContainer:{
        width:getWidthPercentage(30),
        height:getHeightPercentage(30),
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5
    },
    image:{
        width:"100%",
        height:"100%"
    }
})