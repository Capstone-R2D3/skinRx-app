import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { getEntries, deleteEntry, getOneEntry } from '../redux/reducers/journey';
import { Calendar } from 'react-native-calendars';
import { withNavigation } from 'react-navigation';

class JourneyCalendar extends React.Component {
  constructor() {
    super();
    this.state = {
        markedDates: {}
    }
    this.reformatDate = this.reformatDate.bind(this);
  }

  reformatDate (date) {
      const dateArray = date.split('/');
      const formattedDate = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`;
      return formattedDate;
  }

  componentDidMount() {
    const userId = this.props.user.id;
    this.props.getEntries(userId);
  }

//   markNewDate(day) {
//     let date = day.dateString
//     this.setState({'markedDates': {[date]: {selected: true, marked: true, selectedColor: 'white'}} })
//   }

  render() {
    const numOfEntries = this.props.entries.length;
    const entryDates = {};
    for (let i=0; i<numOfEntries; i++){
        const entryDate = this.reformatDate(this.props.entries[i].date);
        const entryStatus = this.props.entries[i].status;
        let entryColor;
        if(entryStatus === 1){
            entryColor = '#ff6961'
        } else if (entryStatus === 2){
            entryColor = '#fcef64'
        } else {
            entryColor = '#8be28b'
        }
        entryDates[entryDate] = {selected: true, selectedColor: entryColor}
    }
    return (
      <View style={styles.container}>
        <Calendar
            current={Date()}
            minDate={'2018-01-01'}
            maxDate={'2023-01-01'}
            monthFormat={'MMMM yyyy'}
            hideArrows={false}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            hideDayNames={false}
            markedDates={entryDates}
            // Handler when press arrow icon are selected. Receives callback to go forward and back a month
            onPressArrowLeft={substractMonth => substractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            // allows you to press 
            onDayPress={(day) => {
              const dateStr = day.dateString.split("-")
              let newDate = `${dateStr[1]}/${dateStr[2]}/${dateStr[0]}`
              this.props.navigation.navigate("EntryDetails", {
                date: newDate
              })
            }}
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
    )
  }
}

const mapState = state => ({
  user: state.users.user,
  entries: state.journey.entries
})

const mapDispatch = dispatch => ({
  getEntries: (userId) => dispatch(getEntries(userId)),
  deleteEntry: (userId, entryId) => dispatch(deleteEntry(userId, entryId)),
  getOneEntry: (userId, date) => dispatch(getOneEntry(userId, date))
})

export default withNavigation(connect(mapState, mapDispatch)(JourneyCalendar));

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
