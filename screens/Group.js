import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import {socket, group, client} from './Home';

class Group extends Component {
    constructor(props){
        super(props);
        this.state={
            requestMember: '',
            requestMemberID: '',
            requestGroup: '',
            requestRoute: ''
        };
    }

    componentDidMount(){
        socket.on("request member", obj => {
            console.log('REQUEST MEMBER: ', obj);
            this.setState({requestMember: obj.nameT})
            this.setState({requestMemberID: obj.idT})
            this.setState({requestGroup: obj.group})
            this.setState({requestRoute: obj.route})
        });

        socket.on("update LMEMBERS2", newGroup => {
            console.log('update LMEMBERS2: ', newGroup);
            group.IDGROUP = newGroup.idGroup;
            group.LMEMBERS = JSON.parse(newGroup.lMembers);
            console.log("update LMEMBERS2 --- LMEMBERS: ", group.LMEMBERS);
            group.ROUTE = newGroup.route;
            client.IDGROUP =group.IDGROUP;
        });
    }

    render(){
        const {navigation, route} = this.props;
        const requestMember= this.state.requestMember;
        const requestMemberID= this.state.requestMemberID;
        const requestGroup= this.state.requestGroup;
        const requestRoute = this.state.requestRoute;
        //styles
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                marginTop: 5,
            },
            item: {
                backgroundColor: '#6495ED',
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            },
            title: {
                fontSize: 20,
            },
            item2: {
                backgroundColor: '#8A2BE2',
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
                display: 'flex',
                flexDirection: 'row',
            },
            itemRequestFriend: {
                backgroundColor: '#E9967A',
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
                textAlign: 'center',
                color: 'white',
                fontSize: 18,
            },
            test: {
                flexGrow: 1,
            },
            test2: {
                backgroundColor: '#4CAF50',
                color: 'black',
                padding: '5px 5px',
                textDecorationLine: 'none',
                fontSize: 10,
                flexGrow: 2,

            },    
        });

        //REQUEST MEMBER COMPONENT
        function RequestGroup(){
            function acceptRequest(){
                console.log("accept request of Member :D");
                socket.emit("request member", {msg: 'YES', 'ID': client.ID, 'NAME': client.NAME, 'TRANSMITTER': requestMember, 'IDTRANSMITTER': requestMemberID, 'GROUP': requestGroup, 'ROUTE': requestRoute});
                navigation.navigate("Home");
            }
            function deniedRequest(){
                console.log("denied request of Member :(");
                socket.emit("request member", {msg: 'NO', 'ID': client.ID, 'NAME': client.NAME, 'TRANSMITTER': requestMember, 'IDTRANSMITTER': requestMemberID, 'GROUP': requestGroup, 'ROUTE': requestRoute});
                
            }
            if(requestMember){
                return(
                    <View style={styles.item2}>
                        <Text style={styles.test}>{requestMember}</Text>
                        <Button style={styles.test2} title="Accept" onPress={()=>acceptRequest()}/>
                        <Button style={styles.test2} title="Decline" onPress={()=>deniedRequest()}/>
                    </View>
                );
            }
            else{
                return(
                    <Text style={styles.item2}>Any Group Request</Text>
                );
            }
        }

        //MAIN COMPONENT
        if(client.IDGROUP){
            return(
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Group</Text>
                    <Button
                    title="Route"
                    onPress = {() => {navigation.navigate("MapOrigin")}}
                    />
                    <Button
                    title="Members"
                    onPress = {() => {navigation.navigate("Members")}}
                    />
                    
                </View>
            );
        }else{
            return(
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>You don't have a Group yet!</Text>
                <Button title="Create Group"
                onPress = {() => {navigation.navigate("MapOrigin")}}
                />
                <RequestGroup/>
                </View>
            )
        }
        
    };
};

export default Group;