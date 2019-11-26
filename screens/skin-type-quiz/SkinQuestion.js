import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

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
            <View style={styles.container}>
                <Text style={styles.header}>
                    My skin is
                </Text>
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
        )
    }
}

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
      margin: 5
    },
    btnText: {
      fontSize: 18,
      textAlign: "center"
    },
    bodyText: {
        fontSize: 12,
        textAlign: "center",
        margin: 15
    }
});
