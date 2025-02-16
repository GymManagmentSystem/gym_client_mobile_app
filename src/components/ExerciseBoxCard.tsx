import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import {useTheme} from '../context/ThemeContext';
import ThemeText from './ThemeText';

interface ExerciseCardProps {
  exerciseName: string;
  sets: number;
  reps: string;
  duration: number;
  url:string
}

const ExerciseBoxCard = ({
  exerciseName,
  sets,
  reps,
  duration,
  url
}: ExerciseCardProps) => {
  console.log(url)
  const theme = useTheme();
  return (
    <View
      style={[
        style.cardContainer,
        {backgroundColor: theme.colors.background.secondary},
      ]}>
      <View style={style.imageConatiner}>
        <Image source={{uri:url}} style={style.image}/>
      </View>
      <View style={style.exerciseDataContainer}>
        <ThemeText
          fontType="primary"
          fontSize="small"
          fontStyle="medium"
          fontColor="primary">
          {exerciseName}
        </ThemeText>
        <View style={style.repsSetContainer}>
          {sets > 0 && (
            <View
              style={[
                style.repsSetBox,
                {backgroundColor: theme.colors.background.quaternary.secondary},
              ]}>
              <ThemeText
                fontType="primary"
                fontSize="xsmall"
                fontStyle="medium"
                fontColor="tertiory">
                {`${sets} sets`}
              </ThemeText>
            </View>
          )}
          {reps && (
            <View
              style={[
                style.repsSetBox,
                {backgroundColor: theme.colors.background.quaternary.secondary},
              ]}>
              <ThemeText
                fontType="primary"
                fontSize="xsmall"
                fontStyle="medium"
                fontColor="tertiory">
                {`${reps.split('-')[0]} reps`}
              </ThemeText>
            </View>
          )}
          {duration > 0 && (
            <View
              style={[
                style.durationBox,
                {backgroundColor: theme.colors.background.quaternary.secondary},
              ]}>
              <ThemeText
                fontType="primary"
                fontSize="xsmall"
                fontStyle="medium"
                fontColor="tertiory">
                {`${duration} minutes`}
              </ThemeText>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ExerciseBoxCard;
const style = StyleSheet.create({
  cardContainer: {
    width: getWidthPercentage(361),
    height: getHeightPercentage(97),
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: getWidthPercentage(32),
    marginTop: 10,
  },
  imageConatiner: {
    marginTop:5,
    width: getWidthPercentage(105),
    height: getHeightPercentage(80),
    justifyContent:"center",
    alignItems:"center"
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius:20
  },
  exerciseDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 5,
    gap:10
  },
  repsSetContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  repsSetBox: {
    width: 69,
    height: 29,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBox: {
    width: 100,
    height: 29,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
