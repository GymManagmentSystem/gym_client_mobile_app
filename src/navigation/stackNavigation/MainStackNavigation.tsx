import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';
import EmailVerificationScreen from '../../screens/EmailVerificationScreen';
import OtpVerificationScreen from '../../screens/OtpVerificationScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';

export type MainStackNavigationList = {
  LoginScreen: undefined;
  EmailVerficationScreen: undefined;
  OtpVerificationScreen: undefined;
  ResetPasswordScreen:undefined
};

const MainStackNavigation = () => {
  const Stack = createNativeStackNavigator<MainStackNavigationList>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ResetPasswordScreen">
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
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
