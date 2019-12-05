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

class JourneyEntries extends React.Component {
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
      <ScrollView>
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

export default connect(mapState, mapDispatch)(JourneyEntries);
