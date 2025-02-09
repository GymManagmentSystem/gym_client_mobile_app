import React from 'react';
import {View, StyleProp, TextStyle, Text} from 'react-native';
import {useTheme} from '../context/ThemeContext';

interface ThemedTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  fontSize?: 'small' | 'medium' | 'large';
}

const ThemeText = ({
  children,
  style,
  fontSize = 'small',
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
          color:theme.colors.text
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default ThemeText;
