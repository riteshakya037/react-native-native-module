import React, {PureComponent} from 'react';
import {SafeAreaView} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './Home';
import CallbacksScreen from './Callbacks';
import EventsScreen from './Events';
import ProfileScreen from './ProfileScreen';

const navigationOptions = () => ({header: null});

const AppNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen, navigationOptions},
    Callbacks: {screen: CallbacksScreen},
    Events: {screen: EventsScreen},
    Forward: {
      screen: props => <ProfileScreen userId={'Personal'} {...props} />,
      navigationOptions,
    },
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
