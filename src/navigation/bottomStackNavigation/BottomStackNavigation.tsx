import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import {Image, View} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import TrackScheduleScreen from '../../screens/TrackScheduleScreen';
import PaymentHistoryScreen from '../../screens/PaymentHistoryScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import TabIcon from '../../components/TabIcon';

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
          height: 92,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const color = focused
              ? theme.icons.iconColor.active
              : theme.icons.iconColor.inActive;
            const backgroundColor = focused
              ? theme.icons.backgroundColor.active
              : theme.icons.backgroundColor.inActive;
            return (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/icons/homeIcon.png')}
                  style={{width: 20.5, height: 20, tintColor: color}}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="TrackScheduleScreen"
        component={TrackScheduleScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const color = focused
              ? theme.icons.iconColor.active
              : theme.icons.iconColor.inActive;
            const backgroundColor = focused
              ? theme.icons.backgroundColor.active
              : theme.icons.backgroundColor.inActive;
            return (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/icons/exerciseIcon.png')}
                  style={{width: 20.5, height: 20, tintColor: color}}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="PaymentHistoryScreen"
        component={PaymentHistoryScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const color = focused
              ? theme.icons.iconColor.active
              : theme.icons.iconColor.inActive;
            const backgroundColor = focused
              ? theme.icons.backgroundColor.active
              : theme.icons.backgroundColor.inActive;
            return (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/icons/paymentIcon.png')}
                  style={{width: 20.5, height: 20, tintColor: color}}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const color = focused
              ? theme.icons.iconColor.active
              : theme.icons.iconColor.inActive;
            const backgroundColor = focused
              ? theme.icons.backgroundColor.active
              : theme.icons.backgroundColor.inActive;
            return (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/icons/profileIcon.png')}
                  style={{width: 20.5, height: 20, tintColor: color}}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomStackNavigation;
