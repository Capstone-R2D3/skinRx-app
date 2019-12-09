import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { getEntries, deleteEntry } from '../redux/reducers/journey';
import JourneyCard from './JourneyCard';
import Carousel from 'react-native-snap-carousel';


class JourneyEntries extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const userId = this.props.user.id;
    this.props.getEntries(userId);
  }

  update(entry) {
    this.props.navigation.navigate("JourneyForm", {
      entry: entry
    });
  }

  delete(entryId) {
    const userId = this.props.user.id;
    this.props.deleteEntry(userId, entryId);
  }

  render() {
    const entries = this.props.entries;

    return (
      <View style={styles.container1}>
          {
            entries.length === 0 ? 
            <View style={styles.container2}>
              <Image source={require('./images/report.png')} style={{height: 80, width: 80, marginBottom: '5%'}}/>
              <Text style={styles.text}>Uh Oh! You don't have any entries yet! Swipe left to add one</Text>
            </View>
            : 
            <ScrollView>
              {entries.map((entry, idx) => {return <JourneyCard entry={entry} key={entry.id} delete={this.delete} update={this.update}/>})}
            </ScrollView>
          }
      </View>
    )
  }
}

const mapState = state => ({
  user: state.users.user,
  entries: state.journey.entries
})

const mapDispatch = dispatch => ({
  getEntries: (userId) => dispatch(getEntries(userId)),
  deleteEntry: (userId, entryId) => dispatch(deleteEntry(userId, entryId))
})

export default connect(mapState, mapDispatch)(JourneyEntries);

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: 'white',
    marginBottom: '2%'
  },
  container2: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 2, 
    fontWeight: "bold",
    color: '#BFD7ED',
    fontFamily: 'Avenir',
    padding: '4%'
  }
});
