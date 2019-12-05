import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { withNavigation } from "react-navigation";
import JourneyForm from './JourneyForm';
import JourneyEntries from './JourneyEntries';


class JourneyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        markedDates: {},
        selected: 'entries',
        screenWidth: Dimensions.get('window').width * 0.85
    };
    this.markNewDate = this.markNewDate.bind(this);
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

  markNewDate(day) {
    let date = day.dateString
    this.setState({'markedDates': {[date]: {selected: true, marked: true, selectedColor: 'white'}} })
  }
  
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
            <JourneyEntries/>
          </View>

          <View style={styles.card}>
            <JourneyForm entry={null}/>
          </View>

          <View style={styles.card}>
            <Calendar
              current={Date()}
              minDate={'2018-01-01'}
              maxDate={'2023-01-01'}
              onDayPress={(day) => this.markNewDate(day)}
              onDayLongPress={(day) => this.markNewDate(day)}
              monthFormat={'MMMM yyyy'}
              hideArrows={false}
              hideExtraDays={true}
              disableMonthChange={true}
              firstDay={1}
              hideDayNames={false}
              markedDates={this.state.markedDates}
              // Handler when press arrow icon are selected. Receives callback to go forward and back a month
              onPressArrowLeft={substractMonth => substractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              theme={{
                textDayFontFamily: 'Avenir',
                textMonthFontFamily: 'Avenir',
                textDayHeaderFontFamily: 'Avenir',
                monthTextColor: '#a8a8a8',
                todayTextColor: '#699add',
                dayTextColor: '#a8a8a8',
                arrowColor: '#a8a8a8',
                calendarBackground: 'white',
                'stylesheet.calendar.header': {
                  dayHeader: {
                    color: '#a8a8a8'
                  }
                }
              }}
            />
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
    resizeMode: 'center'
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
    width: 300, 
    height: 410,
    marginRight: 20,
    borderRadius: 15,
    padding: 10
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
