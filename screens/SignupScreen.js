import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput
            style={styles.input}
            placeholder="First name"
            textContentType="name"
            autoCapitalize="none"
            onChangeText={text => this.setState({ firstName: text })}
            value={this.state.firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            textContentType="name"
            autoCapitalize="none"
            onChangeText={text => this.setState({ lastName: text })}
            value={this.state.lastName}
          />
        <TextInput
          style={styles.input}
          placeholder="Email"
          textContentType="emailAddress"
          autoCapitalize="none"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => this.props.navigation.navigate('SkinTypeQuiz')}
          >
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.redirect}>Already have an account? Login here!</Text>
        </TouchableOpacity>
      </View>
    );
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