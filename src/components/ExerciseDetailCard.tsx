import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { getHeightPercentage, getWidthPercentage } from '../utility/Dimensions';
import ThemeText from './ThemeText';
import ForgotPasswordScreenHeader from './ForgotPasswordScreenHeader';

interface ExerciseDetailCardProps{
    navigateBack:()=>void
}



const ExerciseDetailCard = ({navigateBack}:ExerciseDetailCardProps) => {
    const theme=useTheme();
  return (
    <View style={{backgroundColor:theme.colors.background.primary}}>
        <ForgotPasswordScreenHeader
                title="Bench Press"
                navigateBack={() => navigateBack()}
              />
        <View style={[style.exerciseDetailContainer,{backgroundColor:theme.colors.background.secondary}]}>
            <View style={style.imageConatiner}>
                <Image source={{uri:"https://as1.ftcdn.net/v2/jpg/04/53/40/94/1000_F_453409408_coVYgCOcJRye3159FO5ywT7TnPfPCh3l.jpg"}} style={style.image}/>
            </View>
            <View style={style.exerciseContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.KeyValueContainer}>
                    <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular' style={style.keyContainer}>Exercise Type</ThemeText>
                    <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular'>Strength</ThemeText>
                </View>
                <View style={style.KeyValueContainer}>
                    <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular' style={style.keyContainer}>Target Body Area</ThemeText>
                    <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular'>Strength</ThemeText>
                </View>
                <View style={style.KeyValueContainer}>
                    <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular' style={style.keyContainer}>Exercise Level</ThemeText>
                    <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular'>Strength</ThemeText>
                </View>
                <View style={style.KeyValueContainer}>
                    <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular' style={style.keyContainer}>Exercise Category</ThemeText>
                    <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular'>Strength</ThemeText>
                </View>
                <View style={style.KeyValueContainer}>
                    <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular' style={style.keyContainer}>Equipment Required</ThemeText>
                    <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular'>Strength</ThemeText>
                </View>
                <View style={style.KeyValueContainer}>
                    <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular' style={style.keyContainer}>Exercise Description</ThemeText>
                    <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular' style={style.descriptionText} >The Bench Press is a fundamental strength exercise that targets the chest, shoulders, and triceps</ThemeText>
                </View>
            </ScrollView>
            </View>
            
        </View>
    </View>
   
  )
}

export default ExerciseDetailCard

const style=StyleSheet.create({
    mainContainer:{
        alignItems:"flex-start",
        marginTop:getHeightPercentage(20),
    },
    exerciseDetailContainer:{
        width:getWidthPercentage(355),
        marginTop:getHeightPercentage(20),
        alignItems:"center",
        borderRadius:20
    },
    imageConatiner:{
        width:getWidthPercentage(230),
        height:getHeightPercentage(210),
        marginTop:getHeightPercentage(20)
    },
    image:{
        width:"100%",
        height:"100%",
        borderRadius:20
    },
    exerciseContainer:{
        width:getWidthPercentage(355),
        height:getHeightPercentage(400),
        padding:getWidthPercentage(10),
        alignItems:"flex-start",
        marginTop:getHeightPercentage(10)
    },
    KeyValueContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        gap:20,
        marginTop:getHeightPercentage(15)
    },
    keyContainer:{
        width:getWidthPercentage(150)
    },
    descriptionText: {  
        flexShrink:1,  
        flexWrap: "wrap",
        width: "50%",
      },
})