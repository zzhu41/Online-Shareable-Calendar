import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Button, RefreshControl, AsyncStorage} from 'react-native';
import { Container, Header, Body, Text, Grid, Row, Col, Content, Separator, Left, Right} from 'native-base';
import { Avatar, ListItem, List } from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';

/**
 * Login Page
 */

export default class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           user: {}
        }
    }

    static navigationOptions = {
        header: null
    }
    
    async componentWillMount() {
        const location = await AsyncStorage.getItem('location');
        const username = await AsyncStorage.getItem('username');
        const DOB = await AsyncStorage.getItem('date of birth');
        const name = await AsyncStorage.getItem('name');
        this.setState({
            user : {location: `${location}`,
            username: `${username}`,
            name: `${name}`,
            DOB: `${DOB}`}
        })
        console.log(this.state.name);
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
                            <Image
                                style={{width: width*0.3, height: width*0.3, borderRadius: width*0.15}}
                                source={{uri: 'https://avatars0.githubusercontent.com/u/25411225?v=4'}}
                                />
                        </View>                
                        <View>      
                            <List>
                                <ListItem
                                    title="Name"
                                    rightTitle= { this.state.user.name }
                                    hideChevron
                                />
                                <ListItem
                                    title="Username"
                                    rightTitle= { this.state.user.username }
                                    hideChevron
                                />
                                <ListItem
                                    title="location"
                                    rightTitle= { this.state.user.location }
                                    hideChevron
                                />
                                <ListItem
                                    title="Date of Birth"
                                    rightTitle= { this.state.user.DOB }
                                    hideChevron
                                />
                            </List>
                        </View>
                    </Content>
                </ScrollView> 
            </Container>
        );
    }
};

const { width } = Dimensions.get('window');
