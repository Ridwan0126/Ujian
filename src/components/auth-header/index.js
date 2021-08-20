import React, {Component} from 'react';
import * as Animatable from 'react-native-animatable';
import {COLOR} from '../../constant/color';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';

class AuthHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {title, subtitle} = this.props;
    return (
      <ImageBackground
        source={{
          uri: 'https://ichef.bbci.co.uk/news/507/cpsprodpb/AA0E/production/_119543534_animedua.jpg',
        }}
        style={styles.backgroundImage}
        blurRadius={9}>
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
          {/* <ImageBackground
          style={styles.box}
          imageStyle={styles.image}
          source={require('../../images/location8-3.png')}>
          <View style={styles.dark}></View> */}
          {/* </ImageBackground> */}
          <Animatable.View
            animation="fadeInUpBig"
            duration={1500}
            style={styles.textContainer}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.text2}>{subtitle}</Text>
          </Animatable.View>
          <View style={styles.textContainer}></View>
          {/* </ImageBackground> */}
        </View>
      </ImageBackground>
    );
  }
}

export default AuthHeader;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    // height: 220,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 70,
    marginTop: 65,
  },
  text: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  text2: {
    color: '#ffffff',
    fontSize: 25,
  },
  box: {
    height: 550,
    position: 'absolute',
    top: -310,
    left: -70,
  },
  dark: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  image: {
    resizeMode: 'cover',
  },
  backDrop: {
    flex: 1,
    height: 100,
    position: 'absolute',
    flexDirection: 'column',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    backgroundColor: COLOR.main,
  },
  topContainer: {
    flex: 1.6,
    height: 250,
    flexDirection: 'column',
    // alignItems:'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 28.8,
    paddingBottom: 80,
  },
});
