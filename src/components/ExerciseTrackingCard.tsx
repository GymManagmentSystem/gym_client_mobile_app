import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import ThemeText from './ThemeText';
import { useTheme } from '../context/ThemeContext';
import ExerciseSetTickBox from './ExerciseSetTickBox';


interface ExerciseTrackingCardProps{
    exerciseName:string,
    isDisabale:boolean,
    sets:number,
    reps:string
}



const ExerciseTrackingCard = ({exerciseName,isDisabale,sets,reps}:ExerciseTrackingCardProps) => {
    const theme=useTheme();
    const backgroundColor=isDisabale?theme.colors.background.other:theme.colors.background.highlight
    const opacity=isDisabale?0.8:1
    const setsRepsBackgroundColor=isDisabale?theme.colors.background.quaternary.primary:theme.colors.background.primary

  return (
    <View style={[style.exerciseTrackingCardContainer,{backgroundColor,opacity}]}>
      <View style={style.exerciseDetailsContainer}>
        <View style={style.dateConatiner}>
          <View style={[style.dateImageContainer,{backgroundColor:theme.colors.background.primary}]}>
            <Image
              source={require('../../assets/icons/calanderIcon.png')}
              width={15}
              height={15}
            />
          </View>
          <View>
            <ThemeText fontColor='tertiory' fontType='primary' fontStyle='medium' fontSize='xsmall'>Today</ThemeText>
            <ThemeText fontColor='tertiory' fontType='primary' fontStyle='regular' fontSize='xsmall'>
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </ThemeText>
          </View>
        </View>
        <View style={style.exerciseNameContainer}>
        <ThemeText fontType='primary' fontStyle='medium' fontSize='medium' fontColor='tertiory'>{exerciseName}</ThemeText>
        </View>
        <View style={style.repSetContainer}>
            <View style={[style.repsSetBox,{backgroundColor:setsRepsBackgroundColor}]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='small' fontColor='primary'>{`${sets} sets`}</ThemeText>
            </View>
            <View style={[style.repsSetBox,{backgroundColor:setsRepsBackgroundColor}]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='small' fontColor='primary'>{`${reps} reps`}</ThemeText>
            </View>
        </View>
        <View style={style.setsConatiner}>
            <ExerciseSetTickBox isDisable={isDisabale}/>
            <ExerciseSetTickBox isDisable={isDisabale}/>
            <ExerciseSetTickBox isDisable={isDisabale}/>
        </View>
      </View>
      <View style={[style.exerciseImageConatiner,{borderLeftColor:theme.colors.background.quaternary.secondary,borderLeftWidth:2}]}>
        <Image source={{uri:"https://as1.ftcdn.net/v2/jpg/03/88/21/62/1000_F_388216207_WWVXeq5k4tnMYfCrVG5qf9IfBswmb7Rx.jpg"}} style={style.image}/>
      </View>
    </View>
  );
};

export default ExerciseTrackingCard;

const style = StyleSheet.create({
  exerciseTrackingCardContainer: {
    marginTop:10,
    width: getWidthPercentage(355),
    height: getHeightPercentage(173),
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
  },
  exerciseDetailsContainer: {
    width: getWidthPercentage(198),
    height: getHeightPercentage(173),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: getWidthPercentage(20),
  },
  dateConatiner: {
    height: getHeightPercentage(30),
    marginTop:getHeightPercentage(15),
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:"center",
    gap:10
  },
  dateImageContainer: {
    width: getWidthPercentage(40),
    height: getHeightPercentage(40),
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNameContainer: {
    marginTop:getHeightPercentage(15),
  },
  repSetContainer: {
    marginTop:getHeightPercentage(5),
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    gap:getWidthPercentage(10)
  },
  repsSetBox:{
    height:getHeightPercentage(30),
    width:getWidthPercentage(80),
    borderRadius:15,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  setsConatiner: {
    marginTop:getHeightPercentage(10),
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-evenly"
  },
  exerciseImageConatiner:{
    width:getWidthPercentage(157),
    height:getHeightPercentage(173)
  },
  image:{
    width:"100%",
    height:"100%",
    borderTopRightRadius:20,
    borderBottomRightRadius:20
  }
});
