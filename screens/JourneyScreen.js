import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { withNavigation } from "react-navigation";
import JourneyForm from './JourneyForm';
import JourneyEntries from './JourneyEntries';
import JourneyCalendar from './JourneyCalendar';

const { height, width } = Dimensions.get('window');


class JourneyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected: 'entries',
        screenWidth: width * 0.8
    };
    this.scrollToA = this.scrollToA.bind(this)
    this.scrollToB = this.scrollToB.bind(this)
    this.scrollToC = this.scrollToC.bind(this)
  }

  scrollToA = () => {
    this.scroller.scrollTo({x: 0, y: 0});
    this.setState({selected: "entries"})
  };
  scrollToB = () => {
    scrollXPos = this.state.screenWidth * 1;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
    this.setState({selected: "form"})
  };
  scrollToC = () => {
    scrollXPos = this.state.screenWidth * 2;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
    this.setState({selected: "calendar"})
  };
  
  render() {
    return (
      <ImageBackground source={require('./images/background3.png')} style={styles.container}>
        <Text style={styles.text}>Track your skincare journey with daily entries</Text> 
              
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: 17, marginBottom: 17,}}>
          <TouchableOpacity onPress={this.scrollToA}>
            <Text style={ this.state.selected === 'entries' ? styles.clicked : styles.unselected }>Entries</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.scrollToB}>
            <Text style={ this.state.selected === 'form' ? styles.clicked : styles.unselected }>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.scrollToC}>
            <Text style={ this.state.selected === 'calendar' ? styles.clicked : styles.unselected }>Calendar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={{paddingLeft: "3.5%"}}
          contentContainerStyle={{paddingHorizontal: "6%"}}
          horizontal= {true}
          decelerationRate={0}
          snapToInterval={this.state.screenWidth * 1.05} //element width
          snapToAlignment={"center"}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1000}
          pagingEnabled
          ref={(scroller) => {this.scroller = scroller}}
          onScroll={(event) => {
            let nextx = event.nativeEvent.contentOffset.x;
            let lowerBound = this.state.screenWidth * 0.85;
            let upperBound = this.state.screenWidth * 1.15;
            if(nextx < lowerBound / 2) this.setState({selected: "entries"})
            else if(nextx > lowerBound && nextx < upperBound) this.setState({selected: "form"})
            else if(nextx > (lowerBound * 2) && nextx < (upperBound * 2)) this.setState({selected: "calendar"})
          }}
        >
          <View style={styles.card}>
            <JourneyEntries />
          </View>

          <View style={styles.card}>
            <JourneyForm entry={null}/>
          </View>

          <View style={styles.card}>
            <JourneyCalendar/>
          </View>

        </ScrollView>
      </ImageBackground>
    );
  }
}

export default withNavigation(JourneyScreen);
 
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'center',
  },
  text: {
    color: '#525252',
    marginTop: "11%",
    marginBottom: "7%",
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: "center"
  },
  btnText: {
    margin: '4%',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 2,
    color: '#699add'
  },
  card: {
    backgroundColor: "white",
    width: width * .70,
    height: height * .61,
    marginRight: 20,
    borderRadius: 15,
    padding: '2%'
  },
  clicked: {
    color: "#525252", 
    fontWeight: "bold",
  },
  unselected: {
    fontWeight: "bold",
    color: "#A7CAEB"
  }
});
