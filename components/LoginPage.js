import React from 'react';
import MainPage from './MainPage'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Button, AsyncStorage, Alert} from 'react-native';
import { config, hashCode } from '../config';
import firebase from 'firebase';

/**
 * Login Page
 */
export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.loadAuth();
    this.state = {
      username: '',
      password: ''
    }
  }

  static navigationOptions = {
    header: null
  }

  loadAuth = async() => {
    // const token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(false ? 'Main' : 'Login')
  }

  /**
   * navigate to the main page
   */
  async onPressNavigate() {
    // verify usrename and password, password is hashed.
    let password = '';
    await firebase.database().ref(`users/${this.state.username}`).once('value', (data) => {
      password = data.toJSON().password;
    })
    if (hashCode(this.state.password) === password) {
      await AsyncStorage.setItem('username', this.state.username);
      this.props.navigation.navigate('Main')
    } else {
      Alert.alert(
        'Alert',
        'Incorrect username or password',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }
  /**
   * Render function
   * @return {ReactDOM}
   */
  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.formContainer}>
          <View style={styles.container}>
            <TextInput 
                placeholder = 'username'
                placeholderTextColor = 'steelblue'
                style = {styles.input}
                onChangeText={(text) => 
                  this.setState({
                    username: text
                  })
                }
            />
            <TextInput 
                secureTextEntry
                placeholder = 'password'
                placeholderTextColor = 'steelblue' 
                style = {styles.input}
                onChangeText={(text) => 
                  this.setState({
                    password:text
                  })
                }
            />
            <TouchableOpacity 
                style = {styles.loginButtonContainer} 
                onPress = {() => this.onPressNavigate()}
            >
                <Text style = {styles.loginButton}>
                    LOGIN
                </Text>
            </TouchableOpacity>
            <Button
              style = {styles.button} 
              title="Register"
              color="white"
              accessibilityLabel="this is the register button"
              onPress = {
                () => {
                  this.props.navigation.navigate('Signup');
                }
              }
            />
           </View>
        </View>
      </View>
    );
  }
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: width*0.85,
    height: 40,
    marginBottom: 20,
    backgroundColor: 'skyblue',
    fontSize: 20
  },
  loginButton: {
    textAlign: 'center'
  },
  loginButtonContainer: {
    width: width*0.85,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF'
  },
  button: {
    paddingTop: 20
  }
});
