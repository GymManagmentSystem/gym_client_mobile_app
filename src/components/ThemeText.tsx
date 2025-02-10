import React from 'react';
import {View, StyleProp, TextStyle, Text} from 'react-native';
import {useTheme} from '../context/ThemeContext';

interface ThemedTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  fontSize?: 'xsmall'|'small' | 'medium' | 'large';
  fontColor?:"primary"|"secondary"|"tertiory"|"error"
}

const ThemeText = ({
  children,
  style,
  fontSize = 'small',
  fontColor='primary',
  ...props
}: ThemedTextProps) => {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: theme.typography.fontFamiliy,
          fontSize: theme.typography.fontSize[fontSize],
          color:theme.typography.colors[fontColor]
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default ThemeText;
