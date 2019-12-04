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

class JourneyCard extends Component {
    render() {
        const entryId = this.props.entry.id;
        return (
            <View style={styles.row}>
                {/* <View style={styles.date}>
                    <Text style={{fontFamily: 'Avenir', color: '#A7CAEB'} }>
                        {this.props.entry.date}
                    </Text>
                </View>
                <Image source={require('./images/entry-icon.png')} style={styles.bullet}/> */}
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
            </View>
        )
    }
}

export default JourneyCard;

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    date:{
        width: '20%',
        padding: '5%'
    },
    bullet: {
        height: 14,
        width: 14,
        position: 'absolute',
        left: '18%',
        zIndex: 2
    },
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
