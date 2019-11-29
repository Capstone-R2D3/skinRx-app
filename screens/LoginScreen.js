import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground
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
      <View style={styles.container}>
          <ImageBackground source={{ uri: 'https://www.richbeganyphoto.com/wp-content/uploads/2018/07/Awake-GelacticDreamHydratingMasK-SmearOnly-128.jpg' }} style={styles.backgroundImage}>
          <Ionicons 
            name="ios-arrow-round-back" 
            color="white"
            size={70} 
            style={styles.backBtn}
            onPress={() => this.props.navigation.navigate('Welcome')}
            />
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
              style={styles.userBtnLogin}
              onPress={() => this.logIn()}
            >
              <Text style={styles.btnTextLogin}>Login</Text>
            </TouchableOpacity>
          </View>
          </ImageBackground>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover', 
  },
  backBtn: {
    marginTop: 20,
    marginLeft: 20,
  },
  input: {
    width: "75%",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 25,
    alignSelf: 'center'
  },
  header: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 65,
    marginBottom: 60,
    marginTop: "30%",
    color: "white",
    letterSpacing: 3,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  userBtn: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 25,
    backgroundColor: "white",
    padding: 15,
    width: '75%',
    display: 'flex',
    marginBottom: 10,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: "uppercase",
    fontWeight: "bold",
    color: '#b1d5e0',
    letterSpacing: 2,
  },
  userBtnLogin: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 25,
    backgroundColor: "transparent",
    padding: 15,
    width: '75%',
    display: 'flex',
    marginBottom: 10,
  },
  btnTextLogin: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: "uppercase",
    fontWeight: "bold",
    color: 'white',
    letterSpacing: 2,
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