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

export default class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        stars: 0
    }
  }

  render() {
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <Text style={styles.text}>Drunk Elephant</Text>
            <Text style={styles.text}>Beste No. 9 Jelly Cleanser</Text>

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

