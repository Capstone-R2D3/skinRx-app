import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View
} from 'react-native';
import {connect} from 'react-redux'

class IngredientScoreBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const ingredient = this.props.ingredient.split(" : ")
    const name = ingredient[0].toLowerCase()
    const score = ingredient[1]

    console.log(name, score)

    return (
      <View style={styles.container}>
        <View style={styles.bar}>
          <Text style={styles.name}>{name.slice(0, 1).toUpperCase() + name.slice(1)}</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{score.slice(1)}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(null)(IngredientScoreBar)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 5,
    zIndex: 0,
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
    width: 350,
    height: 30,
    justifyContent: "space-between",
  },
  scoreContainer: {
    width: 50,
  },
  name: {
    color: 'black',
    paddingLeft: 10,
    width: 300,
  },
  score: {
    fontWeight: 'bold',
    textAlign: 'center',
  }
})
