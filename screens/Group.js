import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';


class Group extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {navigation} = this.props;
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Group</Text>
                <Button
                title="Route"
                onPress = {() => {navigation.navigate("MapOrigin")}}
                />
                <Button
                title="Members"
                />
            </View>
        );
    };
};

export default Group;