import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Button} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {goBack} from '../../links/Navigation';

class ProfileScreen extends Component {
  navigateToCallbacksTest = () => {
    goBack(this.props);
  };

  render() {
    const {userId} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Hello From Profile</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Received Props: {userId}</Text>
          </View>
          <Button title="Go Back" onPress={this.navigateToCallbacksTest} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
    display: 'flex',
    height: '100%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default ProfileScreen;
