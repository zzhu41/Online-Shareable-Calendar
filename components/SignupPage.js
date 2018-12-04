import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Button, AsyncStorage } from 'react-native';
import { config, hashCode } from '../config';
import firebase from 'firebase';

/**
 * Login Page
 */
export default class SignupPage extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          name: '',
          DOB: '',
          location
        }
    }
    
    async onPressNavigate() {
        !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
        firebase.database().ref(`users/${this.state.username}`).set({
          name: this.state.name,
          password: hashCode(this.state.password),
          DOB: this.state.DOB,
          location: this.state.location,
          friendList: [],
          username: this.state.username,
          image: []
        }).then((() => {
          console.log('sign up success')
        })).catch((error) => {
          console.log(error);
        })
        firebase.database().ref(`users/${this.state.username}/image`).push({
            url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg'
        })
        this.props.navigation.navigate('Login');

    }
    /**
     * Render function
     * @return {ReactDOM}
     */
    render() {
        return (
            <View style = {styles.container}>
                <Text style = {styles.text}>
                    Sign Up
                </Text>
                <View style = {styles.formContainer}>
                    <View style={styles.container}>
                        <TextInput 
                            placeholder = 'full name'
                            placeholderTextColor = 'steelblue' 
                            style = {styles.input}
                            onChangeText={(text) => 
                            this.setState({
                                name:text
                            })
                            }
                        />
                        <TextInput 
                            placeholder = 'date of birth: mm/dd/yyyy'
                            placeholderTextColor = 'steelblue' 
                            style = {styles.input}
                            onChangeText={(text) => 
                            this.setState({
                                DOB:text
                            })
                            }
                        />
                        <TextInput 
                            placeholder = 'location'
                            placeholderTextColor = 'steelblue' 
                            style = {styles.input}
                            onChangeText={(text) => 
                                this.setState({
                                    location:text
                                })
                            }
                        />
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
                            onPress = {async () => this.onPressNavigate()}
                        >
                            <Text style = {styles.loginButton}>
                                Join Us
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    text: {
        fontSize: 20
    },
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
  });
  
