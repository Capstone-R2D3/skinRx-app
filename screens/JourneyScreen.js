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

class JourneyScreen extends React.Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      items: {}
    }
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
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Entries</Text>
          <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("JourneyForm", {
                  entry: null
                });
              }}
          >
              <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          {
            (this.props.entries || []).map((entry, idx) => {return <JourneyCard entry={entry} key={entry.id} delete={this.delete} update={this.update}/>})
          }
        </View>
      </ScrollView>
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

export default connect(mapState, mapDispatch)(JourneyScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#A7CAEB"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userBtn: {
    backgroundColor: "#dadada",
    padding: 15,
    width: "75%",
    display: "flex",
    borderRadius: 7,
    margin: 5
  },
  btnText: {
    fontSize: 18,
    textAlign: "center"
  },
  headerText: {
    color: 'white',
    margin: '6%',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 35,
    letterSpacing: 2,
    shadowColor: '#699add',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1
  }, 
});
