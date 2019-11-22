import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class RecommendationScreen extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
          
          <Text style={styles.header}>Some products we love</Text> 
          
          <Text></Text>

          <Text style={styles.text}>Cleanser</Text>
          <Image source={{uri: 'https://cdn.shopify.com/s/files/1/0209/8446/products/Beste_US_Standard_1024px_72dpi_DE_1024x1024.jpg?v=1568054219'}}
                 style={{width: 300, height: 300}} />

          <Text style={styles.text}>Toner</Text>
          <Image source={{uri: 'https://cdn.shopify.com/s/files/1/0209/8446/products/B-HydraSerum-web_1024x1024_063bceac-b048-4448-b375-1c5716d586a1_1024x1024.jpg?v=1562691587'}}
                 style={{width: 300, height: 300}} />

          <Text style={styles.text}>Moisturizer</Text>
          <Image source={{uri: 'https://cdn.shopify.com/s/files/1/0209/8446/products/Marul-SIDE-WEB_1024x1024.jpg?v=1534291474'}}
                 style={{width: 300, height: 300}} />

          <Text style={styles.text}>Sunscreen</Text>
          <Image source={{uri: 'https://cdn.shopify.com/s/files/1/0209/8446/products/BOTF_Babyfacial_Standard_1024x1024_72dpi_New-Badge_1024x1024.jpg?v=1570735398'}}
                 style={{width: 300, height: 300}} />

          <Text style={styles.text}>Face mask</Text>
          <Image source={{uri: 'https://cdn.shopify.com/s/files/1/0209/8446/products/Babyfacial_1080x1080_9bf32208-7f46-41cc-8b16-d2730f462940_1024x1024.jpg?v=1568054121'}}
                 style={{width: 300, height: 300}} />

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

