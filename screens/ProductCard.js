import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { withNavigation } from "react-navigation";
import {connect} from 'react-redux'

class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        imageUrl: this.props.state.imageUrl,
        name: this.props.state.name, 
        brand: this.props.state.brand,
        id: this.props.state.id,
        ingredients: this.props.state.ingredients,
        category: this.props.state.category
    }
  }

  // since props are being passed down from the parent, parent state updates will only update through this lifecycle hook!!!
  componentWillReceiveProps(nextProps) {
    this.setState({name: nextProps.state.name, imageUrl: nextProps.state.imageUrl, brand: nextProps.state.brand, id: nextProps.state.id, ingredients: nextProps.state.ingredients})
  }


  render() {
    return (
      <View style={styles.card}>
          <Image source={{uri: this.state.imageUrl}} style={styles.image} />

          <View style={{display: "flex", flexDirection: "row"}}>
            <View style={{width: "80%"}}>
              <Text style={styles.brand}>{this.state.brand}</Text>
              <Text style={styles.name}>{this.state.name}</Text>
            </View>

            <View>
              <TouchableOpacity 
                style={{width: 45, borderWidth: 1, borderColor: '#dadada', borderRadius:10, padding: 15}}
                onPress={() => { this.props.navigation.navigate("SingleProduct", {imageUrl: this.state.imageUrl, name: this.state.name, brand: this.state.brand, id: this.state.id, ingredients: this.state.ingredients, category: this.state.category, getNewProductRec: this.props.getNewProductRec});}}> 
                <Text style={{ fontWeight: "bold", fontSize: 18, color: "grey" }}>></Text>
              </TouchableOpacity>
            </View>
          </View>

        
        {/***** WILL NEED TO MOVE THIS CODE TO SINGLE PRODUCT VIEW! TESTING HERE FOR NOW *****/}
          <View>
            <TouchableOpacity 
              // style={styles.seeProduct}
              // onPress is taking in the stateId and the ratingId *** DUMMY DATA FOR RATING RIGHT NOW ***
              onPress={() => 
                this.props.getNewProductRec(this.state.id, 3)
              }
            > 
              <Text style={{ fontWeight: "bold", fontSize: 18, }}>New Recommendations</Text>
            </TouchableOpacity>
          </View>
        {/* MOVE EVERYTHING BT COMMENTS TO SINGLE PRODUCT VIEW */}
          

      </View>
    )
  }
}

const mapState = state => ({
  user: state.users.user,
})


export default withNavigation(connect(mapState, null)(ProductCard))


const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: 300, 
    height: 410,
    borderRadius: 10,
    padding: 10,
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "space-evenly", 
    alignItems: "center", 
    marginRight: 18,
  }, 
  image: {
    width: 225, 
    height: 275, 
    resizeMode: "cover", 
    marginBottom: 25
  },
  brand: {
    textTransform: "uppercase", 
    fontSize: 12
  }, 
  name: {
    fontWeight: "bold", 
    fontSize: 17
  }, 
  seeProduct: {
    width: 45, 
    borderWidth: 1, 
    borderColor: "#a7caeb", 
    borderRadius: 100, 
    backgroundColor: "#a7caeb",
    paddingTop: 7,
    paddingBottom: 10,
    paddingLeft: 15,
  }
})