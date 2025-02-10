import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ThemeText from './ThemeText';
import {useTheme} from '../context/ThemeContext';

interface PrimaryButtonProps {
  title: string;
  onHandle: () => void;
}

const PrimaryButton = ({title,onHandle}: PrimaryButtonProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[style.container, {backgroundColor: theme.colors.secondary}]}
      onPress={onHandle}>
      <ThemeText
        fontType="secondary"
        fontStyle="bold"
        fontSize="small"
        fontColor="tertiory">
        {title}
      </ThemeText>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const style = StyleSheet.create({
  container: {
    width: 346,
    height: 43,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
