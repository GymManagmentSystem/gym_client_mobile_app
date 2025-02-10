import React from 'react';
import {View, StyleProp, TextStyle, Text} from 'react-native';
import {useTheme} from '../context/ThemeContext';

interface ThemedTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  fontSize?: 'xsmall' | 'small' | 'medium' | 'large';
  fontColor?: 'primary' | 'secondary' | 'tertiory' | 'error';
  fontType?: 'primary' | 'secondary';
  fontStyle?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

const ThemeText = ({
  children,
  style,
  fontSize = 'small',
  fontColor = 'primary',
  fontType = 'primary',
  fontStyle = 'regular',
  ...props
}: ThemedTextProps) => {
  const theme = useTheme();


  // this will get font which is primary or secondary
  const fontFamilyObject = theme.typography.fontFamiliy[fontType];

  //this will check proporties like semibold,bold,regular etc if there is no existing it will direct to primary.regular
  const fontFamily =
    fontFamilyObject[fontStyle as keyof typeof fontFamilyObject] ??
    theme.typography.fontFamiliy.primary.regular;

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily,
          fontSize: theme.typography.fontSize[fontSize],
          color: theme.typography.colors[fontColor],
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default ThemeText;
