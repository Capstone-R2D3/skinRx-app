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
import {Ionicons} from '@expo/vector-icons';

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
    let statusWord;
    if (this.state.status === 1){
      statusWord = 'Bad'
    } else if (this.state.status === 2){
      statusWord = 'Fine'
    } else {
      statusWord = 'Great'
    }
    return (
      <View>
        <View style={styles.container1}>
          <Ionicons 
              name="ios-arrow-round-back" 
              color="#dadada"
              size={40} 
              style={styles.backBtn}
              onPress={() => this.props.navigation.navigate('JourneyScreen')} />
          <View style={{width: '100%'}}>
            <Text style={styles.header}>Date: {this.state.date}</Text>
          </View>
          {
            this.state.images.length > 0 ?
            <View style={styles.carouselContainer}>
              <Carousel
                inactiveSlideOpacity={0.6}
                inactiveSlideScale={0.65}
                firstItem={0}
                sliderWidth={width}
                itemWidth={width*(63/100)}
                data={this.state.images}
                renderItem={this.renderItem}
                containerCustomStyle={{ overflow: 'visible' }}
                contentContainerCustomStyle={{ overflow: 'visible' }}
                layout={'stack'} 
                layoutCardOffset={9}
              />
            </View> : null
          }
        </View>
        <View style={styles.container2}>
          <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 20}}>
            <Text style={styles.label}>Skin Status: </Text>
            <View style={styles.circle}>
            <Text style={styles.circleTxt}>{statusWord}</Text>
            </View>
            <Text style={styles.label}>Stress Level: </Text>
            <View style={styles.circle}>
              <Text style={styles.circleTxt}>{this.state.stressLevel}</Text>
            </View>
          </View>
          <Text style={styles.text}>Diet: {this.state.diet}</Text>
          <Text style={styles.text}>Skincare Routine: {this.state.description}</Text>
          {/* <Text style={styles.text}>Stress Level: </Text>
          <View style={styles.circle}>
            <Text style={styles.circleTxt}>{this.state.stressLevel}</Text>
          </View>
          <Text style={styles.text}>Status: {this.state.status}</Text> */}
        </View>
      </View>
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
  container1: {
    width: '100%',
    height: '60%',
    display: "flex",
    flexDirection: "column",
    backgroundColor: 'white',
    padding: '7%',
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  container2: {
    width: '100%',
    height: '40%',
    display: "flex",
    flexDirection: "column",
    backgroundColor: '#A7CAEB',
    padding: '7%',
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  header: {
    color: '#A7CAEB',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: "center"
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 10
  },
  text: {
    fontFamily: 'Avenir',
    color: 'white',
    marginBottom: 10,
    fontSize: 16
  },
  backBtn: {
    color: '#A7CAEB'
  },
  circle: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    padding: 10,
    marginRight: 35
  },
  circleTxt: {
    fontSize: 20,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 8
  },
  carouselContainer: {
    width: '100%', 
    paddingTop: 10,
    paddingBottom: 10
  },
  label: {
    textTransform: 'uppercase',
    width: '20%',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    color: 'white'
  }
});
