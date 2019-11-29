import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getUnreadCount} from '../../links/Message';

import {Colors} from 'react-native/Libraries/NewAppScreen';

class CallbacksScreen extends Component {
  static navigationOptions = {
    title: 'Callbacks',
  };
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    getUnreadCount().then(count => {
      this.setState({
        count,
        loading: false,
      });
    });
  }

  render() {
    const {loading, count} = this.state;
    return (
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Native Module Communication</Text>
          <Text style={styles.sectionDescription}>
            This screen demonstrates how we could call
            <Text style={styles.highlight}> Native Codes</Text> from
            <Text style={styles.highlight}> Javascript</Text> with the help of
            <Text style={styles.highlight}> Native Modules</Text>. This can be
            used to get data or call methods from the
            <Text style={styles.highlight}> Native Code</Text>.
          </Text>
          <Text style={styles.sectionDescription}>
            In the example below we get the
            <Text style={styles.highlight}> no. of unread messages</Text> from
            <Text style={styles.highlight}> Native Code</Text>. A delay of
            <Text style={styles.highlight}> 5 second</Text> is introduced to
            emulate reading some database.
          </Text>
        </View>
        <View style={styles.main}>
          <Text tyle={styles.sectionDescription}>
            Unread Count: {loading ? 'Loading' : count}
          </Text>
        </View>
      </View>
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

export default CallbacksScreen;
