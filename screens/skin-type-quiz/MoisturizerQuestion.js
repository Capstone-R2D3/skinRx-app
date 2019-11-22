import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class MoisturizerQuestion extends Component {
    constructor(props) {
        super(props);
        this.getResult = this.getResult.bind(this);
    }

    getResult(typeId) {
        const score = (this.props.score + typeId) / 4;
        console.log('SCORE SUM IN MOISTURIZER QUESTION: ', score)
        const skinType = Math.round(score);
        let result = '';
        if (skinType === 1) {result = 'Oily'}
        if (skinType === 2) {result = 'Dry'}
        if (skinType === 3) {result = 'Normal'}
        if (skinType === 4) {result = 'Combination'}
        if (skinType === 5) {result = 'Sensitive'}
        this.props.navigation.navigate('Result', {
            result: result,
            userId: this.props.userId
        });
        console.log('RESULT: ', skinType)
    }

    render() {
        console.log('THIS.PROPS.SCORE IN MOISTURIZER QUESTION: ', this.props.score)
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    I need a moisturizer that
                </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.getResult(4)}
                    >
                        <Text style={styles.btnText}>takes care of my different skin textures.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.getResult(2)}
                    >
                        <Text style={styles.btnText}>hydrates my parched skin and seals in the moisture.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.getResult(1)}
                    >
                        <Text style={styles.btnText}>is oil-free and balances my skin's oil production.</Text>
                    </TouchableOpacity>
                </View>                
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.getResult(5)}
                    >
                        <Text style={styles.btnText}>calms and soothes my irritated skin.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.getResult(3)}
                    >
                        <Text style={styles.btnText}>keeps my skin balanced since I don't have major concerns.</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.bodyText}>
                    Progress: 75%
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
