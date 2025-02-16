import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import ThemeText from './ThemeText';
import { useTheme } from '../context/ThemeContext';
import ExerciseSetTickBox from './ExerciseSetTickBox';


// 



const ExerciseTrackingCard = () => {
    const theme=useTheme();


  return (
    <View style={[style.exerciseTrackingCardContainer,{backgroundColor:theme.colors.background.highlight}]}>
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
        <ThemeText fontType='primary' fontStyle='medium' fontSize='medium' fontColor='tertiory'>Bench Press</ThemeText>
        </View>
        <View style={style.repSetContainer}>
            <View style={[style.repsSetBox,{backgroundColor:theme.colors.background.quaternary.primary}]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='small' fontColor='primary'>3 sets</ThemeText>
            </View>
            <View style={[style.repsSetBox,{backgroundColor:theme.colors.background.quaternary.primary}]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='small' fontColor='primary'>3 sets</ThemeText>
            </View>
        </View>
        <View style={style.setsConatiner}>
            <ExerciseSetTickBox/>
            <ExerciseSetTickBox/>
            <ExerciseSetTickBox/>
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
    width: getWidthPercentage(370),
    height: getHeightPercentage(173),
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
  },
  exerciseDetailsContainer: {
    width: getWidthPercentage(214),
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
    width:getWidthPercentage(156),
    height:getHeightPercentage(173)
  },
  image:{
    width:"100%",
    height:"100%"
  }
});
