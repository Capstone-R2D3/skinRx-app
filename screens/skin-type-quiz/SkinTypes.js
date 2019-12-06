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
            <ImageBackground source={require('./blob.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Text style={styles.header}>
                            My skin type is
                        </Text>
                    </View>
                    <View style={styles.bottomContainer}>
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
    }
});
