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
    fetch(
      `https://jsonplaceholder.typicode.com/comments?_limit=${limit}&_page=${page}`,
    )
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
