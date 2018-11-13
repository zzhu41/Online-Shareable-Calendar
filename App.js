import React from 'react';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import TimeTable from './components/TimeTable';
import ProfilePage from './components/ProfilePage';
import SignupPage from './components/SignupPage';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, TabNavigator } from 'react-navigation';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

export default class App extends React.Component {

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
  }
})

const APP = createSwitchNavigator({
  Auth: Auth,
  Main: {
    screen: MainPage
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
