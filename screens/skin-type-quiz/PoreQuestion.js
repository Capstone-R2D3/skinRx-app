import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class PoreQuestion extends Component {
    constructor(props) {
        super(props);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    nextQuestion(typeId) {
        let score = this.props.navigation.getParam('score');
        score = score + typeId;
        this.props.navigation.navigate('CleanserQuestion', {
            userId: this.props.navigation.getParam('userId'),
            score
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    My pores are usually
                </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.nextQuestion(4)}
                    >
                        <Text style={styles.btnText}>clogged around the nose but small and unnoticeable on other areas of my face.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.nextQuestion(2)}
                    >
                        <Text style={styles.btnText}>small and tight, even unnoticeable, but I can still get blackheads.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.nextQuestion(1)}
                    >
                        <Text style={styles.btnText}>large and easily clogged with sweat and oil produced from my sebaceous glands.</Text>
                    </TouchableOpacity>
                </View>                
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.nextQuestion(5)}
                    >
                        <Text style={styles.btnText}>normal to large in size but can vary since my skin reacts to products differently.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.nextQuestion(3)}
                    >
                        <Text style={styles.btnText}>unnoticeable. I don't normally have blackheads since my pores aren't congested.</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.bodyText}>
                    Progress: 25%
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
