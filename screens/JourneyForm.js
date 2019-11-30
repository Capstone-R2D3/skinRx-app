import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Slider,
  Image,
  Platform
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import {addEntry, updateEntry} from '../redux/reducers/journey'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class JourneyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        date: "",
        image: null,
        stressLevel: 0,
        diet: "",
        description: ""
    }
    this.handleSubmission = this.handleSubmission.bind(this)
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result)

    if (!result.cancelled) {
      this.setState({ image: result });
    }
  };

  createFormData = (image, body) => {
    const data = new FormData();
  
    data.append('entryImage', {
      name: 'entry_image.jpg',
      type: 'image',
      uri:
        Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    return data;
  };

  componentDidMount () {
    this.getPermissionAsync();
    const entry = this.props.navigation.getParam("entry");
    if(entry !== null){
      this.setState({
        date: entry.date,
        image: {uri: entry.imageUrl},
        stressLevel: entry.stressLevel,
        diet: entry.diet,
        description: entry.description
      })
    }
  }

  async handleSubmission () {
    const entry = this.props.navigation.getParam("entry");
    const formData = this.createFormData(this.state.image, {
      date: this.state.date,
      stressLevel: this.state.stressLevel,
      diet: this.state.diet,
      description: this.state.description
    })
    if(entry === null){
      await this.props.addEntry(this.props.userId, formData)
      // await this.props.addEntry(this.props.userId, this.state)
      this.props.navigation.navigate('Journey');
    } else {
      await this.props.updateEntry(this.props.userId, entry.id, formData)
      this.props.navigation.navigate('Journey');
    }
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
            onPress={() => this._pickImage()}
        >
            <Text style={styles.btnText}>Pick an Image</Text>
        </TouchableOpacity>
        {this.state.image &&
          <Image source={{ uri: this.state.image.uri }} style={{ width: 200, height: 200 }} />}
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
  addEntry: (id, entry) => dispatch(addEntry(id, entry)),
  updateEntry: (id, entryId, entry) => dispatch(updateEntry(id, entryId, entry))
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