import React, {PureComponent} from 'react';
import {SafeAreaView} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './Home';
import CallbacksScreen from './Callbacks';
import EventsScreen from './Events';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Callbacks: CallbacksScreen,
    Events: EventsScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class Routers extends PureComponent {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <AppContainer />
      </SafeAreaView>
    );
  }
}
