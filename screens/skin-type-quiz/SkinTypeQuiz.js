import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default class SkinTypeQuiz extends Component {
    constructor(props) {
        super(props);
        this.getSkinType = this.getSkinType.bind(this);
        this.startQuiz = this.startQuiz.bind(this);
    }

    getSkinType() {
      this.props.navigation.navigate('SkinTypes');
    }

    startQuiz() {
        this.props.navigation.navigate('SkinQuestion');
    }

    render() {
        return (
            <ImageBackground source={require('./blob.png')} style={{width: '100%', height: '100%'}}>
              <View style={styles.container}>
                <Text style={styles.header}>
                    Let's get started!
                </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.skipQuizBtn}
                    onPress={() => this.getSkinType()}
                    >
                        <Text style={styles.skipQuizBtnText}>I already know my skin type.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.startQuizBtn}
                    onPress={() => this.startQuiz()}
                    >
                        <Text style={styles.startQuizBtnText}>Help! I don't know my skin type!</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    header: {
      textAlign: "center",
      color: "white",
      fontSize: 30,
      marginBottom: 20
    },
    btnContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    startQuizBtn: {
      borderWidth: 2,
      borderColor: "white",
      borderRadius: 25,
      backgroundColor: "#A7CAEB",
      padding: 15,
      width: '75%',
      display: 'flex',
      marginBottom: 10
    },
    startQuizBtnText: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white'
    },
    skipQuizBtn: {
      borderWidth: 2,
      borderColor: "white",
      borderRadius: 25,
      backgroundColor: "white",
      padding: 15,
      width: '75%',
      display: 'flex',
      marginBottom: 10
    },
    skipQuizBtnText: {
      fontSize: 18,
      textAlign: 'center',
      color: '#A7CAEB'
    }
});
