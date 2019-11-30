import React from 'react';
import {connect} from 'react-redux';
import Stars from 'react-native-stars';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View
} from 'react-native';
import { addRating, getRating, editRating } from '../redux/reducers/productReviews';
import {getToxicityScore } from '../redux/reducers/products'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        productId: this.props.navigation.getParam("id"),
        imageUrl: this.props.navigation.getParam("imageUrl"),
        ingredients: this.props.navigation.getParam("ingredients"),
        brand: this.props.navigation.getParam("brand"),
        name: this.props.navigation.getParam("name"),
        userId: this.props.user.id
    }
  }

  componentDidMount() {
    this.props.getRating(this.state.productId, this.state.userId)
    this.props.getToxicityScore(this.state.productId)
  }

  render() {
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <Text style={styles.name}>{this.state.name}</Text>
            <Text style={styles.brand}>{this.state.brand}</Text>

            <Image source={{uri: this.state.imageUrl}} style={{width: 300, height: 300, margin: 20}}></Image>

            <View style={{alignItems:'center', marginBottom: 20}}>
                <Stars
                    half={false}
                    default={this.props.rating ? this.props.rating.rating : 0 }
                    update={(val) => {
                      if (!this.props.rating) {
                        this.props.addRating(this.state.productId, this.state.userId, val) 
                        
                      } else {
                        this.props.editRating(this.state.productId, this.state.userId, val)
                      }
                      
                    }}
                    spacing={4}
                    starSize={40}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')} />
            </View>

            <Text stlye={styles.ingredients}>Toxicity Score</Text>
            <Text style={styles.score}>{this.props.score}</Text>
            
            <Text style={styles.ingredients}>Ingredients</Text>
               <FlatList
                data={this.state.ingredients.map(ingredient => { 
                  let name = ingredient.split(" : ")[0].toLowerCase()
                  return { key: name.slice(0, 1).toUpperCase() + name.slice(1)
                }
                })}
                renderItem={ ({item}) => <Text style={styles.ingredient}>{item.key}</Text> }
                />           

        </ScrollView>
        
      </View>
    )
  }
}

const mapState = state => ({
  user: state.users.user,
  score: state.products.score,
  rating: state.productReviews.rating,
})

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

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
  },
  contentContainer: {
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  ingredientsContainer: {
    width: '90%',
    height: 200,
    backgroundColor: '#dadada',
    marginBottom: 50,
    marginTop: 20,
  },
  ingredients: {
    fontSize: 20
  },
  ingredient: {
    marginLeft: 10,
  },
  name: {
    fontSize: 24
  },
  brand: {
    fontSize: 20
  },
  score: {
    fontSize: 30
  }
})