import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { withNavigation } from "react-navigation";


class JourneyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        markedDates: {}
    };
    this.markNewDate = this.markNewDate.bind(this);
  }

  markNewDate(day) {
    let date = day.dateString
    this.setState({'markedDates': {[date]: {selected: true, marked: true, selectedColor: '#CCECDA'}} })
  }
  
  render() {
    return (
      <ImageBackground source={require('./images/grid.png')} style={styles.container}>
        <Text style={styles.text}>Your Journey</Text>
        <View style={styles.calendarContainer}>
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
              monthTextColor: 'white',
              todayTextColor: '#699add',
              dayTextColor: 'white',
              arrowColor: 'white',
              calendarBackground: '#A7CAEB',
              'stylesheet.calendar.header': {
                dayHeader: {
                  color: 'white'
                }
              }
            }}
          />
        </View>
        <TouchableOpacity 
          onPress={() => { this.props.navigation.navigate("JourneyEntries")}}> 
          <Text style={styles.btnText}>View or Add Entries</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

export default withNavigation(JourneyCalendar);
 
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: '100%',
    width: '100%'
  },
  text: {
    color: '#A7CAEB',
    margin: '15%',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 35,
    letterSpacing: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1
  },
  calendarContainer: {
    width: '80%',
    backgroundColor: '#A7CAEB',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  btnText: {
    margin: '4%',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 2,
    color: '#699add'
  },
});
