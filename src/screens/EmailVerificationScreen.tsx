import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ForgotPasswordScreenHeader from '../components/ForgotPasswordScreenHeader';
import {useTheme} from '../context/ThemeContext';

const EmailVerificationScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[style.container, {backgroundColor: theme.colors.background}]}>
        <View style={style.headerConatiner}>
        <ForgotPasswordScreenHeader title="Forgot Password" navigateBack={()=>console.log("hii")}/>
        </View>
      
    </SafeAreaView>
  );
};

export default EmailVerificationScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft:32,
    paddingRight:32
  },
  headerConatiner:{
    marginTop:30
  }
});
