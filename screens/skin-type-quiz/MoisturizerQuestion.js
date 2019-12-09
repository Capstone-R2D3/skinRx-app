import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
        await this.props.addSkinTypeThunk(userId, result);

        this.props.navigation.navigate('Result', {
            result
        });
    }

    render() {
        return (
            <ImageBackground source={require('./blob.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Ionicons 
                            name="ios-arrow-round-back" 
                            color="#dadada"
                            size={55} 
                            style={styles.backBtn}
                            onPress={() => this.props.navigation.navigate('PoreQuestion')} />
                        <Text style={styles.header}>I need a moisturizer that</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.allBtns}>
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
                                    <Text style={styles.btnText}>takes care of my different skin textures (oily and dry).</Text>
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
                        </View>
                        <View>
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
    addSkinTypeThunk: (userId, result) => dispatch(addSkinType(userId, result)),
})

export default connect(mapState, mapDispatch)(MoisturizerQuestion)

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
