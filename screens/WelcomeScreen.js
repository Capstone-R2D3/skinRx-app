import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar, 
  ImageBackground
} from 'react-native'

export default function WelcomeScreen(props) {
  return (
      <View style={styles.container}>
        <ImageBackground source={require('./images/homescreen.jpg')} style={styles.backgroundImage}>

        <Text style={styles.header}>skinRx</Text>
        <View style={styles.btnContainer}>

          <TouchableOpacity 
            style={styles.userBtn}
            onPress={() => props.navigation.navigate('Signup')}>
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.userBtnLogin}
            onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.btnTextLogin}>I have an account</Text>
          </TouchableOpacity>

       </View>
       </ImageBackground>

      </View>
  )
} 

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  header: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 65,
    // marginBottom: 175,
    marginBottom: "49%",
    marginTop: "62%",
    color: "white",
    letterSpacing: 3,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
})