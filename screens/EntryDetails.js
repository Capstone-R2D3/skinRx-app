import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux'
import {getOneEntry} from '../redux/reducers/journey'
import Carousel from 'react-native-snap-carousel';
import {Ionicons} from '@expo/vector-icons'

const { height, width } = Dimensions.get('window');

class EntryDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: "",
      images: [],
      stressLevel: null,
      diet: "",
      description: "",
      status: null
    }
    this.renderItem = this.renderItem.bind(this)
  }

  async componentDidMount() {
    const date = this.props.navigation.getParam("date")
    await this.props.getOneEntry(this.props.user.id, date)
    const entry = this.props.entry[0]
    this.setState({
      date: entry.date,
      images: entry.imageUrls,
      stressLevel: entry.stressLevel,
      diet: entry.diet,
      description: entry.description,
      status: entry.status,
      entry: entry.id
    })
  }

  renderItem = ({ item }) => {
    return (
        <Image source={{ uri: item }} style={styles.image} />
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Ionicons 
            name="ios-arrow-round-back" 
            color="#dadada"
            size={55} 
            style={styles.backBtn}
            onPress={() => this.props.navigation.navigate('JourneyScreen')} />
        <View style={{width: '100%'}}>
          <Text style={styles.header}>Date: {this.state.date}</Text>
        </View>
        {
          this.state.images.length > 0 ?
          <View style={{marginBottom: 15}}>
            <Carousel
              inactiveSlideOpacity={0.6}
              inactiveSlideScale={0.65}
              firstItem={0}
              sliderWidth={width}
              itemWidth={width*(7/10)}
              data={this.state.images}
              renderItem={this.renderItem}
              containerCustomStyle={{ overflow: 'visible' }}
              contentContainerCustomStyle={{ overflow: 'visible' }}
              layout={'stack'} 
              layoutCardOffset={9}
            />
          </View> : <Text>No Images Available</Text>
        }
      <Text style={styles.text}>Diet: {this.state.diet}</Text>
      <Text style={styles.text}>Description: {this.state.description}</Text>
      <Text style={styles.text}>Stress Level: </Text>
      <View style={styles.circle}>
        <Text style={styles.circleTxt}>{this.state.stressLevel}</Text>
      </View>
      <Text style={styles.text}>Status: {this.state.status}</Text>
      </ScrollView>
    )
  }
}

const mapState = state => ({
  user: state.users.user,
  entry: state.journey.entry
})

const mapDispatch = dispatch => ({
  getOneEntry: (userId, date) => dispatch(getOneEntry(userId, date)) 
})

export default connect(mapState, mapDispatch)(EntryDetails)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: "flex",
    flexDirection: "column",
    backgroundColor: 'white',
    padding: '7%',
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  header: {
    color: '#525252',
    marginTop: 15,
    marginBottom: 25,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: "center"
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10
  },
  text: {
    fontFamily: 'Avenir',
    color: '#a8a8a8',
    marginBottom: 10,
    fontSize: 16
  },
  backBtn: {
    marginTop: 15 
  },
  circle: {
    borderWidth: 5,
    borderColor: "#A7CAEB",
    borderRadius: 50,
    padding: 15,
    width: 50,
    margin: 25
  },
  circleTxt: {
    fontSize: 36,
    fontFamily: 'Avenir',
    color: '#A7CAEB',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
