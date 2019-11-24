import React from 'react';
import {connect} from 'react-redux';
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
import { addRating } from '../redux/reducers/productReviews';



class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //     stars: 0
    // }
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
                    default={0}
                    update={(val)=>{this.props.addRating(val)}}
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


// navigation 
SingleProduct.navigationOptions = {
  title: 'Single Product View',
};


// export info to redux store
mapDispatchToProps = dispatch => ({
  addRating: (rating) => dispatch(addRating(rating)),
})

export default connect(null, mapDispatchToProps)(SingleProduct)


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

