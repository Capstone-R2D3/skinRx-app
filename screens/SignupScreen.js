import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground
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
    };
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
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri:
              "https://www.richbeganyphoto.com/wp-content/uploads/2018/07/Awake-GelacticDreamHydratingMasK-SmearOnly-128.jpg"
          }}
          style={styles.backgroundImage}
        >
          <Ionicons
            name="ios-arrow-round-back"
            color="white"
            size={70}
            style={styles.backBtn}
            onPress={() => this.props.navigation.navigate("Welcome")}
          />
          <Text style={styles.header}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            textContentType="name"
            autoCapitalize="words"
            onChangeText={text => this.setState({ firstName: text })}
            value={this.state.firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            textContentType="name"
            autoCapitalize="words"
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
            autoCapitalize="none"
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
          />
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
              onPress={() => this.userSignUp()}
            >
              <Text style={styles.btnTextLogin}>Next</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
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
    backgroundColor: "white"
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover"
  },
  backBtn: {
    marginTop: 20,
    marginLeft: 20
  },
  input: {
    width: "75%",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 25,
    alignSelf: "center"
  },
  header: {
    fontFamily: "Avenir",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 55,
    marginBottom: 60,
    marginTop: "20%",
    color: "white",
    letterSpacing: 3
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  userBtn: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 25,
    backgroundColor: "white",
    padding: 15,
    width: "75%",
    display: "flex",
    marginBottom: 10
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#b1d5e0",
    letterSpacing: 2
  },
  userBtnLogin: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 25,
    backgroundColor: "transparent",
    padding: 15,
    width: "75%",
    display: "flex",
    marginBottom: 10
  },
  btnTextLogin: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2
  },
  redirect: {
    marginTop: 20,
    fontSize: 16
  },
  incorrect: {
    color: "white",
    marginBottom: 10,
    width: "80%",
    textAlign: "center",
    marginLeft: "10%"
  }
});
