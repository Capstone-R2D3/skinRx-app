import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEntries } from '../redux/reducers/journey'

class JourneyCard extends Component {
    componentDidMount() {
        const userId = this.props.user.id;
        this.props.getEntries(userId);
    }
    
    render() {
        return (
            <View>
                <Text>

                </Text>
            </View>
        )
    }
}

const mapState = state => ({
    user: state.users.user,
    entries: state.journey.entries,
    entry: state.journey.entry
})

const mapDispatch = dispatch => ({
    getEntries: (userId) => dispatch(getEntries(userId))
})

export default connect(mapState, mapDispatch)(JourneyCard);
