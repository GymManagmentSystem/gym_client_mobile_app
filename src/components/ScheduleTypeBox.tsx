import React, { useState } from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import {useTheme} from '../context/ThemeContext';
import ThemeText from './ThemeText';

interface ScheduleTypeBoxProp {
  title: string;
  onPress:()=>void
  isFocused:boolean
}

const ScheduleTypeBox = ({title,onPress,isFocused}: ScheduleTypeBoxProp) => {
  const theme = useTheme();
  const textColor=isFocused?"other":"tertiory"
  const bgColor=isFocused?theme.colors.background.quaternary.highLight:theme.colors.background.other
  return (
    <TouchableHighlight
    onPress={onPress}
      style={[
        style.cardContainer,
        {backgroundColor: bgColor},
      ]}>
      <ThemeText fontSize="xsmall" fontType="primary" fontStyle="medium" fontColor={textColor}>
        {title}
      </ThemeText>
    </TouchableHighlight>
  );
};

export default ScheduleTypeBox;

const style = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: getWidthPercentage(100),
    height: getHeightPercentage(30),
    borderRadius:10
  },
});
