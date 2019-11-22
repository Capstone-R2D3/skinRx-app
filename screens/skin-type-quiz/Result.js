import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
// import axios from 'axios';

export default class MoisturizerQuestion extends Component {
    constructor(props) {
        super(props);
        this.updateSkinType = this.updateSkinType.bind(this);
    }

    // async updateSkinType(userId, result) {
    //     await axios.put(`/api/user/${userId}`, {result}); // check path
    //     this.props.navigation.navigate('Home');
    // }

    updateSkinType() {
        this.props.navigation.navigate('Home');
    }

    render() {
        console.log('THIS.PROPS.RESULT: ', this.props.result)
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Your skin type is {this.props.result}!
                </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.updateSkinType()} // this.props.userId, this.props.result
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
