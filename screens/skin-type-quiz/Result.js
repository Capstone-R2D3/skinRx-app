import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {getRecommendations, getExistingUserRecs, updateRecommendations} from '../../redux/reducers/recommendations';

class Result extends Component {
    constructor(props) {
        super(props);
        this.goHome = this.goHome.bind(this);
    }

    async goHome(result) {
      if (this.props.recommendations.length === 0) {
        await this.props.getRecommendations(this.props.user.id, result)
        this.props.navigation.navigate('Dashboard');
      } else {
        await this.props.updateRecommendations(this.props.user.id)
        this.props.navigation.navigate('Dashboard');
      }
    }

    render() {
        const result = this.props.navigation.getParam('result').toLowerCase();
        return (
          <ImageBackground source={require('./blob.png')} style={{width: '100%', height: '100%'}}>
            <Ionicons 
                name="ios-arrow-round-back" 
                color="#dadada"
                size={55} 
                style={styles.backBtn}
                onPress={() => this.props.navigation.navigate('MoisturizerQuestion')} />
            <View style={styles.container}>
                <Text style={styles.header}>
                    You have {result} skin.
                </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => {
                      this.goHome(result)
                    }}
                    >
                        <Text style={styles.btnText}>Take me to my products!</Text>
                    </TouchableOpacity>
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
  getRecommendations: (userId, skinTypeId) => dispatch(getRecommendations(userId, skinTypeId)),
  getExistingUserRecs: (userId) => dispatch(getExistingUserRecs(userId)),
  updateRecommendations: (userId) => dispatch(updateRecommendations(userId))
})

export default connect(mapState, mapDispatch)(Result)

const styles = StyleSheet.create({
  backBtn: {
    marginTop: 30,
    marginLeft: 20,
    color: "white"
},
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    marginBottom: 20
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  userBtn: {
    borderWidth: 2,
    borderColor: "#A7CAEB",
    borderRadius: 25,
    backgroundColor: "white",
    padding: 15,
    width: '75%',
    display: 'flex',
    marginBottom: 10
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#A7CAEB'
  }
});
