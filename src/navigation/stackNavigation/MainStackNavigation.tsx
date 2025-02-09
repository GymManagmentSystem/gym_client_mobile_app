import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';


export type MainStackNavigationList = {
  LoginScreen: undefined;
};

const MainStackNavigation = () => {
  const Stack = createNativeStackNavigator<MainStackNavigationList>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainStackNavigation;