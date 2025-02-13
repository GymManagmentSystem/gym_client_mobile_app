import React from 'react';
import {Image, View} from 'react-native';

interface TabIconProps {
  theme: any;
  source: any;
  focused: boolean;
}

const TabIcon = ({theme, source, focused}: TabIconProps) => {
  const color = focused
    ? theme.icons.iconColor.active
    : theme.icons.iconColor.inActive;
  const backgroundColor = focused
    ? theme.icons.backgroundColor.active
    : theme.icons.backgroundColor.inActive;
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={source}
        style={{width: 20.5, height: 20, tintColor: color}}
      />
    </View>
  );
};

export default TabIcon;
