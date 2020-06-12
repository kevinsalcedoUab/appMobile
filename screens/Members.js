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
import {socket, client, group} from './Home';
import { TextInput } from 'react-native-gesture-handler';
import _ from 'lodash';

class Members extends Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount(){ 
        console.log("CLIENT: ",client);

        function findObjinArrayy(array, obj){
            var found = false;
            for(var i = 0; i < array.length; i++) {
                if (array[i].id == obj.id) {
                        found = true;
                        break;
                }
            }
            return found; 
        }

        socket.on("add member", msg => {
            alert(msg);
        });

        socket.on("response member", obj =>{
            if(obj.receiver){
                //this.setState({requestFriend: ''});
                console.log(obj);
                
            }else{
                if(obj.transmitter){
                    console.log('response member: ',obj);
                    alert(obj.msg)
                }
            }
        });

        socket.on("update LMEMBERS", newListFriends => {
            console.log('update LMEMBERS: ', newListFriends);
            if(newListFriends!= 0){
                let find = findObjinArrayy(JSON.parse(newListFriends), {'id': client.ID});
                if(find){
                    group.LMEMBERS = JSON.parse(newListFriends);
                }else{
                    group.IDGROUP = '';
                    group.LMEMBERS = '';
                    group.ROUTE = '';
                    group.NMEMBERS ='';
                    client.IDGROUP = '';
                }
            }else{
                group.IDGROUP = '';
                group.LMEMBERS = '';
                group.ROUTE = '';
                client.IDGROUP = '';
            }
            const {navigation}=this.props;
            navigation.navigate("Home");
        });
        
    }
    

    render(){
        //COMPONENTS FROM MEMBERS
        function Item({ id, title, selected, onSelect }) {
            function clickID(idDelete){
                group.LMEMBERS = _.reject(group.LMEMBERS, function(el) { return el.id === id; });
                socket.emit("delete member", {'ID': client.ID, 'IDGROUP': group.IDGROUP, 'NEWLMEMBER': group.LMEMBERS, 'IDMEMBER': idDelete});
            }
            
            return (
                <View
                    onPress={() => onSelect(id)}
                    style={styles.item}
                >
                    <Text style={styles.title}>{title}</Text>
                    <Button title="Delete" onPress={()=>clickID(id)}/>
            
                </View>
            );
        }
        
        function ListMembers() {
            const [selected, setSelected] = React.useState(new Map());
        
            const onSelect = React.useCallback( 
            id => {
                const newSelected = new Map(selected);
                newSelected.set(id, !selected.get(id));
        
                setSelected(newSelected);
            },
            [selected],
            );

            var [memberUser, setmemberUser] = useState('');
            
            function addClick(){
                console.log("add list member");
                socket.emit("add member", {'newMember': memberUser, 'ID': client.ID, 'NAME': client.NAME, 'IDGROUP': group.IDGROUP, 'ROUTE': group.ROUTE});
                setmemberUser('');
            }
            console.log('LMEMBERS: ', group.LMEMBERS);
            return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                    data={group.LMEMBERS}
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
                        defaultValue={memberUser}
                        placeholder="Add Member"
                        onSubmitEditing={() => addClick()}
                        onChangeText={message => {
                            setmemberUser(message);
                        }}
                    />
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
        return(<ListMembers/>)
    };
};

export default Members;