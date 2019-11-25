import React from 'react';
import Stars from 'react-native-stars';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {getToxicityScore} from '../redux/reducers/products'
import { connect } from 'react-redux';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        stars: 0
    }
  }

  componentDidMount() {
    this.props.getToxicity(1)
    console.log('toxicity score', this.props.score)
  }

  render() {
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <Text style={styles.text}>{this.props.navigation.getParam("brand")}</Text>
            <Text style={styles.text}>{this.props.navigation.getParam("name")}</Text>

            <Image source={{uri: this.props.navigation.getParam("imageUrl")}} style={{width: 300, height: 300}}></Image>

            <Text>Product Description</Text>

            <View style={{alignItems:'center'}}>
                <Stars
                    half={false}
                    default={0}
                    update={(val)=>{this.setState({stars: val})}}
                    spacing={4}
                    starSize={40}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')} />
            </View>

        </ScrollView>
        
      </View>
    )
  }
}

const mapState = state => ({
  score: state.score
})

const mapDispatch = dispatch => ({
  getToxicity: (productId) => dispatch(getToxicityScore(productId))
})

SingleProduct.navigationOptions = {
  title: 'Single Product View',
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  }
})

export default connect(mapState, mapDispatch)(SingleProduct)