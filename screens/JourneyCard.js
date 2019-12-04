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
                <View style={styles.date}>
                    <Text>
                        {this.props.entry.date}
                    </Text>
                </View>
                <Image source={require('./images/entry-icon.png')} style={styles.bullet}/>
                <View style={styles.entryContainer}>
                    <View style={styles.entry}>
                        <Text>
                            Stress Level: {this.props.entry.stressLevel}
                        </Text>
                        <Text>
                            Diet: {this.props.entry.diet}
                        </Text>
                        <Text>
                            Description: {this.props.entry.description}
                        </Text>
                        <TouchableOpacity
                            style={styles.userBtn}
                            onPress={() => this.props.delete(entryId)}
                        >
                            <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.userBtn}
                            onPress={() => this.props.update(this.props.entry)}
                        >
                            <Text style={styles.btnText}>Update</Text>
                        </TouchableOpacity>
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
        justifyContent: "flex-start",
        alignItems: "center"
    },
    date:{
        width: '20%',
        padding: '4%'
    },
    bullet: {
        height: 14,
        width: 14,
        position: 'absolute',
        left: '18%'
    },
    entryContainer: {
        borderLeftWidth: 1,
        borderLeftColor: '#A7CAEB',
        flex: 1
    },
    entry: {
        width: '80%',
        backgroundColor: '#A7CAEB',
        borderRadius: 5,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    }
});
