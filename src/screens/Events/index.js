import React, {Component} from 'react';
import {View, Text} from 'react-native';

class EventsScreen extends Component {
  static navigationOptions = {
    title: 'Events',
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} />
    );
  }
}

export default EventsScreen;
