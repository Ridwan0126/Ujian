// import axios from 'axios';
// import React, {Component, useEffect, useState} from 'react';
// import {Button, Image, StyleSheet, Text, View} from 'react-native';
// import {TextInput} from 'react-native-gesture-handler';
// // import {Value} from 'react-native-reanimated';

// const Item = ({name, email, bidang}) => {
//   return (
//     <View style={styles.itemContainer}>
//       <Image
//         style={styles.avatar}
//         source={{
//           uri: 'https://robohash.org/exercitationematcommodi.png',
//         }}
//       />
//       <View style={styles.desc}>
//         <Text style={styles.descname}>{name}</Text>
//         <Text style={styles.descEmail}>{email}</Text>
//         <Text style={styles.descBidang}>{bidang}</Text>
//       </View>
//       <Text style={styles.delete}>X</Text>
//     </View>
//   );
// };

// const LocalAPI = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [bidang, setBidang] = useState('');
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const submit = () => {
//     const data = {
//       name,
//       email,
//       bidang,
//     };
//     console.log('Data ===>', data);
//     axios.post('http://192.168.43.33:3004/users/', data).then(res => {
//       console.log('res ==>', res);
//       setName('');
//       setEmail('');
//       setBidang('');
//       getData();
//     });
//   };

//   const getData = () => {
//     axios.get('http://192.168.43.33:3004/users/').then(res => {
//       console.log('res ==>', res);
//       setUsers(res.data);
//     });
//   };

//   return (
//     <View style={styles.containe}>
//       <Text style={styles.testTitle}> textInComponent </Text>
//       <Text>Masukkan Anggota</Text>
//       <TextInput
//         style={styles.input}
//         value={name}
//         onChangeText={value => setName(value)}
//         placeholder="name"
//       />
//       <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={value => setEmail(value)}
//         placeholder="Email"
//       />
//       <TextInput
//         style={styles.input}
//         value={bidang}
//         onChangeText={value => setBidang(value)}
//         placeholder="Bidang"
//       />
//       <Button title="Simpan" onPress={submit} />
//       <View style={styles.line} />
//       {users.map(user => {
//         return (
//           <Item
//             key={user.id}
//             name={user.name}
//             email={user.email}
//             bidang={user.bidang}
//           />
//         );
//       })}
//     </View>
//   );
// };

// export default LocalAPI;

// const styles = StyleSheet.create({
//   containe: {padding: 20},
//   testTitle: {textAlign: 'center', marginTop: 20},
//   line: {height: 2, backgroundColor: 'black', marginVertical: 20},
//   input: {
//     borderWidth: 1,
//     marginBottom: 12,
//     borderRadius: 25,
//     paddingHorizontal: 18,
//   },
//   avatar: {width: 80, height: 80, borderRadius: 80},
//   itemContainer: {flexDirection: 'row', marginBottom: 20},
//   desc: {marginLeft: 18, flex: 1},
//   descname: {fontSize: 20, fontWeight: 'bold'},
//   descEmail: {fontSize: 16},
//   descBidang: {fontSize: 12, marginTop: 8},
//   delete: {fontSize: 25, fontWeight: 'bold', color: 'red'},
// });

import React, {Component} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {ListItem, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      refresh: false,
      limit: 15,
      page: 1,
      name: '',
      email: '',
      index: '',
    };
  }

  getData = (page = 1) => {
    console.log('page:', page);
    this.setState({
      refresh: true,
    });
    const {limit} = this.state;
    fetch(`http://192.168.43.33:3000/users?_limit=${limit}&_page=${page}`)
      .then(response => response.json())
      .then(users => {
        let newData = [];
        if (page === 1)
          newData = this.state.users.length > 0 ? this.state.users : users;
        else newData = [...this.state.users, ...users];

        this.setState({
          users: newData,
          page,
          refresh: false,
        });
      });
  };

  onPressListener = (item, index) => {
    // const { navigation } = this.props

    // navigation.navigate("About", item)

    this.setState({
      name: item.name,
      email: item.email,
      index,
    });
  };

  onButtonSavePressed = () => {
    const {name, email, index} = this.state;
    if (index === '')
      return this.setState(prevState => ({
        users: [...prevState.users, {name, email}],
        name: '',
        email: '',
        index: '',
      }));

    return this.setState(prevState => {
      const newUsers = prevState.users;
      newUsers.splice(index, 1, {name, email});
      return {
        users: newUsers,
        name: '',
        email: '',
        index: '',
      };
    });
  };

  onButtonResetPressed = () => [
    this.setState({
      name: '',
      email: '',
      index: '',
    }),
  ];

  renderData = ({item, index}) => {
    return (
      <ListItem
        bottomDivider={true}
        onPress={() => this.onPressListener(item, index)}>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Input
            placeholder="Name"
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            value={this.state.name}
            onChangeText={value => this.setState({name: value})}
            leftIcon={<Icon name="user" size={24} color="black" />}
          />
          <Input
            placeholder="Email"
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            value={this.state.email}
            onChangeText={value => this.setState({email: value})}
            leftIcon={<Icon name="user" size={24} color="black" />}
          />
        </View>
        <Button
          title="Save"
          type="outline"
          onPress={this.onButtonSavePressed}
        />
        <Button
          title="Reset"
          type="outline"
          onPress={this.onButtonResetPressed}
        />
        <FlatList
          data={this.state.users}
          keyExtractor={(item, idx) => idx}
          renderItem={this.renderData}
          onRefresh={() => this.getData(1)}
          refreshing={this.state.refresh}
          onEndReached={() => this.getData(this.state.page + 1)}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'red',
    flex: 1,
  },
});

export default Home;
