import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import {BARCODE_API_KEY} from '../secrets.json'

// ScanScreen is a stateful component
export default class ScanScreen extends React.Component {
  // it has two properties on its state
  // hasCameraPermissions and scanned
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

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
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    // set scanned state to true
    this.setState({ scanned: true });
    try {
      // get product information using the barcode and the barcode lookup api
      const res = await axios.get(`https://api.barcodelookup.com/v2/products?barcode=${data}&formatted=y&key=${BARCODE_API_KEY}`)
      const productInfo = res.data.products[0];
      // send user alert with product name
      alert(`${productInfo.product_name}`);
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
