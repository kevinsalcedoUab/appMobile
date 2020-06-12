import React, { Component, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {socket, client} from './Home';
import { TextInput } from 'react-native-gesture-handler';
import _ from 'lodash';

class Group extends Component {
    constructor(props){
        super(props);
        this.state={
            requestFriend: '',
            requestFriendID: '',
        };
    }
    componentDidMount(){ 
        console.log("CLIENT: ",client);
        socket.on("add friend", msg => {
            alert(msg);
        });
        socket.on("request friend", obj => {
            console.log('REQUEST FRIEND: ', obj);
            this.setState({requestFriend: obj.nameT})
            this.setState({requestFriendID: obj.idT})
        });

        socket.on("response friend", obj =>{
            if(obj.receiver){
                this.setState({requestFriend: ''});
                console.log(obj);
                
            }else{
                if(obj.transmitter){
                    console.log(obj);
                    alert(obj.msg)
                }
            }
        });
        socket.on("update LFRIENDS", newListFriends => {
            console.log('update LFRIENDS: ', newListFriends);
            if(newListFriends!= 0){
                client.LFRIENDS = JSON.parse(newListFriends);
            }else{
                if(typeof(newListFriends)=='object'){
                    client.LFRIENDS = newListFriends;
                }
                
            }
        });
        
    }
    

    render(){
        const {route, navigation} = this.props;
        const {ID, NAME, LFRIENDS, REQUESFRIEND} = route.params;
        const requestFriend= this.state.requestFriend;
        const requestFriendID= this.state.requestFriendID;

        //COMPONENTS FROM FRIENDLIST
        function Item({ id, title, selected, onSelect }) {
            function clickID(idDelete){
                client.LFRIENDS = _.reject(client.LFRIENDS, function(el) { return el.id === id; });
                socket.emit("delete friend", {'ID': ID, 'NEWLFRIENDS': client.LFRIENDS, 'IDFRIEND': idDelete});
            }
            
            function chatToFriend(idFriend){
                console.log("Chat with: ", idFriend);
                navigation.navigate("Chat", {'idFriend': idFriend})
            }

            return (
                <TouchableOpacity
                    onPress={() => chatToFriend(id)}
                    style={styles.item}
                >
                    <Text style={styles.title}>{title}</Text>
                    <Button title="Delete" onPress={()=>clickID(id)}/>
            
                </TouchableOpacity>
            );
        }
        function Request(){
            function acceptRequest(){
                console.log("accept request :D");
                socket.emit("request friend", {msg: 'YES', 'ID': ID, 'NAME': NAME, 'TRANSMITTER': requestFriend, 'IDTRANSMITTER': requestFriendID});
            }
            function deniedRequest(){
                console.log("denied request :(");
                socket.emit("request friend", {msg: 'NO', 'ID': ID, 'NAME': NAME, 'TRANSMITTER': requestFriend, 'IDTRANSMITTER': requestFriendID});
                
            }
            console.log("request friend: " + requestFriend);
            if(requestFriend){
                return(
                    <View style={styles.item2}>
                        <Text style={styles.test}>{requestFriend}</Text>
                        <Button style={styles.test2} title="Accept" onPress={()=>acceptRequest()}/>
                        <Button style={styles.test2} title="Decline" onPress={()=>deniedRequest()}/>
                    </View>
                );
            }
            else{
                return(
                    <Text style={styles.item2}>No hay ninguna solicitud</Text>
                );
            }
        }
        
        function ListFriend() {
            const [selected, setSelected] = React.useState(new Map());
        
            const onSelect = React.useCallback( 
            id => {
                const newSelected = new Map(selected);
                newSelected.set(id, !selected.get(id));
        
                setSelected(newSelected);
            },
            [selected],
            );

            var [friendUser, setfriendUser] = useState('');
            
            function addClick(){
                console.log("add list friend");
                socket.emit("add friend", {msg: friendUser, 'ID': ID, 'NAME': NAME});
                setfriendUser('');
            }
            console.log('LFRIENDS: ', client.LFRIENDS);
            return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                    data={client.LFRIENDS}
                    renderItem={({ item }) => (
                        <Item
                        id={item.id}
                        title={item.name}
                        selected={!!selected.get(item.id)}
                        onSelect={onSelect}
                        />
                    )}
                    keyExtractor={item => item.id}
                    extraData={selected}
                    />
                    <TextInput
                        style={styles.itemRequestFriend}
                        autoCorrect={false}
                        defaultValue={friendUser}
                        placeholder="Add Friend"
                        onSubmitEditing={() => addClick()}
                        onChangeText={message => {
                            setfriendUser(message);
                        }}
                    />
                    
                    <Request/>

                </SafeAreaView>
            );
        }

        //STYLES
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

        return(<ListFriend/>)
    };
};

export default Group;