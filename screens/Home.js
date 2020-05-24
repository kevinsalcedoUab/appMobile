import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';

var socket;
var client = {"LFRIENDS": []};
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
          chatMessage: "",
          chatMessages: [],
          toSendId: "",
        };
        const {route} = props;
        const {ID} = route.params;
        let userClient = ID;
        socket = SocketIOClient('http://192.168.1.134:3000', {query: 'userClient='+userClient});
    }
    componentDidMount(){ 
        
    }

    /**
     * RENDER
     */
    render(){
        const {navigation, route} = this.props;
        const {ID, NAME, FIRSTNAME, LASTNAME, EMAIL, LFRIENDS, AGE, PHONE, TYPE, IDGROUP} = route.params;
        const requestFriend = {};
        client.LFRIENDS = LFRIENDS;
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Hi</Text>
                <Text>{NAME}!</Text>
                <Button
                title="Group"
                onPress={()=> navigation.navigate("Group")}
                />
                <Button
                title="FriendList"
                onPress={()=> navigation.navigate("FriendList", {'ID': ID, 'NAME': NAME, 'LFRIENDS': LFRIENDS , 'REQUESFRIEND': requestFriend})}
                />
                <Button
                title="Chat"
                onPress={() => navigation.navigate("Chat", {'ID': ID})}
                />
            </View>
        );
    };
};

export {Home, socket, client};