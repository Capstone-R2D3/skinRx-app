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
import Stars from 'react-native-stars';
import Button from 'apsl-react-native-button';
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
    }
  }

  render() {
    return (
      <View>
          <Text>{this.state.name}</Text>
          <Image source={{uri: this.state.imageUrl}}
                 style={{width: 300, height: 300}} />

          <TouchableOpacity> 
                    <Button textStyle={{color: 'grey'}} style={{borderWidth: 1, borderColor: 'grey', borderRadius:10}} 
                        onPress={() => {
                          this.props.navigation.navigate("SingleProduct", {
                            imageUrl: this.state.imageUrl,
                            name: this.state.name, 
                            brand: this.state.brand,
                            id: this.state.id,
                            ingredients: this.state.ingredients,
                          });
                        }}
                        >View Product</Button>
          </TouchableOpacity>
      </View>
    )
  }
}

const mapState = state => ({
  user: state.users.user,
})


export default withNavigation(connect(mapState, null)(ProductCard))