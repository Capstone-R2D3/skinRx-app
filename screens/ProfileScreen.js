import React from 'react';
import { View, 
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Hi, Name</Text>
        <View style={styles.btnContainer}>
          
          {/* Journey Box */}
          <View title="box1"></View>

          {/* Recommendations box */}
          <View title="box2"></View>


          {/* LOGOUT BUTTON BELOW */}
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => this.props.navigation.navigate('Welcome')}
          >
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
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
  input: {
    width: "75%",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#dadada"
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
  },
  redirect: {
    marginTop: 20,
    fontSize: 16
  }
});