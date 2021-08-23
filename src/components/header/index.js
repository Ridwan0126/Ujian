import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../../actions/auth';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Modal} from 'react-native-paper';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      modalVisible: false,
    };
  }

  clickGandler = (visible, command) => {
    this.setState({modalVisible: visible});
    if (command === 'signOut') {
      this.props.doLogout();
    } else if (command === 'toProfile') {
      this.props.navigation.navigate('ProfileView');
    }
  };

  clicked = () => {
    this.setState({
      isClicked: !this.state.isClicked,
    });
  };

  renderLogout = () => {
    const {modalVisible} = this.state;

    if (this.state.isClicked)
      return (
        <View>
          <Modal
            isVisible={modalVisible}
            animationIn="slideInDown"
            animationOut="slideOutRight"
            backdropOpacity={0}
            onBackdropPress={() => this.clickHandler(!modalVisible)}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert('Warning!', 'Are You Sure to Log Out ?', [
                  {text: 'No', onPress: () => console.log('BTN NO')},
                  {text: 'Yes', onPress: () => this.props.doLogout()},
                ])
              }
              style={{
                height: 120,
                backgroundColor: 'white',
                position: 'absolute',
                top: 30,
                right: 5,
                paddingHorizontal: 15,
              }}>
              <Text>Log out</Text>
            </TouchableOpacity>
          </Modal>
        </View>
      );

    return null;
  };

  render() {
    return (
      <View style={styles.top}>
        <StatusBar translucent={false} backgroundColor="black" />
        <Text style={styles.logo}>WhatsApp KW Super</Text>
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => Alert.alert('Search Data', 'Coming Soon...')}>
            <Icon name="search" color="#fff" size={23} style={{padding: 5}} />
          </TouchableOpacity>
          {/* <View> */}
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Warning!', 'Are You Sure to Log Out ?', [
                {text: 'No', onPress: () => console.log('BTN NO')},
                {text: 'Yes', onPress: () => this.props.doLogout()},
              ])
            }>
            <Icon
              name="exit-to-app"
              color="#fff"
              size={23}
              style={{padding: 5}}
            />
          </TouchableOpacity>
          {this.renderLogout()}
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch(signOut()),
});

export default connect(null, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    backgroundColor: 'black',
    borderColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  logo: {
    fontSize: 23,
    color: '#fff',
    margin: 10,
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
