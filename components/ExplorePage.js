import React from 'react';
import { StyleSheet, Text, View, ScrollView, AlertIOS, RefreshControl,  Alert } from 'react-native';
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
            postList: []
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

    componentWillMount(){
        firebase.database().ref(`posts`).on('value', (data) => {
            console.log(data)
            this.setState({
                postList: Object.values(data.toJSON())
            })
        })
        console.log(this.state.postList)
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
                            subtitle={`user: ${l.username}`}
                            onLongPress 
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
