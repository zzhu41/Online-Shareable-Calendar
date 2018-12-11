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
import Search from 'react-native-search-box';
import { Avatar, ListItem, List } from 'react-native-elements';
export default class NotificationTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            notificationList: [],
            recommendation: []
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
                //console.log(this.state.userInfo.notifications)
                this.setState({
                    notificationList: this.state.userInfo.notifications
                })
            } 
        })
        firebase.database().ref(`users`).once('value', (data) => {
            let nameList = [];
            let friendList = [];
            Object.values(data.toJSON()).map((l,i) => {
                nameList.push(l.name)
                let templist = [];
                for (const item in l.friendList) {
                    templist.push(l.friendList[item].username);
                }
                friendList.push(templist)
            })
            this.generateRecommendation(nameList,friendList, username);
        })
    }

    async generateRecommendation(nameList, friendList, username) {
        let index = 0;
        for (let i = 0; i < nameList.length; i++) {
            if (nameList[i] === username) P
            index = i;
        }
        let recommendationList = []
        console.log('start')
        for (let i = 0; i < friendList.length; i++ ) {
            console.log(i)
            if (i !== index) {
                let count = 0;
                for (let j = 0; j < friendList[i].length; j++) {
                    for (let k = 0; k < friendList[index].length; k++) {
                        if (friendList[index][k] === friendList[i][j]) {
                            count ++;
                        }
                    }
                }
                console.log(`count: ${count}`)
                recommendationList.push({
                    name: nameList[i],
                    mutualFriend: count
                })
            }
        }
        this.setState({
            recommendation: recommendationList
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
                        Notificaition
                    </Text>
                </Body>
                <Right>
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
                        Object.values(this.state.notificationList).filter((l) => l.read === false).map((l, i) => (
                        <ListItem 
                            key = {i}
                            title = {`${l.username} ${l.type}`}
                            subtitle={
                                <View style={{flex: 2, flexDirection: 'row'}}>
                                    <Button
                                        onPress={async () => {
                                            console.log('ACCPET')
                                            const username = await AsyncStorage.getItem('username');
                                            !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
                                            firebase.database().ref(`users/${username}/notifications/${l.id}`).update({
                                                read: true
                                            }) 
                                            if (l.type === 'send you a friend request') {
                                                firebase.database().ref(`users/${username}/friendList`).push({
                                                    username: l.username
                                                })
                                                firebase.database().ref(`users/${l.username}/friendList`).push({
                                                    username: username
                                                })
                                            } else {
                                                firebase.database().ref(`users/${username}/calendar/${l.date}/${Math.floor(Math.random() * 10000000)}`).set({
                                                    time: l.time,
                                                    event: l.event,
                                                    description: l.description
                                                }).then((() => {
                                                    console.log('Set time table successfully')
                                                })).catch((error) => {
                                                    console.log(error);
                                                })
                                            }
                                        }}
                                        title="Accept"
                                        color="steelblue"
                                        accessibilityLabel="accept request"
                                    />
                                    <Button
                                        onPress={() => {
                                            console.log('IGNORE')
                                        }}
                                        title="Ignore"
                                        color="steelblue"
                                        accessibilityLabel="reject request"
                                    />
                                </View>
                            }
                            roundAvatar
                            avatar={{ uri: "https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg"  }}
                        />
                        ))
                    }
                    </View>
                    <View>
                        <Text style={{paddingLeft: 20, fontSize:20}}> 
                            People you may know
                        </Text>
                        <View>
                        {
                            Object.values(this.state.recommendation).map((l, i) => (
                                <ListItem 
                                    key = {i}
                                    title = {l.name}
                                    subtitle={
                                        <View>
                                            <Text style={{paddingLeft: 10}}>
                                                {`${l.mutualFriend} mutual friends`}
                                            </Text>
                                            <View style={{flex: 2, flexDirection: 'row'}}>
                                                <Button
                                                    onPress={async () => {
                                                        console.log('Add Friend')
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
                                                    }}
                                                    title="Add Friend"
                                                    color="steelblue"
                                                    accessibilityLabel="accept request"
                                                />
                                                <Button
                                                    onPress={() => {
                                                        console.log('Remove')
                                                    }}
                                                    title="Remove"
                                                    color="steelblue"
                                                    accessibilityLabel="reject request"
                                                />
                                            </View>
                                        </View>
                                    }
                                    roundAvatar
                                    avatar={{ uri: "https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg"  }}
                                />
                                ))
                        }
                        </View>
                    
                    </View>
                </ScrollView>
            </Container>
        );
    }
};
