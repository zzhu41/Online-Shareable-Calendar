import React from 'react';
import { StyleSheet, Text, View, ScrollView, AlertIOS,AsyncStorage } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Timeline from 'react-native-timeline-listview'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Container, Header, Body, Grid, Row, Col, Content, Separator, Left, Right} from 'native-base';
import { FloatingAction } from 'react-native-floating-action';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import CalendarStrip from 'react-native-calendar-strip';
import { config, hashCode } from '../config';
import firebase from 'firebase';

/**
 * Login Page
 */
export default class TimeTable extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        let today = new Date()
        this.state = {
            data : [
                {time: '09:00', title: 'Wake Up', description: 'Event Description'}
            ],
            date: '',
            displayDay: today.toString().substring(3,15)
        }
    }

    async componentWillMount() {
        const username = await AsyncStorage.getItem('username');
        !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
        firebase.database().ref(`users/${username}/calendar/${this.state.displayDay}`).on('value', (data) => {
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
    /**
     * Render function
     * @return {ReactDOM}
     */
    render() {
        return (
            <Container >
                <ScrollView>
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
                                firebase.database().ref(`users/${username}/calendar/${this.state.displayDay}`).on('value', (data) => {
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
                </ScrollView>
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress = {
                        () => { 
                            this.props.navigation.navigate('SetTime');
                        }
                    }
                />
            </Container>
        );
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    }
});

const actions = [{
    text: 'Add Event',
    name: 'add_event',
    position: 1
}];
  
