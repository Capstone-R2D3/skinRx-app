import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import {addSkinType} from '../../redux/reducers/users'
import {connect} from 'react-redux'


class MoisturizerQuestion extends Component {
    constructor(props) {
        super(props);
        this.getResult = this.getResult.bind(this);
    }

   async  getResult(typeId) {
        let score = this.props.navigation.getParam('score');
        score = (score + typeId) / 4;
        const skinType = Math.round(score);
        let result;
        if (skinType === 1) {result = 'Oily'}
        if (skinType === 2) {result = 'Dry'}
        if (skinType === 3) {result = 'Normal'}
        if (skinType === 4) {result = 'Combination'}
        if (skinType === 5) {result = 'Sensitive'}
        const userId = this.props.user.id;
        await this.props.addSkinType(userId, result);

        this.props.navigation.navigate('Result', {
            result
        });
    }

    render() {
        return (
            <ImageBackground source={require('./blob.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Text style={styles.header}>I need a moisturizer that</Text>
                    </View>
                    <View style={{ zIndex: 5 }}>
                        <View style={styles.scrollContainer}>
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
                                onPress={() => this.getResult(4)}
                                >
                                    <Text style={styles.btnText}>takes care of my different skin textures (like oily and dry).</Text>
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
                                onPress={() => this.getResult(5)}
                                >
                                    <Text style={styles.btnText}>calms and soothes my irritated skin.</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.bodyText}>
                                Progress: 75%
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const mapState = state => ({
    user: state.users.user
  })
  
 const mapDispatch = dispatch => ({
    addSkinType: (userId, result) => dispatch(addSkinType(userId, result)),
  })

export default connect(mapState, mapDispatch)(MoisturizerQuestion)


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
        marginTop: "auto",
      textAlign: "center",
      fontSize: 34,
      color: "white"
    },
    scrollContainer: {
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        marginTop: 250,
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
    },
    userBtn: {
      backgroundColor: "white",
      borderColor: "#A7CAEB",
      borderWidth: 2,
      padding: 15,
      borderRadius: 25,
      marginBottom: 10
    },
    btnText: {
      fontSize: 18,
      color: "#A7CAEB",
      textAlign: "center"
    },
    bodyText: {
        fontSize: 12,
        textAlign: "center",
        margin: 15
    }
});
