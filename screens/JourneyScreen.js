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
import { getEntries } from '../redux/reducers/journey';

class JourneyScreen extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const userId = this.props.user.id;
    this.props.getEntries(userId);
  }

  render() {
    return (
      <View>
        <TouchableOpacity> 
          <Button title="Add Entry" textStyle={{color: 'grey'}} style={{borderWidth: 1, borderColor: 'grey', borderRadius:10}} 
            onPress={() => {
              this.props.navigation.navigate("JourneyForm");
            }}></Button>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapState = state => ({
  user: state.users.user,
  entries: state.journey.entries,
  entry: state.journey.entry
})

const mapDispatch = dispatch => ({
  getEntries: (userId) => dispatch(getEntries(userId))
})

export default connect(mapState, mapDispatch)(JourneyScreen);

JourneyScreen.navigationOptions = {
  title: 'My Skin Journey',
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  }
})

