import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import {addSkinType} from '../../redux/reducers/users'
import {getRecommendations} from '../../redux/reducers/recommendations'

class Result extends Component {
    constructor(props) {
        super(props);
        this.addSkinType = this.addSkinType.bind(this);
    }

    async addSkinType(result) {
      const userId = this.props.user.id;
      await this.props.addSkinType(userId, result)
      this.props.navigation.navigate('Home');
    }

    render() {
        const result = this.props.navigation.getParam('result');
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Your skin type is {result}.
                </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => {
                      this.addSkinType(result)
                      this.props.getRecommendations(this.props.user.id, result)
                    }}
                    >
                        <Text style={styles.btnText}>Take me to my products!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapState = state => ({
  user: state.users.user
})

mapDispatch = dispatch => ({
  addSkinType: (userId, result) => dispatch(addSkinType(userId, result)),
  getRecommendations: (userId, skinTypeId) => dispatch(getRecommendations(userId, skinTypeId)),
})


export default connect(mapState, mapDispatch)(Result)

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
