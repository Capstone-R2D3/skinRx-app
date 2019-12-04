import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';

export default class SkinQuestion extends Component {
    constructor(props) {
        super(props);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    nextQuestion(typeId) {
        this.props.navigation.navigate('PoreQuestion', {
            score: typeId
        });
    }

    render() {
        return (
            <ImageBackground source={require('./blob.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Text style={styles.header}>My skin is</Text>
                    </View>
                    <View style={{ zIndex: 5, width: '100%', margin: 0 }}>
                        <View style={styles.scrollContainer}>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(4)}
                                >
                                    <Text style={styles.btnText}>oily in the T-zone (forehead, nose, and chin) but dry everywhere else.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(2)}
                                >
                                    <Text style={styles.btnText}>tight, dry, and flaky, sometimes even cracked, staying shine-free throughout the day.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(1)}
                                >
                                    <Text style={styles.btnText}>slick and shiny. It gets oily even after blotting away the shine.</Text>
                                </TouchableOpacity>
                            </View>                
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(5)}
                                >
                                    <Text style={styles.btnText}>red and itchy with rashes and bumps. It stings and burns.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(3)}
                                >
                                    <Text style={styles.btnText}>even and balanced. It shows no sign of dry flakes or oily shine.</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.bodyText}>
                                Progress: 0%
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      width: "100%",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    topContainer: {
        marginTop: "auto",
        marginLeft: 20,
        marginRight: 20,
        width: "100%",
        height: 200,
        position: "absolute"
      },
    header: {
      marginTop: "20%",
      textAlign: "center",
      fontSize: 34,
      color: "white"
    },
    scrollContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        marginTop: 200,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        display: "flex",
        flexDirection: "column",
        paddingTop: "13%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "15%"
      },
    btnContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    userBtn: {
      backgroundColor: "white",
      borderColor: "#A7CAEB",
      borderWidth: 2,
      padding: 15,
      borderRadius: 25,
      marginBottom: 10,
      width: "95%",
    },
    btnText: {
      fontSize: 16,
      color: "#A7CAEB",
      textAlign: "left"
    },
    bodyText: {
        fontSize: 12,
        textAlign: "center",
        margin: 15
    }
});
