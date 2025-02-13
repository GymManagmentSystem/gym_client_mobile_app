import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {ScreenContainerStyles} from '../styles/ScreenContainerStyles';
import {useTheme} from '../context/ThemeContext';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import ThemeText from '../components/ThemeText';
import { getGreeting } from '../utility/Greeting';

const HomeScreen = () => {
  const theme = useTheme();

  
  return (
    <SafeAreaView
      style={[
        style.mainContainer,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      <ImageBackground
        style={style.topContainer}
        source={require('../../assets/images/homeBackground.png')}>
        <View style={style.nameContainer}>
          <ThemeText fontType="primary" fontSize="medium" fontStyle="medium">
            {getGreeting()}
          </ThemeText>
          <ThemeText fontType="primary" fontSize="large" fontStyle="semiBold">
            Nethupama
          </ThemeText>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    height: getHeightPercentage(342),
    width: '100%',
  },
  nameContainer: {
    marginTop: getHeightPercentage(20),
    marginLeft: getWidthPercentage(16),
  },
});
