import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Slider
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import {addEntry} from '../redux/reducers/journey'
import { connect } from 'react-redux'

class JourneyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        date: "",
        imageUrl: "https://cdn.imgbin.com/14/2/14/imgbin-cartoon-girl-skin-care-mask-7TXRD4K1yKn7iYbCgwzQWuqng.jpg",
        stressLevel: 0,
        diet: "",
        description: ""
    }
    this.handleSubmission = this.handleSubmission.bind(this)
  }

  componentDidMount () {
    const entry = this.props.navigation.getParam("entry");
    console.log('COMPONENT DID MOUNT: ', entry)
    if(entry !== null){
      this.setState({
        date: entry.date,
        imageUrl: entry.imageUrl,
        stressLevel: entry.stressLevel,
        diet: entry.diet,
        description: entry.description
      })
    }
  }

  async handleSubmission () {
    await this.props.addEntry(this.props.userId, this.state)
    this.props.navigation.navigate('Journey');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>New Entry</Text>
        <TextInputMask
            style={styles.input}
            placeholder="MM/DD/YYYY"
            type={'datetime'}
            options={{
                format: 'MM/DD/YYYY'
            }}
            value={this.state.date}
            onChangeText={text => {
                this.setState({
                date: text
                })
            }}
        />
        <Slider 
            style={{width: 300}}
            maximumValue={5} 
            minimumValue={0} 
            value={this.state.stressLevel}
            step={1}
            onValueChange={value => this.setState({stressLevel: value})} 
        />
        <TextInput
            style={styles.input}
            placeholder="How's your diet?"
            onChangeText={text => this.setState({ diet: text })}
            value={this.state.diet}
        />
        <TextInput
            style={styles.input}
            placeholder="How are you and your skin doing?"
            onChangeText={text => this.setState({ description: text })}
            value={this.state.description}
        />
        <TouchableOpacity
            style={styles.userBtn}
            onPress={() => this.handleSubmission()}
        >
            <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapState = (state) => ({
  userId: state.users.user.id,
})

const mapDispatch = (dispatch) => ({
  addEntry: (id, entry) => dispatch(addEntry(id, entry))
})

export default connect(mapState, mapDispatch)(JourneyForm)

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
    width: "75%",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#dadada"
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
    textAlign: "center"
  }
})