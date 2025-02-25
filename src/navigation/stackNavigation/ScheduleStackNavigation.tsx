import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TrackScheduleScreen from '../../screens/TrackScheduleScreen';
import ExerciseDetailsScreen from '../../screens/ExerciseDetailsScreen';

export type ScheduleStackNavigation = {
  TrackScheduleScreen: undefined;
  ExerciseDeatailsScreen: {exerciseName: string};
};

const ScheduleStackNavigation = () => {
  const Stack = createNativeStackNavigator<ScheduleStackNavigation>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ExerciseDeatailsScreen">
      <Stack.Screen
        name="TrackScheduleScreen"
        component={TrackScheduleScreen}></Stack.Screen>
      <Stack.Screen
        name="ExerciseDeatailsScreen"
        component={ExerciseDetailsScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ScheduleStackNavigation;
