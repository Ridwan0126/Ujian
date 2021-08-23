import moment from 'moment';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFS from 'react-native-fs';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      //   console.log(data.base64);
      //   console.log('data:', data);
      const uri = data.uri.substr(7);
      //   console.log('uri', uri);

      this.copyToPic(uri);
    }
  };

  copyToPic = async uri => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message: 'Your app needs permission.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // const newName = moment().format('YYYYMMDD_HHmmss');
        const newName = moment().format('dddd_YYYYMMDD_HHmmssa');
        RNFS.copyFile(
          uri,
          RNFS.PicturesDirectoryPath + '/IMG_' + newName + '.jpg',
        )
          .then(res => {
            console.log('res:', res);
          })
          .catch(err => console.log('ERROR WOY:', err));
      } else {
        console.log('Camera permission denied');
        return false;
      }
    } catch (err) {
      console.log('ERROR ASKING:', err);
    }
  };

  listDir = () => {
    console.log(
      'RNFS.ExternalStorageDirectoryPath:',
      RNFS.ExternalStorageDirectoryPath,
    );
    console.log('RNFS.PicturesDirectoryPath:', RNFS.PicturesDirectoryPath);
    console.log('RNFS.CachesDirectoryPath:', RNFS.CachesDirectoryPath);
    // get a list of files and directories in the main bundle
    // RNFS.readDir(RNFS.ExternalStorageDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    //     .then((result) => {
    //         console.log('GOT RESULT', result);

    //         // stat the first file
    //         return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    //     })
    //     .then((statResult) => {
    //         if (statResult[0].isFile()) {
    //             // if we have a file, read it
    //             return RNFS.readFile(statResult[1], 'utf8');
    //         }

    //         return 'no file';
    //     })
    //     .then((contents) => {
    //         // log the file contents
    //         console.log(contents);
    //     })
    //     .catch((err) => {
    //         console.log(err.message, err.code);
    //     });
  };

  componentDidMount() {
    this.listDir();
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          //   onGoogleVisionBarcodesDetected={({ barcodes }) => {
          //     console.log(barcodes);
          //   }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
