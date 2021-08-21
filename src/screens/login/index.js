import React, {Component} from 'react';
import * as Animatable from 'react-native-animatable';
import {
  Text,
  View,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {signIn} from '../../../actions/auth';
import {InputApp, ButtonApp, AuthHeader} from '../../components';
import {COLOR} from '../../constant/color';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      username: '',
      password: '',
      statusLogin: false,
      isFocusUsername: false,
      isFocusPassword: false,
      validUsername: true,
      validPassword: true,
      visible: false,
      foundUsername: false,
    };
  }

  setVisibleToggle = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  setFocus = name => {
    const nameFocus = `isFocus${name}`;
    this.setState({
      [nameFocus]: !this.state[nameFocus],
    });
  };

  setValue = (inputName, value) => {
    this.setState({
      [inputName]: value,
      validUsername: true,
      validPassword: true,
    });

    setTimeout(() => {
      if (this.ValidateEmail()) {
        if (this.authUsername()) {
          this.setState({
            foundUsername: true,
          });
        } else {
          this.setState({
            foundUsername: false,
          });
        }
      } else {
        if (this.state.foundUsername) {
          this.setState({
            foundUsername: false,
          });
        }
      }
    }, 200);
  };

  authUsername = () => {
    const {userList} = this.state;
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].username === this.state.username) {
        return true;
      }
    }
    return false;
  };

  ValidateEmail = () => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.username)
    ) {
      return true;
    }
    return false;
  };

  getUserApi = () => {
    const userList = this.props.userList;
    this.setState({
      userList,
    });
  };

  componentDidMount() {
    this.getUserApi();
  }

  authHandler = () => {
    const {userList} = this.state;
    for (let i = 0; i < userList.length; i++) {
      if (
        this.state.foundUsername &&
        userList[i].password === this.state.password
      ) {
        this.props.doLogin({
          name: userList[i].name,
          username: this.state.username,
          password: this.state.password,
          role: userList[i].role,
          image: userList[i].image,
        });
        return (
          //correct username&password
          Alert.alert('Alert Sign In', 'Sign In Success')
        );
      }
    }

    if (!this.state.foundUsername) {
      this.setState({
        validUsername: false,
      });
    }

    this.setState({
      validPassword: false,
    });
  };

  render() {
    const {navigation} = this.props;
    return (
      <ScrollView
        style={{
          marginTop: 50,
          backgroundColor: 'white',
          height: '100%',
          borderTopLeftRadius: 20,
        }}>
        <AuthHeader title="Sign In" subtitle="Please Sign In in Here......" />

        <Animatable.View animation="fadeInUpBig" duration={1300}>
          <InputApp
            state={this.state}
            label="Username"
            valid={this.state.validUsername}
            setFocus={this.setFocus}
            setValue={this.setValue}
            icon="envelope"
            found={this.state.foundUsername}
          />

          <InputApp
            state={this.state}
            label="Password"
            valid={this.state.validPassword}
            setFocus={this.setFocus}
            setValue={this.setValue}
            icon="lock"
            visible={this.state.visible}
            visibleToggle={this.setVisibleToggle}
          />

          <ButtonApp label="Sign in" handler={this.authHandler} />
        </Animatable.View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  userList: state.auth.userList,
});

const mapDispatchToProps = dispatch => ({
  doLogin: data => dispatch(signIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  connect: {
    marginTop: 15,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectText: {
    fontSize: 17,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetPass: {
    marginLeft: 50,
    marginTop: 5,
  },
  forgetPassText: {
    color: COLOR.main,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
