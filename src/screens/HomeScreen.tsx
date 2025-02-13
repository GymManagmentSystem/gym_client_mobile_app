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
        <View style={style.greetingContainer}>
          <ThemeText fontType="primary" fontSize="medium" fontStyle="medium">
            {getGreeting()}
          </ThemeText>
          <ThemeText fontType="primary" fontSize="large" fontStyle="semiBold">
            Nethupama
          </ThemeText>
        </View>
        <View style={style.scheduleTypeContainer}>
          <ThemeText fontType="secondary" fontSize="xmedium" fontStyle="regular">
            Today is your
          </ThemeText>
          <ThemeText fontType="secondary" fontSize="xmedium" fontStyle="bold" fontColor='other'>
            Chest Day
          </ThemeText>
        </View>

        <View style={style.motivationTextContainer}>
          <ThemeText fontType="secondary" fontSize="medium" fontStyle="bold">
          Stay focused, lift strong, and make
          </ThemeText>
          <ThemeText fontType="secondary" fontSize="medium" fontStyle="bold">
          every rep count!
          </ThemeText>
        </View>
      </ImageBackground>

      <View style={style.bodyContainer}>
        <View style={style.middleContainer}>
          <ThemeText fontType="primary" fontSize="xmedium" fontStyle="regular">Assigned Schedules</ThemeText>
          <View>
            
          </View>
        </View>

      </View>
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
  greetingContainer: {
    marginTop: getHeightPercentage(20),
    marginLeft: getWidthPercentage(16),
  },
  scheduleTypeContainer:{
    marginTop: getHeightPercentage(30),
    marginLeft: getWidthPercentage(16),
  },
  motivationTextContainer:{
    marginTop:getHeightPercentage(100),
    alignItems:"center"
  },
  bodyContainer:{
    marginTop:getHeightPercentage(10),
    marginLeft:getWidthPercentage(16),
    marginRight:getWidthPercentage(16),
  },
  middleContainer:{
    alignItems:"flex-start"
  }

});
