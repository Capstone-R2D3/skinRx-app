import React from 'react';
import { View, 
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux';
import { updateUserProfile } from '../redux/reducers/users';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.firstName,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName, 
      email: this.props.user.email,
      password: '',
    }
  }

  render() {

    // console.log('from profile page', this.props.user)

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.header}>Hi, {this.state.name} </Text>

          {/* SKIN TYPE QUESTION! */}
          <View title="box1">
              <Text>Current Skin Type:</Text>
              <Text>EDIT THIS!</Text>
              <Text />
              <Text>Think it might be different?</Text>
              <Text>Retake our quiz!</Text>
          </View>

          {/* UPDATE PROFILE FORM */}
          <View title="box2">
              <TextInput
                style={styles.input}
                placeholder="First name"
                textContentType="givenName"
                onChangeText={text => this.setState({ firstName: text })}
                value={this.state.firstName}
              />
              <TextInput
                style={styles.input}
                placeholder="Last name"
                textContentType="familyName"
                onChangeText={text => this.setState({ lastName: text })}
                value={this.state.lastName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                textContentType="emailAddress"
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />
              {/* <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              /> */}
          </View>

          {/* UPDATE BUTTON */}
          <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.props.updateUserProfile(this.props.user.id, this.state.firstName, this.state.lastName, this.state.email)}
                  >
                    <Text style={styles.btnText}>Edit Profile</Text>
                  </TouchableOpacity>
          </View>


          {/* LOGOUT BUTTON BELOW */}
          <View style={styles.btnContainer}>
              <TouchableOpacity
                  style={styles.userBtn}
                  onPress={() => this.props.navigation.navigate('Welcome')}>
                  <Text style={styles.btnText}>Logout</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapState = state => ({
  user: state.users.user
})

const mapDispatch = dispatch => ({
  updateUserProfile: (id, firstName, lastName, email) => dispatch(updateUserProfile(id, firstName, lastName, email))
})

export default connect(mapState, mapDispatch)(ProfileScreen)

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

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
  input: {
    width: 300,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#dadada"
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  userBtn: {
    backgroundColor: "#dadada",
    padding: 15,
    width: "75%",
    display: "flex",
    borderRadius: 7,
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",
    width: 100,
  },
  redirect: {
    marginTop: 10,
    fontSize: 16
  }
});