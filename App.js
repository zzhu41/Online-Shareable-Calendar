import React from 'react';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import TimeTable from './components/TimeTable';
import ProfilePage from './components/ProfilePage';
import SignupPage from './components/SignupPage';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, TabNavigator } from 'react-navigation';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import config from './config';
import SendPostPage from './components/SendPostPage';
import ExplorePage from './components/ExplorePage';
export default class App extends React.Component {

  componentWillMount() {
    
    // firebase.initializeApp(config);
    // console.log(firebase)
    // firebase.database().ref('users/001').set({
    //   name: 'jerry',
    //   age: 21
    // }).then((() => {
    //   console.log('success')
    // })).catch((error) => {
    //   console.log(error);
    // })
  }

  render() {
    return (
      <APP />
    );
  }
}

const Auth = createStackNavigator({
  Login: {
    screen: LoginPage
  },
  Main: {
    screen: MainPage
  },
  Signup: {
    screen: SignupPage
  },
  SendPost: {
    screen: SendPostPage
  },
  Explore: {
    screen: ExplorePage
  }
})

const APP = createSwitchNavigator({
  Auth: Auth,
  Main: {
    screen: MainPage
  },
  Explore: {
    screen: ExplorePage
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
