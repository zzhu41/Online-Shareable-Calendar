import React from 'react';
import { StyleSheet, Text, View, ScrollView, AlertIOS, RefreshControl, Dimensions, Alert, Image, TouchableOpacity, AsyncStorage} from 'react-native';
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
import Search from 'react-native-search-box';
export default class ExplorePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            postList: [],
            bubbleIcon: '',
            heartColor: null,
            username:'',
            postDisplay: [],
            search: ''
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
                username: username,
                postDisplay: Object.values(data.toJSON())
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
                <Search
                    loading = {this.state.loading}
                    ref="search for posts"
                    onChangeText = {
                    (text) => {
                        console.log(`TEXT: ${text} CHANGED [DEBUG]`)
                    }
                    }
                    onSearch = {
                    (text) => {
                        this.setState({
                            search: text
                        })
                    }
                    }
                />
                <ScrollView 
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>    
                    <View>
                    {
                        this.state.postDisplay.filter(((l) => 
                            this.state.search === '' ? l : l.username === this.state.search || l.postContext.includes(this.state.search)
                        )).map((l, i) => (
                        <ListItem 
                            key = {i}
                            subtitle={
                                <View>
                                <View style={{flex: 2, flexDirection: 'row'}}>
                                    <Image
                                        style={{width: width*0.1, height: width*0.1, borderRadius: width*0.05}}
                                        source={{uri: "https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg" }}                                    
                                    />
                                    <Text style={{paddingLeft: 20, fontSize:16}}>
                                        {l.username}
                                    </Text>
                                </View>
                                <Image
                                    style={{width: width*0.95, height: width*0.95}}
                                    source={{uri: l.imageURL}}                                    
                                />
                                <Text style={{paddingLeft: 10, fontSize: 18}}>
                                    {l.postContext}
                                </Text>
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    iconBar: {
        height: 40,
        width: 100 + '%',
        borderColor: 'rgb(233, 233, 233)',
        flexDirection: 'row',
        alignItems: 'center'
    }
  });
  