import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {ForgotPasswordScreenStyles} from '../styles/ForgotPasswordScreenStyles';
import {getHeightPercentage} from '../utility/Dimensions';
import {ScreenContainerStyles} from '../styles/ScreenContainerStyles';
import ThemeText from '../components/ThemeText';
import PrimaryButton from '../components/PrimaryButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackNavigationList} from '../navigation/stackNavigation/MainStackNavigation';
import {useNavigation} from '@react-navigation/native';


type SuccessPasswordNavigationProp = NativeStackNavigationProp<
  MainStackNavigationList,
  'SuccessPasswordResetScreen'
>;

const SuccessPasswordResetScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<SuccessPasswordNavigationProp>();

  return (
    <SafeAreaView
      style={[
        ScreenContainerStyles.container,
        {backgroundColor: theme.colors.background.secondary},
      ]}>
      <View style={style.imageContainer}>
        <View style={style.imageBox}>
          <Image source={require('../../assets/icons/rightIcon.png')} />
        </View>
      </View>

      <View style={style.textConatiner}>
        <ThemeText fontType="primary" fontStyle="regular" fontSize="xmedium">
          Your password has been reset{' '}
        </ThemeText>
        <ThemeText fontType="primary" fontStyle="bold" fontSize="large">
          Successfully !
        </ThemeText>
      </View>

      <View style={style.buttonContainer}>
        <PrimaryButton
          title="Continue"
          titleFontColor="primary"
          onHandle={() => navigation.navigate('LoginScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SuccessPasswordResetScreen;

const style = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHeightPercentage(127, 852),
  },
  imageBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  textConatiner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: getHeightPercentage(94, 852),
  },
  buttonContainer: {
    marginTop: getHeightPercentage(166, 852),
  },
});
