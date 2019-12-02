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
import ProductCard from './ProductCard';
import {connect} from 'react-redux'
import {getRecommendations} from '../redux/reducers/recommendations'
import { ThemeConsumer } from 'react-native-elements';

class RecommendationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.user.id,
      skinTypeId: this.props.user.skinTypeId, 
      current: 'cleanser'
    }
  }

  async componentDidMount() {
    await this.props.getRecommendations(this.state.userId, this.state.skinTypeId)
  }

  render() {
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
          
          <Text style={styles.header}>An easy four step process curated just for you</Text> 
          
          {/* <Text></Text> */}
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: 25}}>
            <Text value={'cleanser'}>Cleanser</Text>
            <Text value={'toner'}>Toner</Text>
            <Text value={'serum'}>Serum</Text>
            <Text value={'moisturizer'}>Moisturizer</Text>
          </View>

          <ScrollView 
              style={styles.container} 
              contentContainerStyle={styles.contentContainer} 
              horizontal= {true}
              decelerationRate={0}
              snapToInterval={330} //element width
              snapToAlignment={"center"}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={10}
              pagingEnabled
              // onScroll={}
          >
            
          {/* Product no 1 - cleanser */}
          {/* <Text style={styles.text}>Cleanser</Text> */}
         { this.props.recommendations.recommendations.length > 0 ? <ProductCard state={this.props.recommendations.recommendations[0].cleanser[0]} /> : null }

          <Text></Text>
          
          {/* Product no 2 - toner */}
          {/* <Text style={styles.text}>Toner</Text> */}
          { this.props.recommendations.recommendations.length > 0 ? <ProductCard state={this.props.recommendations.recommendations[0].toner[0]}  /> : null }

          <Text></Text>

          {/* product no. 3 - moisturizer */}
          {/* <Text style={styles.text}>Moisturizer</Text> */}
          { this.props.recommendations.recommendations.length > 0 ? <ProductCard state={this.props.recommendations.recommendations[0].moisturizer[0]}  /> : null }

          <Text></Text>

          {/* product no. 4 - sunscreen */}
          {/* <Text style={styles.text}>Serum</Text> */}
          { this.props.recommendations.recommendations.length > 0 ? <ProductCard state={this.props.recommendations.recommendations[0].serum[0]}  /> : null }

          <Text></Text>

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
    backgroundColor: "#e1e9f0",
  },
  contentContainer: {
    paddingBottom: 75,
    paddingHorizontal: 7,
  }
})

const mapState = state => ({
  recommendations: state.recommendations,
  user: state.users.user,
})

const mapDispatch = dispatch => ({
  getRecommendations: (userId, skinTypeId) => dispatch(getRecommendations(userId, skinTypeId))
})

export default connect(mapState, mapDispatch)(RecommendationScreen)