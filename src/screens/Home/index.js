import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {navigateTo} from '../../links/Navigation';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  navigateToCallbacksTest = () => {
    const {
      navigation: {navigate},
    } = this.props;
    navigate('Callbacks');
  };

  navigateToEventsTest = () => {
    const {
      navigation: {navigate},
    } = this.props;
    navigate('Events');
  };

  navigateToForwardScreen = () => {
    const {
      navigation: {navigate},
    } = this.props;
    navigate('Forward');
  };

  navigateToNativeScreen = () => {
    navigateTo('NativeDemo');
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Button
          title="Communication through Callbacks"
          onPress={this.navigateToCallbacksTest}
        />
        <Button
          title="Testing events to JS"
          onPress={this.navigateToEventsTest}
        />
        <Button
          title="Testing Native Navigation"
          onPress={this.navigateToNativeScreen}
        />
        <Button
          title="Testing Forward Navigation"
          onPress={this.navigateToForwardScreen}
        />
      </View>
    );
  }
}

export default HomeScreen;
