import React from 'react';
import ProfilePage from './ProfilePage';
import TimeTable from './TimeTable';
import FriendPage from './FriendPage';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import ExplorePage from './ExplorePage';
import SendPostPage from './SendPostPage';
import setCalendarPage from './SetCalendarPage';
import FriendProfile from './FriendProfile';
import DataVisPage from './DataVisPage';
import PostComment from './PostComment';
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
    },
    PostComment: {
        screen: PostComment
    }
})

const Friends = createStackNavigator({
    Friends: {
        screen: FriendPage
    },
    FriendProfile: {
        screen: FriendProfile
    },
    SetTime: {
        screen: setCalendarPage
    }
})

const Profiles = createStackNavigator({
    Profile: {
        screen: ProfilePage
    },
    Data: {
        screen: DataVisPage
    }
})


const TabNavigator = createBottomTabNavigator({
    Calendar: Time,
    Friends: Friends,
    Explore: Explore,
    Profile: Profiles
})