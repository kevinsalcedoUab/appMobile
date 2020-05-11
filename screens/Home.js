import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';


class Home extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {navigation, route} = this.props;
        const {ID, NAME, FIRSTNAME, LASTNAME, EMAIL, AGE, PHONE, TYPE, LFRIENDS, IDGROUP} = route.params;
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Hi</Text>
                <Text>{NAME}!</Text>
                <Button
                title="Group"
                />
                <Button
                title="FriendList"
                />
                <Button
                title="Chat"
                onPress={() => navigation.navigate("Chat", {'ID': ID})}
                />
            </View>
        );
    };
};

export default Home;
