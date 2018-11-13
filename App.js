import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import DetailsScreen from './src/components/About/AboutComponent';
import MainComponent from './src/components/MainScreen/MainComponent';
import ChatScreen from './src/components/ChatScreen/ChatComponent';
import LoginScreen from './src/components/LoginScreen/LoginComponent';

const MainStack = createStackNavigator({
  MainComponent: MainComponent,
  Details: DetailsScreen,
});

const ChatStack = createStackNavigator({
  Login: LoginScreen,
  Chat: ChatScreen
});

export default createBottomTabNavigator(
  {
    MainScreen: MainStack,
    Chat: ChatStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        if (routeName === 'MainScreen') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Chat') {
          iconName = `ios-chatboxes${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#f4511e',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

