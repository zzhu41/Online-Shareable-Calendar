import React from 'react';
import { StyleSheet, Text, View, ScrollView, AlertIOS, RefreshControl,  Alert, Image, TouchableOpacity} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Timeline from 'react-native-timeline-listview'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Container, Header, Body, Row, Col, Content, Separator, Left, Right} from 'native-base';
import { FloatingAction } from 'react-native-floating-action';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modalbox';
import { Avatar, ListItem, List } from 'react-native-elements';
import Button from 'react-native-button';
import { config, hashCode, event1, event2 } from '../config';
import firebase from 'firebase';
import { LineChart, YAxis, Grid, PieChart, XAxis } from 'react-native-svg-charts';

export default class DataVisPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventList : event1
        }
    }

    async componentWillMount(){
        const username = await AsyncStorage.getItem('username');
        firebase.database().ref(`users/${username}`).on('value', (data) => {
            this.setState({
                event: data.toJSON()
            })
        })
    }

    static navigationOptions = {
        header: null
      }


    render() {

        const data = event2;
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        return (
            <Container>
            <Header>
                <Left>
                </Left>
                    <Body>
                        <Text>
                            Data
                        </Text>
                    </Body>
                <Right>
                </Right>
            </Header>
            <ScrollView>
            <Text style ={{alignItems: 'center'}}>
                today's event
            </Text>
            <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={this.state.eventList}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={this.state.eventList}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                    >
                        <Grid/>
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={this.state.eventList}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View>
            </View>
            <Text style ={{alignItems: 'center'}}>
                number of events in the next 7 days
            </Text>
            <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={data}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={data}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                    >
                        <Grid/>
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={['day1', 'day2','day3','day4','day5','day6','day7']}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View>
            </View>
            </ScrollView>
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
  