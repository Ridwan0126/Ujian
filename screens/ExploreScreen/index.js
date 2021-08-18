import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import {
  Alert,
  // Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {ListItem, Button} from 'react-native-elements';
// import {Checkbox} from 'react-native-paper';
import IconStatus from '../../assets/image/button.png';

const Item = ({name, time, email, onPress, onDelete, image}) => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.desc}>
        <Text style={styles.descname}>{name}</Text>
        <Text style={styles.desctime}>{time}</Text>
        {/* <Text style={styles.descemail}>{email}</Text> */}
        {/* <View> */}
        {/* </View> */}
        {/* <TouchableOpacity onPress={onPress}>
            <Text>Edit</Text> */}
        {/* <Image
          style={styles.avatar}
          // source={{
          //   uri: 'https://scontent-cgk1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/72480005_524343174784290_8100841044144773174_n.jpg?_nc_ht=scontent-cgk1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=01DUJRJX62UAX9lpRP5&edm=AP_V10EBAAAA&ccb=7-4&oh=5958936f481a55f09561619ea921fc34&oe=611A04B8&_nc_sid=4f375e',
          // }}
          source={image}
        /> */}
        {/* </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.delete}>X</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      {/* <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const LocalAPI = () => {
  const [name, setname] = useState('');
  const [time, settime] = useState('');
  const [email, setemail] = useState('');
  const [contact, setcontact] = useState([]);
  const [button, setButton] = useState('ADD');
  const [selectedContact, setselectedContact] = useState({});
  const [refresh] = useState(false);
  const [isSelected, setSelection] = useState(false);

  useEffect(() => {
    getData();
    // refresh(true);
  }, []);

  const submit = () => {
    const data = {
      name,
      time,
      email,
    };
    if (name == 0 || time == 0 || email == 0) {
      Alert.alert(
        'Wrong Input!!',
        'Data Yang Anda Masukkan Salah, Atau Kosong',
        [{text: 'Oke Bos'}],
      );
      return;
    }
    if (button === 'ADD') {
      console.log('Data ===>', data);
      axios.post('http://192.168.43.33:3000/contact/', data).then(res => {
        console.log('res ==>', res);
        setname('');
        settime('');
        setemail('');
        getData();
      });
    } else if (button === 'Edit') {
      axios
        .patch(`http://192.168.43.33:3000/contact/${selectedContact.id}`, data)
        .then(res => {
          console.log('res update', res);
          setname('');
          settime('');
          setemail('');
          getData();
          setButton('ADD');
        });
    } else if (button === 'Edit' && button === 'ADD') {
      refresh(true);
    }
  };

  const getData = () => {
    // axios.get(`http://192.168.43.33:3000/contact/`).then(res => {
    axios.get(`http://192.168.43.33:3000/status/`).then(res => {
      console.log('res ==>', res);
      setcontact(res.data);
    });
  };

  const selectItem = item => {
    console.log('selectItem', item);
    setselectedContact(item);
    setname(item.name);
    settime(item.time);
    setemail(item.email);
    setButton('Edit');
  };

  const deleteItem = item => {
    console.log('Delete', item);
    axios.delete(`http://192.168.43.33:3000/contact/${item.id}`).then(res => {
      console.log('Delete', res);
      getData();
    });
  };

  return (
    <ScrollView>
      <View style={styles.containe}>
        {/* <Text style={styles.testTitle}> Contact List </Text> */}
        {/* <Text>Masukkan Anggota</Text> */}
        {/* <TextInput
          style={styles.input}
          value={name}
          onChangeText={value => setname(value)}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={value => settime(value)}
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={value => setemail(value)}
          placeholder="E-mail"
        />
        <Button title={button} onPress={submit} />
        <View style={styles.line} /> */}
        {/* <View> */}
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.avatar}
            source={IconStatus}
            // source={image}
          />
          <View style={{marginLeft: 20, justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>My Status</Text>
            <Text>Add to my status</Text>
          </View>
        </View>
        <View style={styles.line} />
        {/* </View> */}
        {contact.map(user => {
          return (
            <View>
              {/* <Checkbox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              /> */}
              <ListItem
                leftContent={
                  <Button
                    onPress={() => selectItem(user)}
                    title="Edit"
                    icon={{name: 'info', color: 'white'}}
                    buttonStyle={{minHeight: '100%'}}
                  />
                }
                rightContent={
                  <Button
                    onPress={() =>
                      Alert.alert('Warning!', 'Are You Sure to DELETE User?', [
                        {text: 'No', onPress: () => console.log('BTN NO')},
                        {text: 'Yes', onPress: () => deleteItem(user)},
                      ])
                    }
                    title="Delete"
                    icon={{name: 'delete', color: 'white'}}
                    buttonStyle={{minHeight: '100%', backgroundColor: 'red'}}
                  />
                }
                bottomDivider={true}>
                <Avatar
                  titleStyle={{color: 'black'}}
                  size="medium"
                  // containerStyle={{backgroundColor: 'grey'}}
                  // title="A"
                  rounded
                  title={user.name[0]}
                  source={{uri: user.image}}
                />
                <Item
                  key={user.id}
                  image={user.image}
                  name={user.name}
                  time={user.time}
                  email={user.email}
                  onPress={() => selectItem(user)}
                  onDelete={() =>
                    Alert.alert('Warning!', 'Are You Sure to DELETE User?', [
                      {text: 'No', onPress: () => console.log('BTN NO')},
                      {text: 'Yes', onPress: () => deleteItem(user)},
                    ])
                  }
                />
              </ListItem>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default LocalAPI;

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
  },
  containe: {padding: 20},
  testTitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    color: 'blue',
  },
  line: {height: 2, backgroundColor: 'black', marginVertical: 20},
  input: {
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 25,
    paddingHorizontal: 18,
  },
  avatar: {marginLeft: 20, width: 50, height: 50, borderRadius: 50},
  itemContainer: {flexDirection: 'row', marginBottom: 20, flex: 1},
  desc: {marginLeft: 18, flex: 1},
  descname: {fontSize: 20, fontWeight: 'bold'},
  desctime: {fontSize: 16},
  descemail: {fontSize: 12, marginTop: 8},
  delete: {fontSize: 25, fontWeight: 'bold', color: 'red'},
});
