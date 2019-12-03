import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import {auth} from '../redux/reducers/users'
import {connect} from 'react-redux'
import {Ionicons} from '@expo/vector-icons'

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
      <ScrollView>
        {/* <Text style={{color: "#a7caeb", opacity: .1, fontSize: 150, zIndex: 0, position: "absolute", margin}}>skinRx</Text> */}
        <Ionicons 
            name="ios-arrow-round-back" 
            color="#dadada"
            size={55} 
            style={styles.backBtn}
            onPress={() => this.props.navigation.navigate('Welcome')} />
      <View style={styles.container}>
          <Text style={styles.header}>Nice to see you.</Text>
          <Text style={{fontSize: 18, marginBottom: 45, }}>Please log in.</Text>
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
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password} />
          {
            this.state.showMessage ? 
              <Text style={styles.incorrect}>Username and/or password is incorrect</Text>
            : null
          }
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.userBtnLogin}
              onPress={() => this.logIn()}>
              <Text style={styles.btnTextLogin}>Continue</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.redirect}>Need an account? Sign up here.</Text>
          </TouchableOpacity>
      </View>
      </ScrollView>
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
    backgroundColor: "white",
    // backgroundColor: "#f1f1f1",
    marginTop: "12%", 
    // zIndex: 10,
  },
  backBtn: {
    marginTop: 25,
    marginLeft: 20, 
    // zIndex: 5,
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
    marginBottom: 20, 
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
  }
});