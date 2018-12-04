import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Button, RefreshControl, AsyncStorage, TouchableHighlight, TouchableOpacity, Alert, CameraRoll } from 'react-native';
import { Container, Header, Body, Text, Grid, Row, Col, Content, Separator, Left, Right} from 'native-base';
import { Avatar, ListItem, List } from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import { ImagePicker, Permissions } from 'expo';
import { config, hashCode } from '../config';
import firebase from 'firebase';
import CalendarStrip from 'react-native-calendar-strip';
import Timeline from 'react-native-timeline-listview';
import ActionButton from 'react-native-action-button';

export default class FriendProfile extends React.Component {

    constructor(props) {
        super(props);
        let today = new Date();
        this.state = {
            username: '',
           userInfo: {},
           image: [],
           data : [
            {time: '09:00', title: 'Wake Up', description: 'Event Description'}
            ],
            date: '',
            displayDay: today.toString().substring(3,15)
        }
    }

    static navigationOptions = {
        header: null
    }
    
    async componentWillMount() {
        !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
        const username = await AsyncStorage.getItem('username');
        await firebase.database().ref(`users/${this.props.navigation.state.params.username}`).on('value', (data) => {
            let arr = []
            Object.values(data.toJSON().image).map((l, i)=> {
                arr.push(Object.values(l)[0])
            })
            this.setState({
                userInfo: data.toJSON(),
                image: arr
            })
        })
        !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
        firebase.database().ref(`users/${this.props.navigation.state.params.username}/calendar/${this.state.displayDay}`).on('value', (data) => {
            console.log(data.toJSON())
            let calendarArr = []
            for (const prop in data.toJSON()) {
                calendarArr.push({time:data.toJSON()[prop].time, title: data.toJSON()[prop].event, description: data.toJSON()[prop].description})
            }
            this.setState({
                data: calendarArr,
                username: this.props.navigation.state.params.username
            })
        })

        
    }

    /**
     * Render function
     * @return {ReactDOM}
     */
    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Text>
                            Profile
                        </Text>
                    </Body>
                </Header>
                <ScrollView> 
                    <Content>     
                        <View style = {{ alignItems: 'center', paddingTop: 20}}>
                            <TouchableOpacity onPress={() => {
                                console.log('Friend profile picture');
                            }}>
                                <Image
                                    style={{width: width*0.3, height: width*0.3, borderRadius: width*0.15}}
                                    source={{uri: this.state.image[0]}}                                    
                                />
                            </TouchableOpacity>       
                        </View>                
                        <View>      
                            <List>
                                <ListItem
                                    title="Name"
                                    rightTitle= { this.state.userInfo.name }
                                    hideChevron
                                />
                                <ListItem
                                    title="Username"
                                    rightTitle= { this.state.userInfo.username }
                                    hideChevron
                                />
                                <ListItem
                                    title="location"
                                    rightTitle= { this.state.userInfo.location }
                                    hideChevron
                                />
                                <ListItem
                                    title="Date of Birth"
                                    rightTitle= { this.state.userInfo.DOB }
                                    hideChevron
                                />
                            </List>
                        </View>
                        <View>
                                <CalendarStrip 
                                style={{height:150, paddingTop: 40, paddingBottom: 10}}
                                onDateSelected = {
                                    async (selectDate) => {
                                        console.log(selectDate)
                                        let dateKey = selectDate.toString().substring(3,15);
                                        this.setState({
                                            displayDay: dateKey
                                        })
                                        const username = await AsyncStorage.getItem('username');
                                        !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
                                        firebase.database().ref(`users/${this.props.navigation.state.params.username}/calendar/${this.state.displayDay}`).on('value', (data) => {
                                            console.log(data.toJSON())
                                            let calendarArr = []
                                            for (const prop in data.toJSON()) {
                                                calendarArr.push({time:data.toJSON()[prop].time, title: data.toJSON()[prop].event, description: data.toJSON()[prop].description})
                                            }
                                            this.setState({
                                                data: calendarArr
                                            })
                                        })
                                    }
                                }
                            />
                            <View>
                            </View> 
                            <Timeline
                                style={{ paddingTop: 30}}
                                data={this.state.data}
                            />
                        </View>
                    </Content>
                </ScrollView> 
                <ActionButton
                                style={{ paddingTop: 30}}
                                buttonColor="rgba(231,76,60,1)"
                                onPress = {
                                    () => { 
                                        this.props.navigation.push('SetTime', {user: this.state.username});
                                        console.log(this.state.username);
                                    }
                                }
                            />
            </Container>
        );
    }
};

const { width } = Dimensions.get('window');