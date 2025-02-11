import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ThemeText from './ThemeText';
import {useTheme} from '../context/ThemeContext';

interface PrimaryButtonProps {
  title: string;
  titleFontColor:"primary"|"secondary"|"tertiory"
  onHandle: () => void;
  width?:number,
  height?:number,
}

const PrimaryButton = ({title,onHandle,titleFontColor,width=346,height=43}: PrimaryButtonProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[style.container, {backgroundColor: theme.colors.secondary,width,height}]}
      onPress={onHandle}>
      <ThemeText
        fontType="secondary"
        fontStyle="bold"
        fontSize="small"
        fontColor={titleFontColor}>
        {title}
      </ThemeText>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const style = StyleSheet.create({
  container: {
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
