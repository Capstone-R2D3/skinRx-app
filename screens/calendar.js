import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, Text, View } from 'react-native';
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
    this.setState({'markedDates': {[date]: {selected: true, marked: true, selectedColor: 'purple'}} })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Calendar
            current={Date()}
            minDate={'2019-01-01'}
            maxDate={Date()}
            onDayPress={(day) => this.markNewDate(day)}
            onDayLongPress={(day) => this.markNewDate(day)}
            monthFormat={'MMMM yyyy'}
            onMonthChange={(month) => {console.log('month changed', month)}}
            hideArrows={false}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            hideDayNames={false}
            markedDates={this.state.markedDates}
            theme={{textMonthFontWeight: 'bold'}}
            // Handler when press arrow icon are selected. Receives callback to go forward and back a month
            onPressArrowLeft={substractMonth => substractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            />
 
        <View>
          {/* THIS COULD BE WHERE SKIN JOURNEY INFO GOES!?!?!?!?!?!?! */}
        </View>
      </View>
    );
  }
}

export default withNavigation(JourneyCalendar);
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // marginTop: 100,
  },
});
