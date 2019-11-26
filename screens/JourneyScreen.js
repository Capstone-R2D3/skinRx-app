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

export default class JourneyScreen extends React.Component {
  constructor() {
    super()
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

JourneyScreen.navigationOptions = {
  title: 'My Skin Journey',
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  }
})

