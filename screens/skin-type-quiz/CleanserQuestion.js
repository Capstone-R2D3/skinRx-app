import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class CleanserQuestion extends Component {
    constructor(props) {
        super(props);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    nextQuestion(typeId) {
        const score = this.props.score + typeId;
        console.log('SCORE SUM IN CLEANSER QUESTION: ', score)
        this.props.navigation.navigate('MoisturizerQuestion', {
            userId: this.props.userId,
            score: score
        });
    }

    render() {
        console.log('THIS.PROPS.SCORE IN CLEANSER QUESTION: ', this.props.score)
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    After cleansing, my skin
                </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.nextQuestion(2)}
                    >
                        <Text style={styles.btnText}>can feel tight and dehydrated, so I stay away from products that are drying.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.nextQuestion(5)}
                    >
                        <Text style={styles.btnText}>is clean and a bit dry but can get irritated depending on the product.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.nextQuestion(1)}
                    >
                        <Text style={styles.btnText}>feels clean and refreshed, but it eventually gets oily again.</Text>
                    </TouchableOpacity>
                </View>                
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.nextQuestion(4)}
                    >
                        <Text style={styles.btnText}>is oil-free around my nose but tight and dry around my cheeks.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => this.nextQuestion(3)}
                    >
                        <Text style={styles.btnText}>is clean and clear — not too parched, oily, or sensitive.</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.bodyText}>
                    Progress: 50%
                </Text>
            </View>
        )
    }
}

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
    bodyText: {
        fontSize: 12,
        textAlign: "center",
        margin: 15
    }
});
