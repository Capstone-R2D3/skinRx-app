import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class JourneyScreen extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Journey Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  }
})

