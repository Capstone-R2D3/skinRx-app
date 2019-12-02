import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  TouchableOpacity,
  Slider,
  Image,
  Platform,
  ScrollView,
  Alert
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import {addEntry, updateEntry} from '../redux/reducers/journey'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

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
    await this.getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      this.setState({ image: result });
    }
  };

  createFormData = (image, body) => {
    const data = new FormData();
  
    data.append('entryImage', {
      name: `entry_image_${this.props.userId}.jpg`,
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
    if(this.state.image === null){
      Alert.alert('Please add an image to your entry');
    } else {
      const entry = this.props.navigation.getParam("entry");
      const formData = this.createFormData(this.state.image, {
        date: this.state.date,
        stressLevel: this.state.stressLevel,
        diet: this.state.diet,
        description: this.state.description
      })
      if(entry === null){
        await this.props.addEntry(this.props.userId, formData)
        this.props.navigation.navigate('Journey');
      } else {
        await this.props.updateEntry(this.props.userId, entry.id, formData)
        this.props.navigation.navigate('Journey');
      }
    }
  }

  render() {
    console.log('STATE OF THE JOURNEY FORM: ', this.state)
    return (
      <ScrollView style={styles.container}>
          <Text style={styles.header}>Entry</Text>
          {
            this.state.image ?
            <Image source={{ uri: this.state.image.uri }} style={styles.image} /> : null
          }
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
              style={{width: 300, alignSelf: 'center'}}
              maximumValue={5} 
              minimumValue={1} 
              value={this.state.stressLevel}
              step={1}
              onValueChange={value => this.setState({stressLevel: value})} 
              minimumTrackTintColor={'white'}
              maximumTrackTintColor={'#778899'}
          />
          <AutoGrowingTextInput
              style={styles.input}
              placeholder="How's your diet?"
              onChangeText={text => this.setState({ diet: text })}
              value={this.state.diet}
          />
          <AutoGrowingTextInput
              style={styles.input}
              placeholder="How are you and your skin doing?"
              onChangeText={text => this.setState({ description: text })}
              value={this.state.description}
          />
          <TouchableOpacity
              style={styles.AddImageBtn}
              onPress={() => this._pickImage()}
          >
              <Text style={styles.AddImageText}>Add Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.SaveBtn}
              onPress={() => this.handleSubmission()}
          >
              <Text style={styles.SaveText}>Save</Text>
          </TouchableOpacity>
      </ScrollView>
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
    display: "flex",
    flexDirection: "column",
    backgroundColor: '#BFD7ED'
  },
  header: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
    marginBottom: 30,
    marginTop: "10%",
    color: "white",
    letterSpacing: 3,
  },
  input: {
    width: "75%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 5,
    alignSelf: 'center'
  },
  AddImageBtn: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 25,
    backgroundColor: "transparent",
    padding: 15,
    width: '60%',
    display: 'flex',
    marginBottom: 10,
    alignSelf: 'center'
  },
  SaveBtn: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 25,
    backgroundColor: "white",
    padding: 15,
    width: '60%',
    display: 'flex',
    marginBottom: 10,
    alignSelf: 'center'
  },
  AddImageText: {
    fontSize: 15,
    textAlign: "center",
    textTransform: "uppercase", 
    letterSpacing: 2, 
    fontWeight: "bold",
    color: 'white'
  },
  SaveText: {
    fontSize: 15,
    textAlign: "center",
    textTransform: "uppercase", 
    letterSpacing: 2, 
    fontWeight: "bold",
    color: '#BFD7ED'
  },
  image: { 
    width: 200, 
    height: 200,
    marginBottom: 30,
    alignSelf: 'center'
  }
})