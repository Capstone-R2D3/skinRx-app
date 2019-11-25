import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
// import axios from 'axios';

export default class MoisturizerQuestion extends Component {
    constructor(props) {
        super(props);
        this.addSkinType = this.addSkinType.bind(this);
    }

    // async addSkinType(userId, result) {
    //     await axios.put(`/api/user/${userId}`, {result}); // check path
    //     this.props.navigation.navigate('Home');
    // }

    addSkinType() {
        this.props.navigation.navigate('Home');
    }

    render() {
        let result = this.props.navigation.getParam('result');
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    You have {result} skin.
                </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.addSkinType()}
                    >
                        <Text style={styles.btnText}>Take me to my products!</Text>
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
