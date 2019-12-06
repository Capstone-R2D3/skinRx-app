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
                <View style={styles.entry}>
                    <Text style={{fontFamily: 'Avenir', color: 'white', fontWeight: 'bold'} }>
                        {this.props.entry.date}
                    </Text>
                    <Text style={styles.text}>
                        Stress Level: {this.props.entry.stressLevel}
                    </Text>
                    <Text style={styles.text}>
                        Diet: {this.props.entry.diet}
                    </Text>
                    <Text style={styles.text}>
                        Description: {this.props.entry.description}
                    </Text>
                    <TouchableOpacity
                        style={styles.userBtn}
                        onPress={() => this.props.navigation.navigate('EntryDetails', {
                          date: this.props.entry.date,
                        })}
                    >
                        <Text style={{fontFamily: 'Avenir', color: 'white', fontWeight: 'bold'}}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.userBtn}
                        onPress={() => this.props.delete(entryId)}
                    >
                        <Text style={{fontFamily: 'Avenir', color: 'white', fontWeight: 'bold'}}>Delete</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={styles.userBtn}
                        onPress={() => this.props.update(this.props.entry)}
                    >
                        <Text style={styles.text}>Update</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }
}

export default withNavigation(JourneyCard);

const styles = StyleSheet.create({
    entryContainer: {
        flex: 1
    },
    entry: {
        width: '85%',
        backgroundColor: '#BFD7ED',
        borderRadius: 3,
        marginLeft: '7%',
        marginRight: '7%',
        marginBottom: '3.5%',
        marginTop: '3.5%',
        shadowColor: '#699add',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        padding: '7%',
    },
    text: {
        color: 'white',
        fontFamily: 'Avenir'
    }
});
