import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addSkinType } from '../../redux/reducers/users'
import { getRecommendations, updateRecommendations } from '../../redux/reducers/recommendations'


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
                        <Ionicons 
                            name="ios-arrow-round-back" 
                            color="#dadada"
                            size={55} 
                            style={styles.backBtn}
                            onPress={() => this.props.navigation.navigate('PoreQuestion')} />
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
