import React from 'react';
import { View, 
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux';
import { updateUserProfile, logout, getSkinType } from '../redux/reducers/users';
import {clearRecs} from '../redux/reducers/recommendations'


class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.firstName,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName, 
      email: this.props.user.email,
      password: null,
      changedField: false, 
      showMessage: false
    }
  }

  componentDidMount() {
    this.props.getSkinType(this.props.user.skinTypeId)
  }

  handleLogout() {
    this.props.logout()
    this.props.clearRecs()
    this.props.navigation.navigate('Welcome')
  }

  render() {

    return (
      <View style={styles.container}>

          <Text style={styles.header}>Hi, {this.state.name} </Text>

        <ScrollView style={{marginTop: 30}}>
          <View title="box1" style={styles.box1}>
            {/* SKIN TYPE QUESTION! */}
            <View style={styles.box1b}>
              <View>
                <Image source={require('./images/skincare-icon.png')} style={{width:75, height:75, marginRight: 18,}}></Image>
              </View>
              <View>
                <Text>Skin Type: { this.props.skinType ? this.props.skinType : null }</Text>
                <Text />
                <Text>Think it might be different?</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SkinTypeQuiz')}>
                  <Text>Retake our quiz!</Text>
                </TouchableOpacity>
              </View>
            </View>


            {/* UPDATE PROFILE FORM */}
            <View title="box2" style={{width: "80%"}}>
                <Text style={{ fontSize: 20, fontWeight:'bold', textAlign: 'left', marginBottom: 15 }}>Need to make changes?</Text>
                <View style={styles.editProfile}>
                  <Text>First Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="First name"
                    textContentType="givenName"
                    onChangeText={text => this.setState({ firstName: text, changedField: true })}
                    value={this.state.firstName} />
                </View>
                <View style={styles.editProfile}>
                  <Text>Last Name</Text>
                  <TextInput
                  style={styles.input}
                  placeholder="Last name"
                  textContentType="familyName"
                  onChangeText={text => this.setState({ lastName: text, changedField: true })}
                  value={this.state.lastName} />
                </View>
                <View style={styles.editProfile}>
                  <Text>Email Address</Text>
                  <TextInput
                  style={styles.input}
                  placeholder="Email"
                  textContentType="emailAddress"
                  onChangeText={text => this.setState({ email: text, changedField: true })}
                  value={this.state.email} />
                </View>
                <View style={styles.editProfile}>
                  <Text>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="•••••••"
                    secureTextEntry
                    onChangeText={text => this.setState({ password: text, changedField: true })}
                    value={this.state.password} />
                </View>
            </View>

            {
              this.state.showMessage ? <Text style={styles.incorrect}>Please edit a field to update your profile.</Text> : <Text style={styles.incorrect}> </Text>
            }

            {/* UPDATE BUTTON */}
            <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.userBtn}
                      onPress={() => {
                        this.state.changedField 
                        ? ( this.props.updateUserProfile(this.props.user.id, this.state.firstName, this.state.lastName, this.state.email, this.state.password),
                          this.setState({showMessage: false}) ) 
                        : this.setState({showMessage: true})
                      }}>
                      <Text style={styles.btnText}>Update Info</Text>
                    </TouchableOpacity>
            </View>

            {/* LOGOUT BUTTON BELOW */}
            <Text style={{ fontSize: 20, fontWeight:'bold', textAlign: 'left', marginBottom: 15 }}>Done for the day?</Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.handleLogout()}>
                    <Text style={styles.btnText}>Logout</Text>
                </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapState = state => ({
  user: state.users.user,
  skinType: state.users.skinType.name
})

const mapDispatch = dispatch => ({
  getSkinType: (id) => dispatch(getSkinType(id)),
  updateUserProfile: (id, firstName, lastName, email, password) => dispatch(updateUserProfile(id, firstName, lastName, email, password)),
  logout: () => dispatch(logout()),
  clearRecs: () => dispatch(clearRecs())
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
    backgroundColor: "#A7CAEB",
  },
  header: {
    textAlign: "left",
    fontSize: 35,
    marginBottom: 5,
    marginTop: 55,
    marginLeft: 35,
    color: "white",
    fontFamily: "Avenir",
    fontWeight: "bold",
    zIndex: 0,
    position: 'absolute',
  },
  box1: {
    display: "flex",
    justifyContent: "center", 
    alignItems: "center",
    marginTop: 100,
    marginBottom: 35,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    zIndex: 10,
  }, 
  box1b: {
    marginTop: 50, 
    marginBottom: 35,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editProfile: {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
  },
  input: {
    width: "65%",
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: "#dadada", 
    borderBottomWidth: 2, 
    color: "grey",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userBtn: {
    marginTop: 7,
    marginBottom: 50,
    backgroundColor: "#A7CAEB",
    padding: 11,
    width: "50%",
    display: "flex",
    borderRadius: 22,
  },
  btnText: {
    fontSize: 15,
    textAlign: "center",
    textTransform: "uppercase", 
    letterSpacing: 2, 
    fontWeight: "bold",
    color: "white",
  },
  redirect: {
    marginTop: 10,
    fontSize: 16
  },
  incorrect: {
    marginTop: 5,
    color: 'red',
  }
});
