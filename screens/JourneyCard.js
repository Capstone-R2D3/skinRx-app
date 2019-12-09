import React, { Component } from 'react';
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
import { withNavigation } from 'react-navigation'

class JourneyCard extends Component {
  constructor(props) {
    super(props)
  }
    render() {
        const entryId = this.props.entry.id;
        return (
            <View style={styles.entryContainer}>
                <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                            onPress={() => this.props.delete(entryId)}
                    >
                            <Text style={{fontFamily: 'Avenir', color: 'white', fontWeight: 'bold'}}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.entry}>
                    <Text style={{fontFamily: 'Avenir', color: 'white', fontWeight: 'bold'} }>
                        {this.props.entry.date}
                    </Text>
                    <Text style={styles.text} numberOfLines={1}>
                        Diet: {this.props.entry.diet}
                    </Text>
                    <Text style={styles.text} numberOfLines={2}>
                        Skincare Routine: {this.props.entry.description}
                    </Text>
                </View>
                <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '8%'}}>
                    <TouchableOpacity
                        style={styles.details}
                        onPress={() => this.props.navigation.navigate('EntryDetails', {
                          date: this.props.entry.date,
                        })}
                    >
                        <Text style={{fontFamily: 'Avenir', color: 'white'}}>Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default withNavigation(JourneyCard);

const styles = StyleSheet.create({
    entryContainer: {
        width: '98%',
        backgroundColor: '#BFD7ED',
        borderRadius: 3,
        marginBottom: 15,
        shadowColor: '#699add',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        padding: '5%'
    },
    entry: {
        margin: '3%'
    },
    text: {
        color: 'white',
        fontFamily: 'Avenir'
    },
    details: {
        marginTop: '5%',
        marginRight: '3%',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        paddingRight: '3%',
        paddingLeft: '3%'
    }
});
