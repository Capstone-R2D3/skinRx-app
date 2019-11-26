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
import Button from 'apsl-react-native-button';
import { withNavigation } from "react-navigation";



class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        imageUrl: this.props.state.imageUrl,
        name: this.props.state.name, 
        brand: this.props.state.brand,
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
                          });
                        }}
                        >View Product</Button>
          </TouchableOpacity>
      </View>
    )
  }
}


export default withNavigation(ProductCard);