import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import {addSkinType} from '../../redux/reducers/users'


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
      this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    My skin type is
                </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.addUserSkinType(4)}
                    >
                        <Text style={styles.btnText}>combination</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.addUserSkinType(2)}
                    >
                        <Text style={styles.btnText}>dry</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.addUserSkinType(1)}
                    >
                        <Text style={styles.btnText}>oily</Text>
                    </TouchableOpacity>
                </View>                
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.addUserSkinType(5)}
                    >
                        <Text style={styles.btnText}>sensitive</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.addUserSkinType(3)}
                    >
                        <Text style={styles.btnText}>normal</Text>
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
  addSkinTypeThunk: (userId, result) => dispatch(addSkinType(userId, result))
})

export default connect(mapState, mapDispatch)(SkinTypes)

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
