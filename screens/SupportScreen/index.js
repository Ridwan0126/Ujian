// import React from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';

// const SupportScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Support Screen</Text>
//       <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
//     </View>
//   );
// };

// export default SupportScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {Button} from 'react-native-elements';
// import icon from 'react-native-vector-icons/FontAwesome';
// import {ListItem, Avatar} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {Input} from 'react-native-elements';
// import Log from './Login';

const App = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://ichef.bbci.co.uk/news/507/cpsprodpb/AA0E/production/_119543534_animedua.jpg',
      }}
      style={styles.backgroundImage}
      blurRadius={9}>
      <View>
        {/* <Log /> */}
        <Head />
        <StylingComponent />
      </View>
    </ImageBackground>
  );
};

const Login = () => {
  return (
    <View>
      <Text>Hallo Wprld</Text>
      {/* <Log /> */}
    </View>
  );
};

const Head = () => {
  return (
    <View style={{backgroundColor: 'grey'}}>
      <Text style={styles.text}>React Native Day01</Text>
      <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 20}}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://scontent-cgk1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/72480005_524343174784290_8100841044144773174_n.jpg?_nc_ht=scontent-cgk1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=01DUJRJX62UAX9lpRP5&edm=AP_V10EBAAAA&ccb=7-4&oh=5958936f481a55f09561619ea921fc34&oe=611A04B8&_nc_sid=4f375e',
          }}
        />
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 16,
              marginLeft: 20,
            }}>
            G2 Academy
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: 16,
              marginLeft: 20,
            }}>
            Muhamad Nur Ridwan
          </Text>
        </View>
      </View>
    </View>
  );
};

const StylingComponent = () => {
  return (
    <ScrollView>
      <View>
        <View
          style={{
            padding: 12,
            backgroundColor: 'grey',
            width: 212,
            borderRadius: 8,
            marginTop: 20,
            marginLeft: 40,
          }}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 8,
            }}>
            MacBook Pro 2020
          </Text>
          <Image
            style={styles.mac}
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 21,
            }}>
            Jakarta Pusat
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: 5,
              marginBottom: 18,
              color: 'white',
            }}>
            Rp. 25.000.000,00
          </Text>
          <Button title="Buy" onPress={() => alert('Hallo Body........')} />
        </View>
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 20,
    marginTop: 20,
    borderWidth: 2,
  },
  mac: {
    width: 188,
    height: 107,
    borderRadius: 8,
    // marginLeft: 20,
    // marginTop: 20,
  },
});
