import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class SkinTypeQuiz extends Component {
    constructor(props) {
        super(props);
        this.getSkinType = this.getSkinType.bind(this);
        this.startQuiz = this.startQuiz.bind(this);
    }

    getSkinType() {
        this.props.navigation.navigate('SkinTypes', {
            userId: this.props.navigation.getParam('userId')
        });
    }

    startQuiz() {
        this.props.navigation.navigate('SkinQuestion', {
            userId: this.props.navigation.getParam('userId')
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Let's get started!
                </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.getSkinType()}
                    >
                        <Text style={styles.btnText}>I already know my skin type.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.startQuiz()}
                    >
                        <Text style={styles.btnText}>Help! I don't know what my skin type is!</Text>
                    </TouchableOpacity>
                </View>
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
    }
});
