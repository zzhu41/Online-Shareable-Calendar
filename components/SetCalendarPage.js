import React from 'react';
import { StyleSheet, Text, View, ScrollView, AlertIOS, TextInput, Dimensions, Button, DatePickerIOS, AsyncStorage} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Timeline from 'react-native-timeline-listview'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Container, Header, Body, Grid, Row, Col, Content, Separator, Left, Right} from 'native-base';
import { FloatingAction } from 'react-native-floating-action';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modalbox';
import { config, hashCode } from '../config';
import firebase from 'firebase';
export default class SetCalendarPage extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            date:'',
            time:'',
            event:'',
            description:'',
            chosenDate: new Date()
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Text>
                            Set Calendar
                        </Text>
                    </Body>
                    <Right>
                    <Button
                        title="Set"
                        onPress = {
                            async () => {
                                let username = '';
                                console.log('21312312321')
                                console.log(this.state.useruser)
                                if (this.props.navigation.state.params) {
                                    username = this.props.navigation.state.params.user;
                                } else {
                                    username = await AsyncStorage.getItem('username');
                                }
                                !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
                                if (this.props.navigation.state.params) {
                                    let today = new Date();
                                    let dd = today.getDate();
                                    let mm = today.getMonth()+1; 
                                    let yyyy = today.getFullYear();
                                    let time = today.getTime()
                                    if(dd<10) {
                                        dd = '0'+dd
                                    } 
                                    if(mm<10) {
                                        mm = '0'+mm
                                    } 
                                    today = mm + '-' + dd + '-' + yyyy + '-' + time;
                                    let ownerusername = await AsyncStorage.getItem('username');
                                    firebase.database().ref(`users/${username}/notifications/${ownerusername}-calendar-${today.toString()}`).set({
                                        type: 'want to add a event',
                                        username: ownerusername,
                                        read: false,
                                        id: `${ownerusername}-calendar-${today.toString()}`,
                                        time: this.state.time,
                                        event: this.state.event,
                                        description: this.state.description,
                                        date: this.state.date
                                    })
                                } else {
                                    firebase.database().ref(`users/${username}/calendar/${this.state.date}/${Math.floor(Math.random() * 10000000)}`).set({
                                        time: this.state.time,
                                        event: this.state.event,
                                        description: this.state.description
                                    }).then((() => {
                                        console.log('Set time table successfully')
                                    })).catch((error) => {
                                        console.log(error);
                                    })
                                }
                                if (this.props.navigation.state.params) {
                                    this.props.navigation.navigate('FriendProfile');
                                } else {
                                    this.props.navigation.navigate('Time');
                                }
                            }
                        }
                    />
                    </Right>
                </Header>
                <TextInput 
                    placeholder = 'Event'
                    placeholderTextColor = 'steelblue' 
                    style = {styles.input}
                    onChangeText={(text) => 
                        this.setState({
                            event:text
                        })
                    }
                />
                <View>
                    <DatePickerIOS
                    date={this.state.chosenDate}
                    onDateChange={(time) => {
                        console.log(time.toString())
                        this.setState({
                            date: time.toString().substring(3,15),
                            time: time.toString().substring(16,21),
                            chosenDate: time
                        })
                    }}
                    />
                </View>
                <TextInput 
                    placeholder = 'description'
                    placeholderTextColor = 'steelblue' 
                    style = {styles.input}
                    onChangeText={(text) =>  {
                        this.setState({
                            description:text
                        })
                        console.log(text)
                    }
                    }
                />
            </Container>
        );
    }
};

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

const { width } = Dimensions.get('window');
  