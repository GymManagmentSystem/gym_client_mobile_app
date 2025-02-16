import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import {useTheme} from '../context/ThemeContext';

interface ExerciseSetTickBoxProps {
  isDisable: boolean;
}

const ExerciseSetTickBox = ({isDisable}: ExerciseSetTickBoxProps) => {
  const theme = useTheme();
  const [showImage, setShowImage] = useState<boolean>(false);
  const backgroundColor = isDisable
    ? theme.colors.background.quaternary.primary
    : theme.colors.background.other;

  return (
    <TouchableOpacity
      style={[style.tickBoxContainer, {backgroundColor}]}
      disabled={isDisable}
      onPress={() => setShowImage(true)}>
      {showImage && (
        <Image
          source={require('../../assets/icons/tickIcon.png')}
          style={style.image}
        />
      )}
    </TouchableOpacity>
  );
};

export default ExerciseSetTickBox;

const style = StyleSheet.create({
  tickBoxContainer: {
    width: getWidthPercentage(30),
    height: getHeightPercentage(30),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
