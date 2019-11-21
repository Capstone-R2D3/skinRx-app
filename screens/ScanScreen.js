import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

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

  handleBarCodeScanned = ({ type, data }) => {
    // set scanned state to true
    this.setState({ scanned: true });
    // send user alert with barcode type and data
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log();
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
