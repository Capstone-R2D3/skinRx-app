import * as React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import {BARCODE_API_KEY} from '../secrets.json'
import {connect} from 'react-redux'
import {getProduct} from '../redux/reducers/products'


// ScanScreen is a stateful component
class ScanScreen extends React.Component {
  // it has two properties on its state
  // hasCameraPermissions and scanned
  constructor(props) {
    super(props) 
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      ingredients: []
    }
  }

  // once the component is mounted, 
  // get camera permissions from the user
  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    // if the user grants camera permissions, 
    // set the hasCameraPermissions status to granted
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    // get the component's state
    const { hasCameraPermission, scanned } = this.state;

    // if camera permissions have not been set, 
    // return a text view requesting camera permissions
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    // if we don't have camera permissions
    // return a text view saying we don't have access
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    // otherwise, return a view with our barcode scanner
    return (
      // <View>
      // <Text onPress={() => this.props.navigation.navigate('ScannedProduct')}>Product view</Text>
      <View
        style={styles.barcodeView}>
        <BarCodeScanner
          // if something has been scanned, handle the scanned bar code
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        { // if user taps to scan again, set scanned state to false
        scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )
        }
      </View>
      // </View>

    );
  }

  handleBarCodeScanned = async ({ data }) => {
    this.setState({ scanned: true });
    try {
      // get product information using the barcode and the barcode lookup api
      const res = await axios.get(`https://api.barcodelookup.com/v2/products?barcode=${data}&formatted=y&key=${BARCODE_API_KEY}`)
      const productInfo = res.data.products[0];
      
      await this.props.getProduct(productInfo.product_name.split(' - ')[1])

      Alert.alert(
        'Product scanned',
        `${productInfo.product_name}`,
        [
          { text: 'Scan again', onPress: () => console.log('Scan again pressed') },
          { text: 'Product details', onPress: () => this.props.navigation.navigate('ScannedProduct', {
            productBrand: productInfo.brand,
            productDescription: productInfo.description,
            productImage: productInfo.images[0],
            productName: productInfo.product_name,
            productUrl: productInfo.stores[0].product_url,
            productPrice: productInfo.stores[0].store_price,
            ingredients: this.props.product.ingredients
          }) }
        ]
      )
    } catch (err) {
      console.error(err);
    }
    
  };
}

ScanScreen.navigationOptions = {
  title: 'Product Scanner',
};

const styles = StyleSheet.create({
  barcodeView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

const mapState = state => ({
  product: state.products.product,
})

const mapDispatch = dispatch => ({
  getProduct: (name) => dispatch(getProduct(name)),
})

export default connect(mapState, mapDispatch)(ScanScreen)