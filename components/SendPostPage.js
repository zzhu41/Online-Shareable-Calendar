import React from 'react';
import { StyleSheet, Text, View, ScrollView, AlertIOS, TextInput, Dimensions, Button, AsyncStorage, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Timeline from 'react-native-timeline-listview'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Container, Header, Body, Grid, Row, Col, Content, Separator, Left, Right} from 'native-base';
import { FloatingAction } from 'react-native-floating-action';
import ActionButton from 'react-native-action-button';
import { ImagePicker, Permissions } from 'expo';
import Modal from 'react-native-modalbox';
import { config, hashCode } from '../config';
import firebase from 'firebase';
export default class SendPostPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postImage: '',
            context:'Add Photo'
        }
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
                            Send Post
                        </Text>
                    </Body>
                    <Right>
                        <Button
                            title="Send"
                            onPress = {
                                async() => {
                                    const username = await AsyncStorage.getItem('username');
                                    !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
                                    let today = new Date();
                                    let dd = today.getDate();
                                    let mm = today.getMonth()+1; 
                                    let yyyy = today.getFullYear();
                                    let time = today.getTime()
                                    if(dd<10) {
                                        dd = '0'+dd
                                    } 
                                    if(mm<10) {
                                        mm = '0'+mm
                                    } 
                                    today = mm + '-' + dd + '-' + yyyy + '-' + time;
                                    firebase.database().ref(`posts/${username}-${today.toString()}`).set({
                                        username: username,
                                        postContext: this.state.postContext,
                                        date: today.toString(),
                                        likes: 0,
                                        comments: [],
                                        id : `${username}-${today.toString()}`,
                                        imageURL: this.state.postImage
                                    }).then((() => {
                                        console.log('Send post successfully')
                                    })).catch((error) => {
                                        console.log(error);
                                    })
                                    this.props.navigation.navigate('Explore');
                                }
                            }
                        />
                    </Right>
                </Header>
                <View style={styles.container}>
                    <TextInput 
                        placeholderTextColor = 'steelblue' 
                        style = {styles.input}
                        numberOfLines = {5}
                        multiline = {true}
                        onChangeText={(text) => 
                            this.setState({
                                postContext:text
                            })
                        }
                    />
                    <Button
                        onPress={ async() => {
                            console.log('OPEN PHOTO ALBUM FROM SEND POST');
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
                                let ref = firebase.storage().ref().child(`images/${username}/posts`);
                                let metadata = {
                                    contentType: 'image/jpeg',
                                };
                                await ref.put(blob, metadata);
                                let newUrl = result.uri;
                                console.log(newUrl)
                                this.setState({
                                    postImage: newUrl,
                                    context: 'Change Photo'
                                })
                            }
                        }}
                        title={this.state.context}
                        color="steelblue"
                        accessibilityLabel="Add or change photo"
                    />
                    <Image
                        style={{width: width*0.7, height: width*0.7}}
                        source={{uri: this.state.postImage}}                                    
                    />
                </View>
            </Container>
        );
    }
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    input: {
        height: width*0.2, 
        width: width*0.95,
        borderColor: 'gray', 
        borderWidth: 1, 
        textAlignVertical: 'top'
    },
    button: {
        paddingTop: 20
    }
});
