import React from 'react';
import ProfilePage from './ProfilePage';
import TimeTable from './TimeTable';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

/**
 * disable dual navigator warning for test purpose
 */
console.disableYellowBox = true;
/**
 * Login Page
 */
export default class MainPage extends React.Component {

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

const TabNavigator = createBottomTabNavigator({
    Calendar: TimeTable,
    Profile: ProfilePage
})