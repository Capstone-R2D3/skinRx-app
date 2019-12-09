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
