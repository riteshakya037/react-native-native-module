import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  addUnreadListener,
  startListening,
  stopListening,
} from '../../links/Message';
import {Colors} from 'react-native/Libraries/NewAppScreen';

class EventsScreen extends Component {
  static navigationOptions = {
    title: 'Events',
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    startListening();
    addUnreadListener(({count}) => {
      this.setState({
        count,
      });
    });
  }

  componentWillUnmount() {
    stopListening();
  }

  render() {
    const {count} = this.state;
    return (
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Sending Events to JavaScript</Text>
          <Text style={styles.sectionDescription}>
            Native modules can signal events to JavaScript without being invoked
            directly. With the help of these we can subscribe to events that are
            triggering on the <Text style={styles.highlight}> Native Side</Text>{' '}
            of the app.
          </Text>
          <Text style={styles.sectionDescription}>
            In the example below we get the
            <Text style={styles.highlight}> no. of unread messages</Text> in the
            form of
            <Text style={styles.highlight}> an Event</Text> from the
            <Text style={styles.highlight}> Native Code</Text>. The counter
            increases every second to emulate change in count.
          </Text>
          <Text style={styles.sectionDescription}>
            The counter starts as soon as we enter this screen and ends when we
            leave it, thus cleaning any possible memory leaks.
          </Text>
        </View>
        <View style={styles.main}>
          <Text tyle={styles.sectionDescription}>Unread Count: {count}</Text>
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

export default EventsScreen;
