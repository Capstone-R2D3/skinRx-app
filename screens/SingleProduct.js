import React from 'react';
import {connect} from 'react-redux';
import Stars from 'react-native-stars';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { addRating, getRating, editRating } from '../redux/reducers/productReviews';
import {getToxicityScore} from '../redux/reducers/products'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        rating: 0,
        productId: this.props.navigation.getParam('id')
    }
  }

  componentDidMount() {
    this.props.getToxicityScore(this.state.productId)
    this.props.getRating(this.state.productId, this.props.user.id)
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
                    default={this.props.rating ? this.props.rating.rating : 0 }
                    update={async (val) => { 
                      console.log('val', val)
                      if (!this.props.rating) {
                        this.props.addRating(this.state.productId, this.props.user.id, val) 
                        
                      } else {
                        this.props.editRating(this.state.productId, this.props.user.id, val)
                      }
                      
                      
                    }}
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
  user: state.users.user,
  score: state.score,
  rating: state.productReviews.rating
})

// connect to redux store
mapDispatchToProps = dispatch => ({
  addRating: (rating, productId, userId) => dispatch(addRating(rating, productId, userId)),
  getToxicityScore: (productId) => dispatch(getToxicityScore(productId)),
  getRating: (productId, userId) => dispatch(getRating(productId, userId)),
  editRating: (productId, userId, rating) => dispatch(editRating(productId, userId, rating))
})

export default connect(mapState, mapDispatchToProps)(SingleProduct)


// navigation 
SingleProduct.navigationOptions = {
  title: 'Single Product View',
};


// css stylization 
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