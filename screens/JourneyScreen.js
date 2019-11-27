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
  }

  componentDidMount() {
    const userId = this.props.user.id;
    this.props.getEntries(userId);
  }

  delete(entryId) {
    const userId = this.props.user.id;
    this.props.deleteEntry(userId, entryId);
  }

  render() {
    const userId = this.props.user.id;
    return (
      <View style={styles.container}>
        <View>
          {
            (this.props.entries || []).map((entry, idx) => {return <JourneyCard entry={entry} key={entry.id} delete={this.delete} />})
          }
        </View>
        <TouchableOpacity style={styles.userBtn}> 
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
  entries: state.journey.entries
})

const mapDispatch = dispatch => ({
  getEntries: (userId) => dispatch(getEntries(userId)),
  deleteEntry: (userId, entryId) => dispatch(deleteEntry(userId, entryId))
})

export default connect(mapState, mapDispatch)(JourneyScreen);

JourneyScreen.navigationOptions = {
  title: 'My Skin Journey',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20
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
  text: {
    fontSize: 20,
  }
});
