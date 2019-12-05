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
      items: {}
    }
  }

  componentDidMount() {
    const userId = this.props.user.id;
    this.props.getEntries(userId);
  }

  render() {
    return (
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
