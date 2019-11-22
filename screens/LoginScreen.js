import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import {auth} from '../redux/reducers/users'
import {connect} from 'react-redux'

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showMessage: false
    };
    this.logIn = this.logIn.bind(this)
  }

  async logIn() {
   await this.props.userAuth(this.state.email, this.state.password)
   if (this.props.user.email === this.state.email) {
    this.props.navigation.navigate('Dashboard')
   } else {
     this.toggleMessage()
   }
  }

  toggleMessage() {
    this.setState({
      showMessage: !this.state.showMessage
    })
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.header}>Login</Text>
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
          {
            this.state.showMessage ? 
              <Text style={styles.incorrect}>Username and/or password is incorrect</Text>
            : null
          }
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => this.logIn()}
            >
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.redirect}>Need an account? Sign up here!</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const mapState = state => ({
  user: state.users.user
})

const mapDispatch = dispatch => ({
  userAuth: (email, password) => dispatch(auth(email, password))
})

export default connect(mapState, mapDispatch)(LoginScreen)

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
  },
  incorrect: {
    color: 'red',
    marginBottom: 10,
  }
});