import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import {getRecommendations} from '../../redux/reducers/recommendations';

class Result extends Component {
    constructor(props) {
        super(props);
        this.goHome = this.goHome.bind(this);
    }

    goHome() {
      this.props.navigation.navigate('Home');
    }

    render() {
        const result = this.props.navigation.getParam('result').toLowerCase();
        return (
          <ImageBackground source={require('./blob.png')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    You have {result} skin.
                </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => {
                      this.goHome()
                      this.props.getRecommendations(this.props.user.id, result)
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
  user: state.users.user
})

const mapDispatch = dispatch => ({
  getRecommendations: (userId, skinTypeId) => dispatch(getRecommendations(userId, skinTypeId)),
})

export default connect(mapState, mapDispatch)(Result)

const styles = StyleSheet.create({
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
    fontSize: 18,
    textAlign: 'center',
    color: '#A7CAEB'
  }
});
