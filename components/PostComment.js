import React from 'react';
import { StyleSheet, Text, View, ScrollView, AlertIOS, RefreshControl,  Alert, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Timeline from 'react-native-timeline-listview'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Container, Header, Body, Row, Col, Content, Separator, Left, Right} from 'native-base';
import { FloatingAction } from 'react-native-floating-action';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modalbox';
import { Avatar, ListItem, List } from 'react-native-elements';
import Button from 'react-native-button';
import { config, hashCode } from '../config';
import firebase from 'firebase';
import { LineChart, YAxis, Grid, PieChart, XAxis } from 'react-native-svg-charts';

export default class PostComment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commentList : []
        }
    }

    async componentWillMount(){
        const username = this.props.navigation.state.params.username;
        //console.log(this.props.navigation.state.params.postid)
        await firebase.database().ref(`posts/${this.props.navigation.state.params.postid}`).on('value', (data) => {
            console.log(data.toJSON().comments);
            if (data.toJSON().comments !== undefined) {
                this.setState({
                    commentList: data.toJSON().comments,
                })
            }
            
        })
        console.log(this.state.commentList)
    }

    static navigationOptions = {
        header: null
    }


    render() {
        return (
            <Container>
            <Header>
                <Left>
                </Left>
                    <Body>
                        <Text>
                            Comments
                        </Text>
                    </Body>
                <Right>
                </Right>
            </Header>
            <ScrollView>
            <View>
                    {
                        Object.values(this.state.commentList).map((l, i) => (
                        <ListItem 
                            key = {i}
                            title={`${l.commentContext}`}
                            subtitle={`user: ${l.username}`}
                            onLongPress = {()=>{
                                AlertIOS.prompt(
                                    'Comment',
                                    '',
                                    [
                                        {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                        },
                                        {
                                        text: 'Send',
                                        onPress: async (context) => {
                                            const username = await AsyncStorage.getItem('username');
                                            !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
                                            firebase.database().ref(`posts/${this.props.navigation.state.params.postid}/comments`).push({
                                                username: username,
                                             commentContext: `reply @ ${l.username}: ${context}`
                                    })
                                        },
                                        },
                                    ],
                                    );
                                
                            }}
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
                    () => {
                        AlertIOS.prompt(
                            'Comment',
                            '',
                            [
                                {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                                },
                                {
                                text: 'Send',
                                onPress: async (context) => {
                                    const username = await AsyncStorage.getItem('username');
                                    !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
                                    firebase.database().ref(`posts/${this.props.navigation.state.params.postid}/comments`).push({
                                        username: username,
                                        commentContext: context
                                    })
                                },
                                },
                            ],
                            );
                    }
                }                            
                
            />
            </Container>
        )
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
  