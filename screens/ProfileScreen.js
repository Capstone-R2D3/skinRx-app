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
import { updateUserProfile, logout } from '../redux/reducers/users';
import {clearRecs} from '../redux/reducers/recommendations'


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

  handleLogout() {
    this.props.logout()
    this.props.clearRecs()
    this.props.navigation.navigate('Welcome')
  }

  render() {

    // console.log('from profile page', this.props.user)

    return (
      <View style={styles.container}>

          <Text style={styles.header}>Hi, {this.state.name} </Text>

          <ScrollView>
          <View title="box1" style={styles.box1}>
            {/* SKIN TYPE QUESTION! */}
            <View style={styles.box1b}>
              <View>
                <Image source={require('./images/skincare-icon.png')} style={{width:75, height:75, marginRight: 18,}}></Image>
              </View>
              <View>
                {/*********** need to set up router and pass in skintype prop ***********/}
                <Text>SKIN TYPE: {'Pass In Prop Here'}</Text>
                <Text />
                {/*********** need to have a link for users to retake quiz ***********/}
                <Text>Think it might be different?</Text>
                <Text>Retake our quiz!</Text>
              </View>
            </View>


            {/* UPDATE PROFILE FORM */}
            <View title="box2" style={{width: "80%"}}>
                <Text style={{ fontSize: 20, fontWeight:'bold', textAlign: 'left', marginBottom: 15 }}>Any changes recently?</Text>
                <View style={styles.editProfile}>
                  <Text>First Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="First name"
                    textContentType="givenName"
                    onChangeText={text => this.setState({ firstName: text })}
                    value={this.state.firstName} />
                </View>
                <View style={styles.editProfile}>
                  <Text>Last Name</Text>
                  <TextInput
                  style={styles.input}
                  placeholder="Last name"
                  textContentType="familyName"
                  onChangeText={text => this.setState({ lastName: text })}
                  value={this.state.lastName} />
                </View>
                <View style={styles.editProfile}>
                  <Text>Email Address</Text>
                  <TextInput
                  style={styles.input}
                  placeholder="Email"
                  textContentType="emailAddress"
                  onChangeText={text => this.setState({ email: text })}
                  value={this.state.email} />
                </View>
            </View>

            {/* UPDATE BUTTON */}
            <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.userBtn}
                      onPress={() => this.props.updateUserProfile(this.props.user.id, this.state.firstName, this.state.lastName, this.state.email)}>
                      <Text style={styles.btnText}>Update Info</Text>
                    </TouchableOpacity>
            </View>

          </View>


          {/* LOGOUT BUTTON BELOW */}
          <View style={styles.btnContainer}>
              <TouchableOpacity
                  style={styles.userBtn}
                  onPress={() => this.handleLogout()}>
                  <Text style={styles.btnText}>Logout</Text>
              </TouchableOpacity>
          </View>


              {/* see calendar */}
              <View style={styles.btnContainer}>
              <TouchableOpacity
                  style={styles.userBtn}
                  onPress={() => this.props.navigation.navigate('JourneyCalendar')}>
                  <Text style={styles.btnText}>Calendar</Text>
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
  updateUserProfile: (id, firstName, lastName, email) => dispatch(updateUserProfile(id, firstName, lastName, email)),
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
    backgroundColor: "#BFD7ED",
  },
  header: {
    textAlign: "left",
    fontSize: 35,
    marginBottom: 5,
    marginTop: 30,
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
    marginBottom: 25,
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
    borderBottomColor: "#BFD7ED", 
    borderBottomWidth: 2, 
    color: "grey",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userBtn: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#dadada",
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
  },
  redirect: {
    marginTop: 10,
    fontSize: 16
  },
});



{/* <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              /> */}