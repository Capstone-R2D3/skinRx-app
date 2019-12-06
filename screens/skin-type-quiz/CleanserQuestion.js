import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default class CleanserQuestion extends Component {
    constructor(props) {
        super(props);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    nextQuestion(typeId) {
        let score = this.props.navigation.getParam('score');
        score = score + typeId;
        this.props.navigation.navigate('MoisturizerQuestion', {
            score
        });
    }

    render() {
        return (
            <ImageBackground source={require('./blob.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Text style={styles.header}>The right cleanser will</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.allBtns}>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(2)}
                                >
                                    <Text style={styles.btnText}>clean my skin without drying it more than it already is.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(5)}
                                >
                                    <Text style={styles.btnText}>not irritate or sting my reactive skin.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(1)}
                                >
                                    <Text style={styles.btnText}>refresh my congested skin, even though it'll get oily again.</Text>
                                </TouchableOpacity>
                            </View>                
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(4)}
                                >
                                    <Text style={styles.btnText}>clear out my congested T-zone without drying out my cheeks.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(3)}
                                >
                                    <Text style={styles.btnText}>maintain my clear complexion.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.bodyText}>
                                Progress: 50%
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: 'center',
    },
    container: {
      flex: 1,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    topContainer: {
        marginTop: "auto",
        marginBottom: "auto",
        display: "flex",
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
        width: "100%"
      },
    header: {
      textAlign: "center",
      fontSize: 34,
      color: "white"
    },
    bottomContainer: {
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "15%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "15%"
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
