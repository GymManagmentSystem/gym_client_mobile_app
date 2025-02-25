import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { getHeightPercentage } from '../utility/Dimensions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackNavigationList } from '../navigation/stackNavigation/MainStackNavigation';
import { useNavigation } from '@react-navigation/native';



type StartScreenNavigationProp = NativeStackNavigationProp<
   MainStackNavigationList,
   'StartScreen'
  
>;


const StartScreen = () => {

  const navigation=useNavigation<StartScreenNavigationProp>()


  return (
    <ImageBackground
      style={style.conatiner}
      source={require('../../assets/images/startImage.png')}>
      <View style={style.buttonContainer}>
        <PrimaryButton
          title="START YOUR FITNESS ADVENTURE"
          titleFontColor="secondary"
          onHandle={() => {
            navigation.navigate('LoginScreen');
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default StartScreen;

const style = StyleSheet.create({
  conatiner: {
    flex: 1,
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-end",
    alignItems:"center"
  },
  buttonContainer:{
    marginBottom:getHeightPercentage(60)
  }
});
