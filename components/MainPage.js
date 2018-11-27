import React from 'react';
import ProfilePage from './ProfilePage';
import TimeTable from './TimeTable';
import FriendPage from './FriendPage';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import ExplorePage from './ExplorePage';
import SendPostPage from './SendPostPage';
import setCalendarPage from './SetCalendarPage';

/**
 * disable dual navigator warning for test purpose
 */
console.disableYellowBox = true;
/**
 * Login Page
 */
export default class MainPage extends React.Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }
    
    /**
     * Render function
     * @return {ReactDOM}
     */
    render() {
        return (
            <TabNavigator />
        );
    }
};

const Time = createStackNavigator({
    Time: {
        screen: TimeTable
    },
    SetTime: {
        screen: setCalendarPage
    }
})

const Explore = createStackNavigator({
    Explore: {
        screen: ExplorePage
    },
    SendPost: {
        screen: SendPostPage
    }
})

const Friends = createStackNavigator({
    Friends: {
        screen: FriendPage
    },
    Profile: {
        screen: ProfilePage
    }
})

const TabNavigator = createBottomTabNavigator({
    Calendar: Time,
    Friends: FriendPage,
    Explore: Explore,
    Profile: ProfilePage
})