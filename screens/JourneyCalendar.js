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
import { getEntries, deleteEntry } from '../redux/reducers/journey';
import { Calendar } from 'react-native-calendars';

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

  async componentDidMount() {
    const userId = this.props.user.id;
    await this.props.getEntries(userId);
    const numOfEntries = this.props.entries.length;
    const entryDates = {};
    for (let i=0; i<numOfEntries; i++){
        const entryDate = this.reformatDate(this.props.entries[i].date);
        const entryStatus = this.props.entries[i].status;
        let entryColor;
        if(entryStatus === 1){
            entryColor = 'red'
        } else if (entryStatus === 2){
            entryColor = 'yellow'
        } else {
            entryColor = 'green'
        }
        entryDates[entryDate] = {selected: true, selectedColor: entryColor}
    }
    console.log(entryDates)
    this.setState({markedDates: entryDates});
  }

//   markNewDate(day) {
//     let date = day.dateString
//     this.setState({'markedDates': {[date]: {selected: true, marked: true, selectedColor: 'white'}} })
//   }

  render() {
    return (
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
    )
  }
}

const mapState = state => ({
  user: state.users.user,
  entries: state.journey.entries
})

const mapDispatch = dispatch => ({
  getEntries: (userId) => dispatch(getEntries(userId)),
  deleteEntry: (userId, entryId) => dispatch(deleteEntry(userId, entryId))
})

export default connect(mapState, mapDispatch)(JourneyCalendar);
