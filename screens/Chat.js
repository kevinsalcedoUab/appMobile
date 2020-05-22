import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import {socket} from './Home';

class Chat extends Component {
  constructor(props){
    super(props);
    this.state={
      chatMessage: "",
      chatMessages: [],
      toSendId: "",
    };
  }
  
  componentDidMount(){ 
    /*const {route} = this.props;
    const {ID} = route.params;
    let userClient = ID;
    //this.socket = SocketIOClient('http://192.168.1.134:3000', {query: 'userClient='+userClient});*/
    socket.on("chat message", msg => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]})
    });
  }

  submitChatMessage(){
    socket.emit('chat message', {
      msg: this.state.chatMessage,
      idSend: this.state.toSendId
    });
    this.setState({chatMessages: [...this.state.chatMessages, this.state.chatMessage]})
    this.setState({chatMessage: ''});
  }
  

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{borderWidth: 2, top: 140, backgroundColor: '#00FFFF' }}>{chatMessage}</Text>
    ));
    const styles = StyleSheet.create({
      container: {
        height: 400,
        width: '100%',
        flex: 1,
        backgroundColor: '#F5FCFF',
        position: "absolute",
      },
    });


    const {navigation, route} = this.props;
    const {ID} = route.params;
    return (
      <View style={styles.container}>
        {chatMessages}
        <TextInput
          style={{height: 40, borderWidth: 2, top: 0}}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({chatMessage});
          }}
        />
        <TextInput
        style={{height: 40, borderWidth: 2, top: 20}}
        autoCorrect={false}
        value={this.state.toSendId}
        onChangeText={toSendId =>{
          this.setState({toSendId});
        }}  
        />
      </View>
   );
  }
}

export default Chat;
