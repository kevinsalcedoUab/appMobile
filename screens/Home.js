import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';

var socket;
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
          chatMessage: "",
          chatMessages: [],
          toSendId: "",
        };
        var {route} = props;
        var {ID} = route.params;
        let userClient = ID;
        socket = SocketIOClient('http://192.168.1.134:3000', {query: 'userClient='+userClient});
    }

    /**
     * RENDER
     */
    render(){
        const {navigation, route} = this.props;
        const {ID, NAME, FIRSTNAME, LASTNAME, EMAIL, AGE, PHONE, TYPE, LFRIENDS, IDGROUP} = route.params;
        const requestFriend = {};
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

export {Home, socket};