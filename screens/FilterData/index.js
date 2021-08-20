import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  CeckBox,
  Dimensions,
} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
const WIDTH = Dimensions.get('window').width;
import IconStatus from '../../assets/image/plus.png';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // contact: [],
      contact: [],
      refresh: false,
      limit: 15,
      page: 1,
    };
  }

  getData = (page = 1) => {
    console.log('page:', page);
    this.setState({
      refresh: true,
    });
    const {limit} = this.state;
    fetch(`http://192.168.43.33:3000/chatt?_limit=${limit}&_page=${page}`)
      // fetch(
      //   `https://jsonplaceholder.typicode.com/comments?_limit=${limit}&_page=${page}`,
      // )
      // fetch(
      //   `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`,
      // )
      // fetch(`http://localhost:3000/contact`)
      .then(response => response.json())
      .then(contact => {
        let newData = [];
        if (page === 1) newData = contact;
        else newData = [...this.state.contact, ...contact];

        this.setState({
          contact: newData,
          page,
          refresh: false,
        });
      });
  };

  img = ({item}) => {
    return (
      <Image
        style={{width: 100, height: 100}}
        source={{uri: item.thumbnailUrl}}
      />
    );
  };

  renderData = ({item}) => {
    return (
      <ListItem
      // leftContent={
      //   <Button
      //     onPress={() => Alert.alert('Edit')}
      //     title="Edit"
      //     icon={{name: 'info', color: 'white'}}
      //     buttonStyle={{minHeight: '100%'}}
      //   />
      // }
      // rightContent={
      //   <Button
      //     onPress={() => Alert.alert('Delete')}
      //     title="Delete"
      //     icon={{name: 'delete', color: 'white'}}
      //     Style={{minHeight: '100%', backgroundColor: 'red'}}
      //   />
      // }
      // bottomDivider={true}
      >
        {/* <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.avatar}
            source={IconStatus}
            // source={image}
          />
          <View style={{marginLeft: 20, justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>My Status</Text>
            <Text>Add to my status</Text>
          </View>
          <Text
            style={{
              marginLeft: 110,
              justifyContent: 'center',
              fontSize: 40,
            }}>
            ...
          </Text>
        </View> */}
        <Avatar
          titleStyle={{color: 'black'}}
          size="medium"
          rounded
          title={item.name[0]}
          source={{uri: item.image}}
        />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.isiChatt}</ListItem.Subtitle>
        </ListItem.Content>
        <Text>{item.time}</Text>
        <TouchableOpacity
          onPress={() => Alert.alert('Tambah contact')}
          style={styles.buttonAdd}>
          <AntDesign name="plus" size={26} color="white" />
        </TouchableOpacity>
      </ListItem>
    );
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <ImageBackground
        source={{
          uri: 'https://ichef.bbci.co.uk/news/507/cpsprodpb/AA0E/production/_119543534_animedua.jpg',
        }}
        style={styles.backgroundImage}
        blurRadius={9}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
            <Image
              style={styles.avatar}
              source={IconStatus}
              // source={image}
            />
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>My Contact</Text>
              {/* <Text>Chatt</Text> */}
            </View>
          </View>
          <FlatList
            data={this.state.contact}
            keyExtractor={(item, idx) => idx}
            renderItem={this.renderData}
            onRefresh={() => this.getData(1)}
            refreshing={this.state.refresh}
            onEndReached={() => this.getData(this.state.page + 1)}
            onEndReachedThreshold={0.1}
          />
          {/* <TouchableOpacity
            onPress={() => Alert.alert('Tambah contact')}
            style={styles.buttonAdd}>
            <AntDesign name="plus" size={26} color="white" />
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    );
  }
}
const deleteItem = item => {
  console.log(item);
};
const MAIN_COLOR = '#00716F';
const styles = StyleSheet.create({
  avatar: {
    margin: 20,
    width: 25,
    height: 25,
    borderRadius: 25,
    marginLeft: 270,
    // marginRight: 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    borderWidth: 1,
    // borderColor: 'red',
    // backgroundColor: '#009387',
    flex: 1,
  },
  buttonAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -90,
    left: WIDTH * 0.75,

    height: 75,
    width: 75,
    borderRadius: 40,
    backgroundColor: MAIN_COLOR,
  },
});

export default Home;

// import React, {Component} from 'react';
// import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
// import {ListItem, Input, Button} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       users: [],
//       refresh: false,
//       limit: 15,
//       page: 1,
//       name: '',
//       email: '',
//       index: '',
//     };
//   }

//   getData = (page = 1) => {
//     console.log('page:', page);
//     this.setState({
//       refresh: true,
//     });
//     const {limit} = this.state;

//     fetch(`http://192.168.43.33:3000/users?_limit=${limit}&_page=${page}`)
//       .then(response => response.json())
//       .then(users => {
//         let newData = [];
//         if (page === 1)
//           newData = this.state.users.length > 0 ? this.state.users : users;
//         else newData = [...this.state.users, ...users];

//         this.setState({
//           users: newData,
//           page,
//           refresh: false,
//         });
//       });
//   };

//   onPressListener = (item, index) => {
//     // const { navigation } = this.props

//     // navigation.navigate("About", item)

//     this.setState({
//       name: item.name,
//       email: item.email,
//       index,
//     });
//   };

//   onButtonSavePressed = () => {
//     const {name, email, index} = this.state;
//     if (index === '')
//       return this.setState(prevState => ({
//         users: [...prevState.users, {name, email}],
//         name: '',
//         email: '',
//         index: '',
//       }));

//     return this.setState(prevState => {
//       const newUsers = prevState.users;
//       newUsers.splice(index, 1, {name, email});
//       return {
//         users: newUsers,
//         name: '',
//         email: '',
//         index: '',
//       };
//     });
//   };

//   onButtonResetPressed = () => [
//     this.setState({
//       name: '',
//       email: '',
//       index: '',
//     }),
//   ];

//   renderData = ({item, index}) => {
//     return (
//       <ListItem
//         bottomDivider={true}
//         onPress={() => this.onPressListener(item, index)}>
//         <ListItem.Content>
//           <ListItem.Title>{item.name}</ListItem.Title>
//           <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
//         </ListItem.Content>
//       </ListItem>
//     );
//   };

//   componentDidMount() {
//     this.getData();
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View>
//           <Input
//             placeholder="Name"
//             inputContainerStyle={{
//               borderBottomWidth: 0,
//             }}
//             value={this.state.name}
//             onChangeText={value => this.setState({name: value})}
//             leftIcon={<Icon name="user" size={24} color="black" />}
//           />
//           <Input
//             placeholder="Email"
//             inputContainerStyle={{
//               borderBottomWidth: 0,
//             }}
//             value={this.state.email}
//             onChangeText={value => this.setState({email: value})}
//             leftIcon={<Icon name="user" size={24} color="black" />}
//           />
//         </View>
//         <Button
//           title="Save"
//           type="outline"
//           onPress={this.onButtonSavePressed}
//         />
//         <Button
//           title="Reset"
//           type="outline"
//           onPress={this.onButtonResetPressed}
//         />
//         <FlatList
//           data={this.state.users}
//           keyExtractor={(item, idx) => idx}
//           renderItem={this.renderData}
//           onRefresh={() => this.getData(1)}
//           refreshing={this.state.refresh}
//           onEndReached={() => this.getData(this.state.page + 1)}
//           onEndReachedThreshold={0.5}
//         />
//         <TouchableOpacity
//           onPress={() => Alert.alert('Tambah contact')}
//           style={styles.buttonAdd}>
//           <AntDesign name="plus" size={26} color="white" />
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     borderWidth: 1,
//     borderColor: 'red',
//     flex: 1,
//   },
//   buttonAdd: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     top: -90,
//     left: 0.75,
//     height: 75,
//     width: 75,
//     borderRadius: 40,
//     // backgroundColor: MAIN_COLOR,
//   },
// });

// export default Home;
