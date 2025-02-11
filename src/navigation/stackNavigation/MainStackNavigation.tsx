import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';
import EmailVerificationScreen from '../../screens/EmailVerificationScreen';
import OtpVerificationScreen from '../../screens/OtpVerificationScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import ChangePasswordScreen from '../../screens/ChangePasswordScreen';
import SuccessPasswordResetScreen from '../../screens/SuccessPasswordResetScreen';

export type MainStackNavigationList = {
  LoginScreen: undefined;
  EmailVerficationScreen: undefined;
  OtpVerificationScreen: undefined;
  ResetPasswordScreen: undefined;
  ChangePasswordScreen: undefined;
  SuccessPasswordResetScreen: undefined;
};

const MainStackNavigation = () => {
  const Stack = createNativeStackNavigator<MainStackNavigationList>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
      <Stack.Screen
        name="EmailVerficationScreen"
        component={EmailVerificationScreen}></Stack.Screen>
      <Stack.Screen
        name="OtpVerificationScreen"
        component={OtpVerificationScreen}></Stack.Screen>
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}></Stack.Screen>
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}></Stack.Screen>
      <Stack.Screen
        name="SuccessPasswordResetScreen"
        component={SuccessPasswordResetScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
