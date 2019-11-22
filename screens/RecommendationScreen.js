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
import ProductCard from './ProductCard';


export default class RecommendationScreen extends React.Component {
  constructor() {
    super()
    // currently dummy data - will need to repopulate
    // should originally be set to null - leaving it here for now
    this.state = {
      products: [
        {
          brand: 'Drunk Elephant', 
          name: 'Beste No. 9 Jelly Cleanser',
          imageUrl: 'https://cdn.shopify.com/s/files/1/0209/8446/products/Beste_US_Standard_1024px_72dpi_DE_1024x1024.jpg?v=1568054219', 
        }, {
          brand: 'Brand Name', 
          name: 'Product Name Placeholder',
          imageUrl: 'https://cdn.shopify.com/s/files/1/0209/8446/products/B-HydraSerum-web_1024x1024_063bceac-b048-4448-b375-1c5716d586a1_1024x1024.jpg?v=1562691587', 
        }, {
          brand: 'Brand Name', 
          name: 'Product Name Placeholder',
          imageUrl: 'https://cdn.shopify.com/s/files/1/0209/8446/products/Marul-SIDE-WEB_1024x1024.jpg?v=1534291474', 
        }, {
          brand: 'Brand Name', 
          name: 'Product Name Placeholder',
          imageUrl: 'https://cdn.shopify.com/s/files/1/0209/8446/products/Beste_US_Standard_1024px_72dpi_DE_1024x1024.jpg?v=1568054219', 
        }, {
          brand: 'Brand Name', 
          name: 'Product Name Placeholder',
          imageUrl: 'https://cdn.shopify.com/s/files/1/0209/8446/products/Babyfacial_1080x1080_9bf32208-7f46-41cc-8b16-d2730f462940_1024x1024.jpg?v=1568054121', 
        }, 
      ]
    }
  }

  render() {
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
          
          <Text style={styles.header}>An easy four step process curated just for you</Text> 
          
          <Text></Text>
          
          {/* Product no 1 - cleanser */}
          <Text style={styles.text}>Cleanser</Text>
          <ProductCard state={this.state.products[0]} />

          <Text></Text>
          
          {/* Product no 2 - toner */}
          <Text style={styles.text}>Toner</Text>
          <ProductCard state={this.state.products[1]} />

          <Text></Text>

          {/* product no. 3 - moisturizer */}
          <Text style={styles.text}>Moisturizer</Text>
          <ProductCard state={this.state.products[2]} />

          <Text></Text>

          {/* product no. 4 - sunscreen */}
          <Text style={styles.text}>Sunscreen</Text>
          <ProductCard state={this.state.products[3]} />

          <Text></Text>

          {/* product no. 5 - face mask */}
          <Text style={styles.text}>Face mask</Text>
          <ProductCard state={this.state.products[4]} />

        </ScrollView>
      </View>
    )
  }
}

RecommendationScreen.navigationOptions = {
  title: 'Recommended Products',
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  }, 
  text: {
    fontSize: 20,
    fontWeight: "bold",
  }, 
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  contentContainer: {
    paddingBottom: 75,
    paddingHorizontal: 7,
  }
})

