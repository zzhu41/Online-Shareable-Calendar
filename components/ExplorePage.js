import React from 'react';
import { StyleSheet, Text, View, ScrollView, AlertIOS, RefreshControl,  Alert, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Timeline from 'react-native-timeline-listview'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Container, Header, Body, Grid, Row, Col, Content, Separator, Left, Right} from 'native-base';
import { FloatingAction } from 'react-native-floating-action';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modalbox';
import { Avatar, ListItem, List } from 'react-native-elements';
import Button from 'react-native-button';
import { config, hashCode } from '../config';
import firebase from 'firebase';
export default class ExplorePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            postList: [],
            bubbleIcon: '',
            heartColor: null,
            username:''
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
        let bubble = require('../assets/heart.png');
        firebase.database().ref(`posts`).on('value', (data) => {
            console.log(data)
            this.setState({
                postList: Object.values(data.toJSON()),
                bubbleIcon : bubble,
                username: username
            })
        })
        //console.log(this.state.postList)
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Text>
                            POST
                        </Text>
                    </Body>
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
                        this.state.postList.map((l, i) => (
                        <ListItem 
                            key = {i}
                            title={`${l.postContext}`}
                            subtitle={
                                <View style={styles.iconBar}>
                                    <TouchableOpacity onPress = {() => {
                                        if (this.state.heartColor === null) {
                                            this.setState({heartColor: 'rgb(252,61,57)'})
                                        } else {
                                            this.setState({heartColor: null})
                                        }
                                        !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
                                        if (this.state.heartColor === 'rgb(252,61,57)') {
                                            firebase.database().ref(`posts/${l.username}-${l.date}`).update({
                                                likes: l.likes-1
                                            })
                                        } else {
                                            firebase.database().ref(`posts/${l.username}-${l.date}`).update({
                                                likes: l.likes+1
                                            })
                                        }
                                        }}>
                                        <Image source={require('../assets/heart.png')}
                                        style={{width: 30, height: 30, marginLeft: 15, tintColor: this.state.heartColor}}
                                    />
                                    </TouchableOpacity>
                                    <Text>
                                        {l.likes}
                                    </Text>
                                    <TouchableOpacity onPress = {() => {
                                        this.props.navigation.push('PostComment', {username: this.state.username, postid: `${l.username}-${l.date}`})
                                    }}>
                                        <Image source={require('../assets/bubble.png')}
                                        style={{width: 25, height: 25, marginLeft: 15}}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }
                            onLongPress = {
                                () => {
                                    Alert.alert(
                                        'Delete',
                                        undefined,
                                        [
                                            {text: 'Delete', onPress: async() => {
                                                !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
                                                firebase.database().ref(`posts/${l.username}-${l.date}`).remove()
                                            }},
                                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                        ],
                                        { cancelable: false }
                                      )
                                }
                            }
                            hideChevron
                        />
                        ))
                    }
                    </View>
                </ScrollView>
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    position = 'center'
                    onPress = {
                        ()=> {
                            this.props.navigation.push('SendPost')
                        }                            
                    }
                />
            </Container>
        );
    }
};

const styles = StyleSheet.create({
    iconBar: {
        height: 40,
        width: 100 + '%',
        borderColor: 'rgb(233, 233, 233)',
        flexDirection: 'row',
        alignItems: 'center'
    }
  });
  