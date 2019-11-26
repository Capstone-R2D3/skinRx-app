import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Slider
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

export default class JourneyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        date: "",
        imageUrl: "",
        stressLevel: 0,
        diet: "",
        description: ""
    }
    this.handleSubmission = this.handleSubmission.bind(this)
  }

  handleSubmission () {
    console.log('SUBMITTED NEW JOURNAL ENTRY!\n', this.state)
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
            <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

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