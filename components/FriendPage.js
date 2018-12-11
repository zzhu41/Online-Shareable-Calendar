import React from 'react';
import { StyleSheet, Text, View, ScrollView, AlertIOS, RefreshControl, AsyncStorage, Button} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Timeline from 'react-native-timeline-listview'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Container, Header, Body, Grid, Row, Col, Content, Separator, Left, Right} from 'native-base';
import { FloatingAction } from 'react-native-floating-action';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modalbox';
import { config, hashCode } from '../config';
import firebase from 'firebase';
import { Avatar, ListItem, List } from 'react-native-elements';
export default class FriendPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            friendList: []
        }
    }

    static navigationOptions = {
        header: null
    }

    _onRefresh = () => {
        this.setState({
            refreshing: true
        });
        this.setState({
            refreshing: false
        });
    }

    async componentWillMount(){
        const username = await AsyncStorage.getItem('username');
        !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
        firebase.database().ref(`users/${username}`).on('value', (data) => {
            this.setState({
                userInfo: data.toJSON()
            })
            //console.log(this.state.userInfo)
            if (this.state.userInfo.friendList) {
                console.log(this.state.userInfo.friendList)
                this.setState({
                    friendList: this.state.userInfo.friendList
                })
            } 
        })
    }

    render() {
        return (
            <Container>
                <Header>
                <Left>
                </Left>
                <Body>
                    <Text>
                        Friends
                    </Text>
                </Body>
                <Right>
                    <Button
                        title="+"
                        onPress = {
                            () => {
                                AlertIOS.prompt(
                                    'Enter Username',
                                    '',
                                    [
                                      {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                      },
                                      {
                                        text: 'Add Friend',
                                        onPress: async (username) => {
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
                                            const ownerusername = await AsyncStorage.getItem('username');
                                            this.setState({
                                                friend: username
                                            })
                                            !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
                                            // firebase.database().ref(`users/${ownerusername}/friendList`).push({
                                            //     username: username
                                            // })
                                            firebase.database().ref(`users/${username}/notifications/${ownerusername}-addfriend-${today.toString()}`).set({
                                                type: 'send you a friend request',
                                                username: ownerusername,
                                                read: false,
                                                id: `${ownerusername}-addfriend-${today.toString()}`
                                            })
                                        },
                                      },
                                    ],
                                  );
                            }
                        }
                    />
                </Right>
                </Header>
                <ScrollView 
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>    
                    <View>
                    {
                        Object.values(this.state.friendList).map((l, i) => (
                        <ListItem 
                            roundAvatar
                            avatar={{ uri: "https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg"  }}
                            key = {i}
                            title={`${l.username}`}
                            onPress = {()=>{this.props.navigation.push('FriendProfile', {username: l.username})}}
                            hideChevron
                        />
                        ))
                    }
                    </View>
                </ScrollView>
            </Container>
        );
    }
};
