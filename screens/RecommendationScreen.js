import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import ProductCard from './ProductCard';
import {connect} from 'react-redux'
import { getRecommendations, getExistingUserRecs, getNewRecommendation } from '../redux/reducers/recommendations'
import { ThemeConsumer } from 'react-native-elements';


class RecommendationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.user.id,
      skinTypeId: this.props.user.skinTypeId, 
      selected: 'cleanser',    
      screenWidth: Dimensions.get('window').width - 55,
    }
    this.getNewProductRec = this.getNewProductRec.bind(this)
    this.scrollToA = this.scrollToA.bind(this)
    this.scrollToB = this.scrollToB.bind(this)
    this.scrollToC = this.scrollToC.bind(this)
    this.scrollToD = this.scrollToD.bind(this)
  }

  async componentDidMount() {
    // FOR EXISTING USERS!
    await this.props.getExistingUserRecs(this.state.userId)
    // *** FOR NEW USERS ***
    // await this.props.getRecommendations(this.state.userId, this.state.skinTypeId)
  }

  async getNewProductRec(productId, userRating) {
    // console.log('hitting product card & coming back!',productId, userRating)
    await this.props.getNewRecommendation(this.state.userId, this.state.selected, productId, this.state.skinTypeId, userRating)
    // console.log('lets see the state', this.props.recommendations)
    await this.props.getExistingUserRecs(this.state.userId)
  }

  // scrolling functionality
  scrollToA = () => {
    this.scroller.scrollTo({x: 0, y: 0});
    this.setState({selected: "cleanser"})
  };
  scrollToB = () => {
    scrollXPos = this.state.screenWidth * 1;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
    this.setState({selected: "toner"})
  };
  scrollToC = () => {
    scrollXPos = this.state.screenWidth * 2;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
    this.setState({selected: "serum"})
  };
  scrollToD = () => {
    scrollXPos = this.state.screenWidth * 3;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
    this.setState({selected: "moisturizer"})
  };
  

  render() {
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
          
          <Text style={styles.header}>An easy four step process curated just for you</Text> 
              
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: 17, marginBottom: 17,}}>
            <TouchableOpacity onPress={this.scrollToA}>
              <Text style={ this.state.selected === 'cleanser' ? styles.clicked : styles.unselected }>Cleanser</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.scrollToB}>
              <Text style={ this.state.selected === 'toner' ? styles.clicked : styles.unselected }>Toner</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.scrollToC}>
              <Text style={ this.state.selected === 'serum' ? styles.clicked : styles.unselected }>Serum</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.scrollToD}>
              <Text style={ this.state.selected === 'moisturizer' ? styles.clicked : styles.unselected }>Moisturizer</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
              style={styles.container} 
              contentContainerStyle={styles.contentContainer} 
              horizontal= {true}
              decelerationRate={0}
              snapToInterval={this.state.screenWidth} //element width
              snapToAlignment={"center"}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={1000}
              pagingEnabled
              ref={(scroller) => {this.scroller = scroller}}
              onScroll={(event) => {
                let nextx = event.nativeEvent.contentOffset.x;
                let lowerBound = this.state.screenWidth * 0.85;
                let upperBound = this.state.screenWidth * 1.15;
                if(nextx < lowerBound / 2) this.setState({selected: "cleanser"})
                else if(nextx > lowerBound && nextx < upperBound) this.setState({selected: "toner"})
                else if(nextx > (lowerBound * 2) && nextx < (upperBound * 2)) this.setState({selected: "serum"})
                else if(nextx > (lowerBound * 3) && nextx < (upperBound * 3)) this.setState({selected: "moisturizer"})
              }}
          >

          {/* Product no 1 - cleanser */}
          { this.props.recommendations.recommendations.length > 0 ? <ProductCard state={this.props.recommendations.recommendations[0].cleanser} getNewProductRec={this.getNewProductRec} /> : null }


          <Text></Text>
          
          {/* Product no 2 - toner */}
          { this.props.recommendations.recommendations.length > 0 ? <ProductCard state={this.props.recommendations.recommendations[0].toner}  getNewProductRec={this.getNewProductRec}/> : null }

          <Text></Text>

          {/* product no. 3 - moisturizer */}
          { this.props.recommendations.recommendations.length > 0 ? <ProductCard state={this.props.recommendations.recommendations[0].serum} getNewProductRec={this.getNewProductRec}/> : null }

          <Text></Text>

          {/* product no. 4 - sunscreen */}
          { this.props.recommendations.recommendations.length > 0 ? <ProductCard state={this.props.recommendations.recommendations[0].moisturizer}  getNewProductRec={this.getNewProductRec}/> : null }

          <Text></Text>

        </ScrollView>
      </View>
    )
  }
}

const mapState = state => ({
  recommendations: state.recommendations,
  user: state.users.user,
})

const mapDispatch = dispatch => ({
  getRecommendations: (userId, skinTypeId) => dispatch(getRecommendations(userId, skinTypeId)),
  getExistingUserRecs: (userId) => dispatch(getExistingUserRecs(userId)),
  getNewRecommendation: (userId, category, productId, skinTypeId, userRating) => dispatch(getNewRecommendation(userId, category, productId, skinTypeId, userRating))
})

export default connect(mapState, mapDispatch)(RecommendationScreen)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ebeff2",
    // backgroundColor: "#a7caeb"
  },
  contentContainer: {
    paddingHorizontal: 7,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "11%",
    marginBottom: "7%",
  }, 
  text: {
    fontSize: 20,
    fontWeight: "bold",
  }, 
  clicked: {
    color: "black", 
    fontWeight: "bold",
  },
  unselected: {
    fontWeight: "bold",
    color: "grey"
  }
})