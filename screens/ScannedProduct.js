import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import {connect} from 'react-redux'

class  ScannedProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const productName = this.props.navigation.getParam("productName")
    const productBrand = this.props.navigation.getParam("productBrand")
    const productDescription = this.props.navigation.getParam("productDescription")
    const productImage = this.props.navigation.getParam("productImage")
    const productUrl = this.props.navigation.getParam("productUrl")
    const productPrice = this.props.navigation.getParam("productPrice")

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.name}>{productName}</Text>
          <Text style={styles.brand}>{productBrand}</Text>
          <Text style={styles.price}>${productPrice}</Text>
          <Text style={styles.description}>{productDescription}</Text>
          {
            productImage ? <Image style={styles.image} source={{uri: productImage}} />
            : null
          }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    margin: 20,
    width: '90%'
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginRight: 20, 
    marginLeft: 10,
  },
  name: {
    fontSize: 22,
    marginBottom: 10,
  },
  brand: {
    fontSize: 20,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'cover',
    marginBottom: 10,
  }
})


export default connect(null)(ScannedProduct)