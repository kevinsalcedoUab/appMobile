import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {View, Text, Button, StyleSheet, Dimensions, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Directions } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
/**
 * Component for home Screen
 */
function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
      title="Go to Maps"
      onPress={() => navigation.navigate('MapOrigin')}
      />
      <Button
      title="Go to Login"
      onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

/**
 * Component for login
 */
function LoginScreen() {
  const [name, setname] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [age, setage] = useState('');
  const [phone, setphone] = useState('');
  const [password, setpassword] = useState('');
  function handleUpload() {
    const obj = {
      NAME: name ,
      FIRSTNAME: firstName  ,
      LASTNAME: lastName,
      EMAIL: email,
      AGE: age ,
      PHONE: phone,
      PASSWORD: password
    }

   fetch("http://192.168.1.134:3000/login", {
       method: 'POST',
       body: JSON.stringify({obj}),
       headers: {
         'Content-Type': 'application/json'
       }
     })
       .then(response => response.json())
       .then(response => {
         console.log("upload succes", response);
         alert("Upload success!");
       })
       .catch(error => {
         console.log("upload error", error);
         alert("Upload failed!");
       });
 };
 return (
   <View style ={{padding:10}}>
     <Text>Register</Text>
     <TextInput style={{height:40}}
     placeholder="name"
     onChangeText={name=>setname(name)}
     defaultValue={name}
     />
     <TextInput style={{height:40}}
     placeholder="Firstname"
     onChangeText={firstName=>setFirstname(firstName)}
     defaultValue={firstName}
     />
     <TextInput style={{height:40}}
     placeholder="Lastname"
     onChangeText={lastName=>setlastName(lastName)}
     defaultValue={lastName}
     />
     <TextInput style={{height:40}}
     placeholder="email"
     onChangeText={email=>setemail(email)}
     defaultValue={email}
     />
     <TextInput style={{height:40}}
     placeholder="age"
     onChangeText={age=>setage(age)}
     defaultValue={age}
     />
     <TextInput style={{height:40}}
     placeholder="phone"
     onChangeText={phone=>setphone(phone)}
     defaultValue={phone}
     />
     <TextInput style={{height:40}}
     placeholder="password"
     onChangeText={password=>setpassword(password)}
     defaultValue={password}
     />

     <Button title="ENVIAR REgister" onPress={handleUpload} />
   </View>
 );
}

function MapsScreenOrigin({navigation}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      height: '100%'
    },
  });
  const [origins, setOrigins] = useState({latitude: 41.5001101, longitude: 2.1092682});
  return (
    <View>
      <Button title="origen"
      onPress={() =>{ navigation.navigate('MapDest', {Olatitude: origins.latitude, Olongitude: origins.longitude,})} }></Button>
      <MapView
        provider={PROVIDER_GOOGLE} 
        style={styles.map}
        region={{
          latitude: origins.latitude,
          longitude: origins.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        mapType={"hybrid"}
        onLongPress= { e => {console.log(e.nativeEvent.coordinate); setOrigins(e.nativeEvent.coordinate)}}
      >
        <MapView.Marker coordinate={origins}  />
      </MapView>
     </View>
  );
}


/**
 * DESTI
 */
function MapsScreenDest({route, navigation}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      height: '100%'
    },
  });
  const [destinations, setDestination] = useState({latitude: 41.5001101, longitude: 2.1092682});
  const {Olatitude, Olongitude} = route.params;
  const or_latitude = parseFloat(JSON.stringify(Olatitude));
  const or_longitude = parseFloat(JSON.stringify(Olongitude));
  return (
    <View>
      <Button title="DESTI"
      onPress={() =>{ navigation.navigate('Route', {Orlatitude: or_latitude, Orlongitude: or_longitude, Dlatitude: destinations.latitude, Dlongitude: destinations.longitude,})} }
      ></Button>
      
      <MapView
        provider={PROVIDER_GOOGLE} 
        style={styles.map}
        region={{
          latitude: destinations.latitude,
          longitude: destinations.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        mapType={"hybrid"}
        onLongPress= { e => {console.log(e.nativeEvent.coordinate); setDestination(e.nativeEvent.coordinate)}}
      >
        <MapView.Marker coordinate={destinations}  />
      </MapView>
     </View>
  );
}


/**
 * ROUTE
 * 
 */
function RouteScreen({route}) {
  const {Orlatitude, Orlongitude, Dlatitude, Dlongitude} = route.params;
  const or_latitude =  parseFloat(JSON.stringify(Orlatitude));
  const or_longitude =  parseFloat(JSON.stringify(Orlongitude));
  const dt_latitude =  parseFloat(JSON.stringify(Dlatitude));
  const dt_longitude = parseFloat(JSON.stringify(Dlongitude));
  
  const coordinates = [
    {
      latitude: parseFloat(or_latitude),
      longitude: parseFloat(or_longitude),
    },
    {
      latitude: parseFloat(dt_latitude),
      longitude:parseFloat(dt_longitude),
    },
  ]; 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      height: '100%'

    },
  });

  //functions
  function MapReady(){  
    console.log("Map ready!!");
  }
  function ConfirmRoute() {
    fetch("http://192.168.1.134:3000/route", {
        method: 'POST',
        body: JSON.stringify({OR_latitude: or_latitude, OR_longitude: or_longitude, DT_latitude: dt_latitude, DT_longitude: dt_longitude}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(response => {
          console.log("upload succes", response);
          alert("Upload success!");
        })
        .catch(error => {
          console.log("upload error", error);
          alert("Upload failed!");
        });
  };


  return (
    <View >

      <Button title="CONFIRM"
        onPress={ConfirmRoute}
      ></Button>
      <MapView 
        provider={PROVIDER_GOOGLE}  
        style={styles.map} 
        region={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }} 
        mapType={"hybrid"}
        onMapReady={MapReady}>
        <MapView.Marker coordinate={coordinates[0]} />
        <MapView.Marker coordinate={coordinates[1]} />
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          strokeWidth={6}
          apikey={"AIzaSyCgagO8OAw1oMqd1rPlUncR9aluOHOAVIU"}
          strokeColor="blue"
          mode={"WALKING"}
          
        />
      </MapView>
    </View>
  );
}

const Stack = createStackNavigator();


export default class App extends Component{
 

  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Home'}}
          />
          
          <Stack.Screen name="MapOrigin" component={MapsScreenOrigin} />
          <Stack.Screen name="MapDest" component={MapsScreenDest} />
          <Stack.Screen name="Route" component={RouteScreen} />
          
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
