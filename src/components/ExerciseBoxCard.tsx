import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import {useTheme} from '../context/ThemeContext';
import ThemeText from './ThemeText';

interface ExerciseCardProps {
  exerciseName: string;
  sets: number;
  reps: number;
  duration: number;
}

const ExerciseBoxCard = ({
  exerciseName,
  sets,
  reps,
  duration,
}: ExerciseCardProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        style.cardContainer,
        {backgroundColor: theme.colors.background.other},
      ]}>
      <View style={style.imageConatiner}>
        <Image source={require('../../assets/images/exerciseImage.png')} />
      </View>
      <View style={style.exerciseDataContainer}>
        <ThemeText
          fontType="primary"
          fontSize="small"
          fontStyle="medium"
          fontColor="tertiory">
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
                fontColor="primary">
                {`${sets} sets`}
              </ThemeText>
            </View>
          )}
          {reps > 0 && (
            <View
              style={[
                style.repsSetBox,
                {backgroundColor: theme.colors.background.quaternary.secondary},
              ]}>
              <ThemeText
                fontType="primary"
                fontSize="xsmall"
                fontStyle="medium"
                fontColor="primary">
                {`${reps} reps`}
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
                fontColor="primary">
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
    width: getWidthPercentage(105),
    height: getHeightPercentage(88),
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  exerciseDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 5,
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
