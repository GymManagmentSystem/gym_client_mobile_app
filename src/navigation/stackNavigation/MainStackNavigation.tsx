import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';
import EmailVerificationScreen from '../../screens/EmailVerificationScreen';
import OtpVerificationScreen from '../../screens/OtpVerificationScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import ChangePasswordScreen from '../../screens/ChangePasswordScreen';
import SuccessPasswordResetScreen from '../../screens/SuccessPasswordResetScreen';
import BottomStackNavigation from '../bottomStackNavigation/BottomStackNavigation';

export type MainStackNavigationList = {
  LoginScreen: undefined;
  EmailVerficationScreen: undefined;
  OtpVerificationScreen: {userName: string; email: string};
  ResetPasswordScreen: {userName: string};
  ChangePasswordScreen: {userName: string};
  SuccessPasswordResetScreen: undefined;
  BottomStackScreens: undefined;
};

const MainStackNavigation = () => {
  const Stack = createNativeStackNavigator<MainStackNavigationList>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="BottomStackScreens">
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

      <Stack.Screen
        name="BottomStackScreens"
        component={BottomStackNavigation}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
