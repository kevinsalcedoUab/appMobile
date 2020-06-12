import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';

var socket;
var client = {
    "ID": '',
    "NAME": '',
    "FIRSTNAME": '',
    "LASTNAME": '',
    "EMAIL": '',
    "LFRIENDS": [],
    "AGE": '',
    "PHONE": '',
    "TYPE": '',
    "IDGROUP": '',

};
var group = {
    "IDGROUP": '',
    "NMEMBERS": '',
    "LMEMBERS": [],
    "ROUTE": []
};
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
        client.ID = ID;
        client.NAME = NAME;
        client.FIRSTNAME = FIRSTNAME;
        client.LASTNAME = EMAIL;
        client.AGE = AGE;
        client.PHONE = PHONE;
        client.TYPE = TYPE;
        client.IDGROUP = IDGROUP;
        
        function UploadGroup(){
            if(client.IDGROUP){
                fetch("http://192.168.1.134:3000/group", {
                method: 'POST',
                body: JSON.stringify({'ID': client.ID, 'IDGROUP': client.IDGROUP}),
                headers: {
                  'Content-Type': 'application/json'
                }   
                })
                .then(response => response.json())
                .then(response => {
                    console.log("group request: ", response);
                    group.IDGROUP = response.json[0].idGroup;
                    group.LMEMBERS = JSON.parse(response.json[0].listMembers);
                    group.NMEMBERS = response.json[0].nMembers;
                    group.ROUTE = JSON.parse(response.json[0].route);
                    navigation.navigate("Group", group);
                })
                .catch(error => {
                    console.log("login error: ", error);
                    alert("Upload failed!");
                });
            }else{
                navigation.navigate("Group", group);
            }
        };
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Hi</Text>
                <Text>{NAME}!</Text>
                <Button
                title="Group"
                onPress={()=> UploadGroup()}
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

export {Home, socket, client, group};