import React from 'react';
import { StyleSheet, Text, View, ScrollView, AlertIOS, TextInput, Dimensions, Button } from 'react-native';
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
                                const username = await AsyncStorage.getItem('username');
                                !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
                                this.props.navigation.navigate('Time');
                            }
                        }
                    />
                    </Right>
                </Header>
                <TextInput 
                    placeholderTextColor = 'steelblue' 
                    style={{height: 40, width: 100,borderColor: 'gray', borderWidth: 1}}
                />
            </Container>
        );
    }
};
