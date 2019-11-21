import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'

export default class SkinTypeForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Skin Type Form</Text>
        <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => this.props.navigation.navigate('AllergiesForm')}
            >
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

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
  },
  btnText: {
    fontSize: 18,
    textAlign: "center"
  }
})