import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  Splash,
  Login,
  Register,
  OnBoard,
  CallsTab,
  ChatsTab,
  StatusTab,
  ChatView,
  ContactView,
} from '../screens';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {Component} from 'react';

import {Header} from '../components';
import {Chatt_User1, Chatt_User2} from '../constant/dataChatt';
import {Panggilan_User1, Panggilan_User2} from '../constant/dataTelfon';
import {Status_User1, Status_User2} from '../constant/dataStatus';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

class AuthStackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
      </AuthStack.Navigator>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Contacts: [],
      Chats: this.props.userLogin.role === 'user1' ? Chatt_User1 : Chatt_User2,
      Calls:
        this.props.userLogin.role === 'user1'
          ? Panggilan_User1
          : Panggilan_User2,
      Status:
        this.props.userLogin.role === 'user1' ? Status_User1 : Status_User2,
      ProfileStatus: {
        name: 'My Status',
        image: this.props.userLogin.image,
      },
    };
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 16,
              color: 'white',
            },
            tabBarStyle: {
              backgroundColor: '#black',
            },
            tabBarIndicatorStyle: {
              borderBottomColor: 'white',
              borderBottomWidth: 2.5,
            },
            tabBarPressColor: 'black',
          }}
          style={{backgroundColor: 'black'}}
          timingConfig={{duration: 200}}
          initialLayout={{width: Dimensions.get('window').width}}>
          <Tab.Screen
            tim
            name="Chats"
            children={props => (
              <ChatsTab {...props} ChatsData={this.state.Chats} />
            )}
          />
          <Tab.Screen
            name="Status"
            children={props => (
              <StatusTab
                {...props}
                StatusData={this.state.Status}
                ProfileData={this.state.ProfileStatus}
              />
            )}
          />
          <Tab.Screen
            name="Calls"
            children={props => (
              <CallsTab {...props} CallsData={this.state.Calls} />
            )}
          />
        </Tab.Navigator>
      </View>
    );
  }
}

class RootStackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Chats: 'user1' === 'user1' ? Chatt_User1 : Chatt_User2,
    };
  }

  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="OnBoard"
          screenOptions={{
            headerShown: false,
          }}>
          {!this.props.loginStatus ? (
            <>
              <RootStack.Screen name="OnBoard" component={OnBoard} />
              <RootStack.Screen name="Auth" component={AuthStackScreen} />
            </>
          ) : (
            <>
              <RootStack.Screen
                name="Home"
                children={props => (
                  <Home {...props} userLogin={this.props.userLogin} />
                )}
              />
              <RootStack.Screen name="ChatView" component={ChatView} />
              <RootStack.Screen
                name="ContactView"
                children={props => (
                  <ContactView {...props} ContactsData={this.state.Chats} />
                )}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  loginStatus: state.auth.loginStatus,
  userLogin: state.auth.userLogin,
});

export default connect(mapStateToProps)(RootStackScreen);
