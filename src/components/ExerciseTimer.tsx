import {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import { useTheme } from '../context/ThemeContext';
import ThemeText from './ThemeText';



interface ExerciseTimer{
  isDisable:boolean
  duration:number
}

const ExerciseTimer = ({isDisable,duration}:ExerciseTimer) => {
  const theme=useTheme()
  const TOTAL_TIME = duration*60;
  const backgroundColor=isDisable?theme.colors.background.quaternary.secondary:theme.colors.background.other
  const fontColor=isDisable?"primary":"tertiory"
  
  const [remainingTime, setRemainingTime] = useState(duration*60);
  const [isRunning, setRunning] = useState<boolean>(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      timeRef.current = setInterval(
        () => setRemainingTime(prev => prev - 1),
        1000,
      );
    } else {
      if (timeRef.current) clearInterval(timeRef.current);
    }

    return () => {
      if (timeRef.current) clearInterval(timeRef.current);
    };
  }, [isRunning, remainingTime]);

  return (
    <View style={style.conatiner}>
      <View style={style.progressBarContainer}>
        <TouchableOpacity
        disabled={isDisable}
          onPress={() => setRunning(!isRunning)}
          style={style.imageContainer}>
          {isRunning ? (
            <Image
              source={require('../../assets/icons/startIcon.png')}
              style={style.image}
            />
          ) : (
            <Image
              source={require('../../assets/icons/stopIcon.png')}
              style={style.image}
            />
          )}
        </TouchableOpacity>
        <Progress.Bar
          progress={Math.max(0, Math.min(remainingTime / TOTAL_TIME, 1))}
          color={backgroundColor}
          style={style.progreesBar}
          unfilledColor={theme.colors.background.primary}
        />     
      </View>
      <View style={[style.timeContainer,{backgroundColor}]}>
        <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular' fontColor={fontColor}>{`${Math.floor(remainingTime / 60)} :`}</ThemeText>
        <ThemeText fontType='primary' fontSize='xsmall' fontStyle='regular' fontColor={fontColor}>{` ${Math.floor(remainingTime % 60)}`}</ThemeText>
      </View>  
    </View>
  );
};

export default ExerciseTimer;

const style = StyleSheet.create({
  conatiner: {
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  progressBarContainer: {
    marginTop:getHeightPercentage(10),
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  progreesBar:{
    borderRadius:4,
    width:140,
    height:8,
  },
  imageContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent:"center",
    alignItems:"center"
  },
  image: {
    width: '100%',
    height: '100%',
  },
  timeContainer:{
    marginTop:getHeightPercentage(15),
    marginLeft:getWidthPercentage(10),
    width:getWidthPercentage(111),
    height:getHeightPercentage(30),
    borderRadius:10,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  }
});
