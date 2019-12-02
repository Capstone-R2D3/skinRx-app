import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { connect } from "react-redux";

class ScannedProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    }
  }

  render() {
    const productName = this.props.navigation.getParam("productName");
    const productBrand = this.props.navigation.getParam("productBrand");
    const productDescription = this.props.navigation.getParam(
      "productDescription"
    );
    const productImage = this.props.navigation.getParam("productImage");
    const productUrl = this.props.navigation.getParam("productUrl");
    const productPrice = this.props.navigation.getParam("productPrice");

    return (
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.brand}>{productBrand}</Text>
              <Text style={styles.name}>{productName}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.score}>1</Text>
          </View>
          </View>

          {/* <Text style={styles.price}>${productPrice}</Text>
          <Text style={styles.description}>{productDescription}</Text> */}

        <ScrollView style={{zIndex: 5}}>
        <View style={styles.scrollContainer} >
            <Text style={styles.ingredients}>Description</Text>
                <View style={styles.barContainer}>
                  <Text style={{ margin: 10 }}>{productDescription}</Text>
                {/* {this.state.ingredients.map((ingredient, index) => { 
                  if (ingredient === " : ") {
                    return null 
                  } else {
                    return <IngredientScoreBar style={styles.bar} key={index} ingredient={ingredient} /> 
                  }
                }
                )}     */}
              </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A7CAEB",
    height: "100%",
    margin: 0,
  },
  topContainer: {
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
    width: "100%",
    backgroundColor: "#A7CAEB",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: 'absolute',
  }, 
  scrollContainer: {
    width: "100%",
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 275,
    display: "flex",
    flexDirection: "column",
    zIndex: 5,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: '60%',
  },
  scoreContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 20,
    paddingRight: 10,
  },
  imgContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  productContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginRight: 20,
    marginLeft: 10
  },
  name: {
    fontSize: 22,
    color: 'white',
    marginTop: 10,
  },
  brand: {
    fontSize: 28,
    color: 'white'
  },
  score: {
    fontSize: 100,
    color: 'white',
    marginRight: 60,
    marginTop: -30,
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 900,
  },
  bar: {
    marginBottom: 20,
    textAlign: "center",
    marginLeft: 30,
  },
  ingredients: {
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default connect(null)(ScannedProduct);
