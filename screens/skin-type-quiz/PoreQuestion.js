import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class PoreQuestion extends Component {
    constructor(props) {
        super(props);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    nextQuestion(typeId) {
        let score = this.props.navigation.getParam('score');
        score = score + typeId;
        this.props.navigation.navigate('CleanserQuestion', {
            score
        });
    }

    render() {
        return (
            <ImageBackground source={require('./blob.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Ionicons 
                            name="ios-arrow-round-back" 
                            color="#dadada"
                            size={55} 
                            style={styles.backBtn}
                            onPress={() => this.props.navigation.navigate('PoreQuestion')} />
                        <Text style={styles.header}>
                            My pores are usually
                        </Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.allBtns}>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(1)}
                                >
                                    <Text style={styles.btnText}>large and easily clogged with sweat and oil throughout the day.</Text>
                                </TouchableOpacity>
                            </View> 
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(4)}
                                >
                                    <Text style={styles.btnText}>clogged around the nose but small and unnoticeable elsewhere.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(2)}
                                >
                                    <Text style={styles.btnText}>on the smaller side, but I still get blackheads.</Text>
                                </TouchableOpacity>
                            </View>             
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(3)}
                                >
                                    <Text style={styles.btnText}>unnoticeable and uncongested. I don't typically get blackheads.</Text>
                                </TouchableOpacity>
                            </View>  
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(5)}
                                >
                                    <Text style={styles.btnText}>normal to large but can vary since my skin often reacts to products.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.bodyText}>
                                Progress: 25%
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    backgroundImage: {
        width: width,
        height: height,
        flex: 1,
        resizeMode: 'center',
    },
    backBtn: {
        marginTop: height * 0.15,
        marginLeft: width * 0.03,
        color: "white"
    },                                                                                                                                                                      
    container: {
      flex: 1,
      zIndex: 2,
      height: height,
      display: "flex",
      flexDirection: "column",
      justifyContent: 'space-between',
      alignItems: "center"
    },
    topContainer: {
        marginTop: "auto",
        marginBottom: height * 0.2,
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        width: width,
        height: height * 0.25,
      },
    header: {
      textAlign: "center",
      fontSize: 34,
      color: "white",
      paddingTop: height * 0.08,
    },
    bottomContainer: {
        width: width,
        backgroundColor: "white",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: 'center',
        paddingTop: height * 0.05,
        paddingLeft: width * 0.1,
        paddingRight: width * 0.1,
        paddingBottom: height * 0.05,
        marginTop: height * 0.03,
        height: height * 0.65
      },
    btnContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: 'center',
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
        textAlign: "center"
      },
      bodyText: {
          fontSize: 12,
          textAlign: "center"
      }
});
