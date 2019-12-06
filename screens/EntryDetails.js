import React, { Component } from 'react';
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
  import {connect} from 'react-redux'
  import {getOneEntry} from '../redux/reducers/journey'

class EntryDetails extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const date = this.props.navigation.getParam("date")
    this.props.getOneEntry(this.props.user.id, date)
  }

  render() {
    return (
      <View>
        <Text>Entry Details</Text>
      </View>
      )
  }
}

const mapState = state => ({
  user: state.users.user,
  entry: state.journey.entry
})

const mapDispatch = dispatch => ({
  getOneEntry: (userId, date) => dispatch(getOneEntry(userId, date)) 
})

export default connect(mapState, mapDispatch)(EntryDetails)

const styles = StyleSheet.create({

});
