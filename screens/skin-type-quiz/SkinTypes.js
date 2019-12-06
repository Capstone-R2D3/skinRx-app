import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import {addSkinType} from '../../redux/reducers/users'
import {getRecommendations, updateRecommendations} from '../../redux/reducers/recommendations'


class SkinTypes extends Component {
    constructor(props) {
        super(props);
    }

    async addUserSkinType(typeId) {
      const userId = parseInt(this.props.user.id, 10);
      let result;
      (typeId === 1) && (result = 'Oily');
      (typeId === 2) && (result = 'Dry');
      (typeId === 3) && (result = 'Normal');
      (typeId === 4) && (result = 'Combination');
      (typeId === 5) && (result = 'Sensitive');
      await this.props.addSkinTypeThunk(userId, result)

      if (this.props.recommendations.length === 0) {
        await this.props.getRecommendations(this.props.user.id, result)
        this.props.navigation.navigate('Dashboard');
      } else {
        await this.props.updateRecommendations(this.props.user.id)
        this.props.navigation.navigate('Dashboard');
      }
    }

    render() {
        return (
            <ImageBackground source={require('./blob.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Text style={styles.header}>
                            My skin type is
                        </Text>
                    </View>
                    <View style={{ zIndex: 5, width: '100%', margin: 0 }}>
                        <View style={styles.scrollContainer}>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => {
                                    this.addUserSkinType(4)
                                }}
                                >
                                    <Text style={styles.btnText}>combination</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => {
                                    this.addUserSkinType(2)
                                }}
                                >
                                    <Text style={styles.btnText}>dry</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => {
                                    this.addUserSkinType(1)
                                }}
                                >
                                    <Text style={styles.btnText}>oily</Text>
                                </TouchableOpacity>
                            </View>                
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => {
                                    this.addUserSkinType(5)
                                }}
                                >
                                    <Text style={styles.btnText}>sensitive</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => {
                                    this.addUserSkinType(3)
                                }}
                                >
                                    <Text style={styles.btnText}>normal</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const mapState = state => ({
    user: state.users.user,
    recommendations: state.recommendations.recommendations
})

const mapDispatch = dispatch => ({
  addSkinTypeThunk: (userId, result) => dispatch(addSkinType(userId, result)),
  getRecommendations: (userId, skinTypeId) => dispatch(getRecommendations(userId, skinTypeId)),
  updateRecommendations: (userId) => dispatch(updateRecommendations(userId))
})

export default connect(mapState, mapDispatch)(SkinTypes)

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
      marginTop: "25%",
      textAlign: "center",
      fontSize: 34,
      color: "white"
    },
    scrollContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        marginTop: 250,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        display: "flex",
        flexDirection: "column",
        paddingTop: "20%",
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
      width: "85%",
    },
    btnText: {
      fontSize: 18,
      color: "#A7CAEB",
      textAlign: "center"
    },
    bodyText: {
        fontSize: 18,
        textAlign: "center",
        margin: 15
    }
});
