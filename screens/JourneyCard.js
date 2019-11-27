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
        console.log('ENTRY ID: ', entryId)
        console.log('THIS.PROPS: ', this.props.delete)
        return (
            <View>
                <View>
                    <Text>
                        {this.props.entry.date}
                    </Text>
                </View>
                <View>
                    <Text>
                        Stress Level: {this.props.entry.stressLevel}
                    </Text>
                </View>
                <View>
                    <Text>
                        Diet: {this.props.entry.diet}
                    </Text>
                </View>
                <View>
                    <Text>
                        Description: {this.props.entry.description}
                    </Text>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.props.delete(entryId)}
                    >
                        <Text style={styles.btnText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default JourneyCard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"
    },
    header: {
      textAlign: "center",
      fontSize: 30,
      marginBottom: 20
    },
    btnContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    userBtn: {
      backgroundColor: "#dadada",
      padding: 15,
      width: "75%",
      display: "flex",
      borderRadius: 7,
      margin: 5
    },
    btnText: {
      fontSize: 18,
      textAlign: "center"
    },
    text: {
      fontSize: 20,
    }
  });
