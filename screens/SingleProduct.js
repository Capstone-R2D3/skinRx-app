import React from "react";
import { connect } from "react-redux";
import Stars from "react-native-stars";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View
} from "react-native";
import {
  addRating,
  getRating,
  editRating
} from "../redux/reducers/productReviews";
import { getToxicityScore } from "../redux/reducers/products";
import IngredientScoreBar from "../components/IngredientScoreBar";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.navigation.getParam("id"),
      imageUrl: this.props.navigation.getParam("imageUrl"),
      ingredients: this.props.navigation.getParam("ingredients"),
      brand: this.props.navigation.getParam("brand"),
      name: this.props.navigation.getParam("name"),
      userId: this.props.user.id
    };
  }

  componentDidMount() {
    this.props.getRating(this.state.productId, this.state.userId);
    this.props.getToxicityScore(this.state.productId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.brand}>{this.state.brand}</Text>
            <Text style={styles.name}>{this.state.name}</Text>
            <View style={styles.stars}>
              <Stars
                half={false}
                default={this.props.rating ? this.props.rating.rating : 0}
                update={val => {
                  if (!this.props.rating) {
                    this.props.addRating(
                      this.state.productId,
                      this.state.userId,
                      val
                    );
                  } else {
                    this.props.editRating(
                      this.state.productId,
                      this.state.userId,
                      val
                    );
                  }
                }}
                spacing={4}
                starSize={40}
                count={5}
                fullStar={require("./images/starFilled.png")}
                emptyStar={require("./images/starEmpty.png")}
              />
          </View>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{this.props.score}</Text>
          </View>
        </View>
        <ScrollView style={{zIndex: 5}}>
        <View style={styles.scrollContainer} >
            <Text style={styles.ingredients}>Ingredients</Text>
                <View style={styles.barContainer}>
                {this.state.ingredients.map((ingredient, index) => { 
                  if (ingredient === " : ") {
                    return null 
                  } else {
                    return <IngredientScoreBar style={styles.bar} key={index} ingredient={ingredient} /> 
                  }
                }
                )}    
              </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const mapState = state => ({
  user: state.users.user,
  score: state.products.score,
  rating: state.productReviews.rating
});

mapDispatchToProps = dispatch => ({
  addRating: (rating, productId, userId) =>
    dispatch(addRating(rating, productId, userId)),
  getToxicityScore: productId => dispatch(getToxicityScore(productId)),
  getRating: (productId, userId) => dispatch(getRating(productId, userId)),
  editRating: (productId, userId, rating) =>
    dispatch(editRating(productId, userId, rating))
});

export default connect(mapState, mapDispatchToProps)(SingleProduct);

// navigation
SingleProduct.navigationOptions = {
  title: "Single Product View"
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A7CAEB",
    height: "100%",
    margin: 0,
  },
  topContainer: {
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
    width: "100%",
    backgroundColor: "#A7CAEB",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: 'absolute',
  }, 
  scrollContainer: {
    width: "100%",
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 275,
    display: "flex",
    flexDirection: "column",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: '60%',
  },
  scoreContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 20,
    paddingRight: 10,
  },
  stars: {
    marginTop: 20,
    marginLeft: -30,
  },
  ingredients: {
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  ingredient: {
    marginLeft: 10
  },
  name: {
    fontSize: 22,
    color: 'white',
    marginTop: 10,
  },
  brand: {
    fontSize: 28,
    color: 'white'
  },
  score: {
    fontSize: 100,
    color: 'white',
    marginRight: 60,
    marginTop: -30,
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 300,
  },
  bar: {
    marginBottom: 20,
    textAlign: "center",
    marginLeft: 30,
  }
});
