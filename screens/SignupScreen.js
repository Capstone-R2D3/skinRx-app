import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { signUp, me, logout } from "../redux/reducers/users";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      showMessage: false,
      incorrect: false
    }
  }

  async userSignUp() {
    await this.props.me(this.state.email)
    if (
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.password ||
      !this.state.email
    ) {
      this.toggleMessage();
    } else if (!this.props.user.length) {
      await this.props.signUpThunk(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.password
      );
      this.props.navigation.navigate("SkinTypeQuiz", {
        email: this.state.email
      });
    } else {
      await this.props.logout()
      this.toggleIncorrect()
    }
  }

  toggleMessage() {
    this.setState({
      showMessage: !this.state.showMessage
    });
  }

  toggleIncorrect() {
    this.setState({
      incorrect: !this.state.incorrect
    });
  }

  render() {
    return (
      <ScrollView>
        <Ionicons
            name="ios-arrow-round-back"
            color="#dadada"
            size={50}
            style={styles.backBtn}
            onPress={() => this.props.navigation.navigate("Welcome")} />
        <View style={styles.container}>
          <Text style={styles.header}>New around town?</Text>
          <Text style={{fontSize: 18, marginBottom: 45,}}>We're happy you're here.</Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            textContentType="name"
            autoCapitalize="words"
            onChangeText={text => this.setState({ firstName: text })}
            value={this.state.firstName} />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            textContentType="name"
            autoCapitalize="words"
            onChangeText={text => this.setState({ lastName: text })}
            value={this.state.lastName} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            textContentType="emailAddress"
            autoCapitalize="none"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password} />
          {this.state.showMessage ? (
            <Text style={styles.incorrect}>
              Please fill in all fields to create your account.
            </Text>
          ) : null}
          {this.state.incorrect ? (
            <Text style={styles.incorrect}>
              An account with this email already exists. Please login or create
              a new account to continue.
            </Text>
          ) : null}
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.userBtnLogin}
              onPress={() => this.userSignUp()}>
              <Text style={styles.btnTextLogin}>Continue</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.redirect}>Already have an account? Log in here.</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }
}

const mapState = state => ({
  user: state.users.user
});

const mapDispatch = dispatch => ({
  signUpThunk: (firstName, lastName, email, password) => dispatch(signUp(firstName, lastName, email, password)),
  me: (email) => dispatch(me(email)),
  logout: () => dispatch(logout())
});

export default connect(mapState, mapDispatch)(SignupScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 25,
  },
  backBtn: {
    marginTop: 25,
    marginLeft: 20
  },
  input: {
    width: "75%",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1, 
    borderColor: "#dadada",
  },
  header: {
    textAlign: "center",
    fontSize: 32,
    marginBottom: 15, 
    fontWeight: "bold",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userBtnLogin: {
    marginTop: 15,
    padding: 15,
    width: "75%",
    display: "flex",
    borderRadius: 25,
    backgroundColor: "#a7caeb",
  },
  btnTextLogin: {
    fontSize: 18,
    textAlign: "center", 
    textTransform: "uppercase", 
    letterSpacing: 2,
    color: "white", 
    fontWeight: "bold",
  },
  redirect: {
    marginTop: 20,
    fontSize: 16
  },
  incorrect: {
    color: 'red',
    marginBottom: 10,
    width: "80%",
    textAlign: "center",
  }
});
