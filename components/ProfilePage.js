import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Button, RefreshControl, AsyncStorage, TouchableHighlight, TouchableOpacity, Alert, CameraRoll } from 'react-native';
import { Container, Header, Body, Text, Row, Col, Content, Separator, Left, Right} from 'native-base';
import { Avatar, ListItem, List } from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import { ImagePicker, Permissions } from 'expo';
import { config, hashCode } from '../config';
import { LineChart, YAxis, Grid, PieChart } from 'react-native-svg-charts';
import firebase from 'firebase';

export default class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           userInfo: {},
           image: []
        }
    }

    static navigationOptions = {
        header: null
    }
    
    async componentWillMount() {
        // await firebase.database().ref(`users/${this.state.username}`).once('value', (data) => {
        //     password = data.toJSON().password;
        // })
        !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
        const username = await AsyncStorage.getItem('username');
        await firebase.database().ref(`users/${username}`).on('value', (data) => {
            let arr = []
            Object.values(data.toJSON().image).map((l, i)=> {
                arr.push(Object.values(l)[0])
            })
            this.setState({
                userInfo: data.toJSON(),
                image: arr
            })
        })
        //console.log(this.state.image)

        
    }

    /**
     * Render function
     * @return {ReactDOM}
     */
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Text>
                            Profile
                        </Text>
                    </Body>
                    <Right>
                        <Button 
                            title="..."
                            onPress = {() => {
                                this.props.navigation.push('Data')
                            }}
                        />
                    </Right>
                </Header>
                <ScrollView> 
                    <Content>     
                        <View style = {{ alignItems: 'center', paddingTop: 20}}>
                            <TouchableOpacity onPress={() => {
                                console.log('Profile Picture Touched');
                                Alert.alert(
                                    'Profile Picture',
                                    undefined,
                                    [
                                        {text: 'Choose from Album', onPress: async() => {
                                            const permissions = Permissions.CAMERA_ROLL;
                                            const { status } = await Permissions.askAsync(permissions);
                                            let result = await ImagePicker.launchImageLibraryAsync({
                                                allowsEditing: true,
                                                aspect: [4, 3],
                                                base64: true
                                            });
                                            if (!result.cancelled) {
                                                const username = await AsyncStorage.getItem('username');
                                                !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
                                                console.log(result.uri)
                                                const response = await fetch(result.uri.replace('file://', ''));
                                                const blob = await response.blob();
                                                let ref = firebase.storage().ref().child(`images/${username}`);
                                                let metadata = {
                                                    contentType: 'image/jpeg',
                                                  };
                                                await ref.put(blob, metadata);
                                                let newUrl = result.uri;
                                                // const newurl = firebase.storage().ref(`images/${username}`).getDownloadURL().then((url) => {
                                                //     console.log(url)
                                                //     newUrl = url
                                                // });
                                                console.log(newUrl)
                                                let imageArr = this.state.image;
                                                if (imageArr.length === 1) {
                                                    imageArr.push(newUrl);
                                                } else {
                                                    imageArr[1] = newUrl;
                                                }
                                                let temp = imageArr[0];
                                                imageArr[0] = imageArr[1];
                                                imageArr[1] = temp;
                                                this.setState({
                                                    image: imageArr
                                                })

                                            }
                                            
                                        }},
                                        {text: 'use last profile photo', onPress: async () => {
                                            let imageArr = this.state.image;
                                            let temp = imageArr[0];
                                            imageArr[0] = imageArr[1];
                                            imageArr[1] = temp;
                                            this.setState({
                                                image: imageArr
                                            })
                                        }},
                                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    ],
                                    { cancelable: false }
                                )
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
                    </Content>
                </ScrollView> 
            </Container>
        );
    }
};

const { width } = Dimensions.get('window');
