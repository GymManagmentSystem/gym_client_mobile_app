import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import {Image, View} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import TrackScheduleScreen from '../../screens/TrackScheduleScreen';
import PaymentHistoryScreen from '../../screens/PaymentHistoryScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import TabIcon from '../../components/TabIcon';
import { getHeightPercentage } from '../../utility/Dimensions';

type BottomTabNavigationList = {
  HomeScreen: undefined;
  TrackScheduleScreen: undefined;
  PaymentHistoryScreen: undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabNavigationList>();

const BottomStackNavigation = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background.tertiory,
          height: getHeightPercentage(70),
        },
        tabBarShowLabel: false,
      }}>
      {[
        {
          name: 'HomeScreen',
          component: HomeScreen,
          icon: require('../../../assets/icons/homeIcon.png'),
        },
        {
          name: 'TrackScheduleScreen',
          component: TrackScheduleScreen,
          icon: require('../../../assets/icons/exerciseIcon.png'),
        },
        {
          name: 'PaymentHistoryScreen',
          component: PaymentHistoryScreen,
          icon: require('../../../assets/icons/paymentIcon.png'),
        },
        {
          name: 'ProfileScreen',
          component: ProfileScreen,
          icon: require('../../../assets/icons/profileIcon.png'),
        },
      ].map(({name, component, icon}) => (
        <Tab.Screen
          key={name}
          name={name as keyof BottomTabNavigationList}
          component={component}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon source={icon} focused={focused} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomStackNavigation;
