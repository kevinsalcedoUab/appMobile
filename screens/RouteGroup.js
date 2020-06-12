import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import {socket, group, client} from './Home';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
class RouteGroup extends Component {
    constructor(props){
        super(props);
        
    }

    render(){
        const or_latitude =  parseFloat(JSON.stringify(group.ROUTE[0]));
        const or_longitude =  parseFloat(JSON.stringify(group.ROUTE[1]));
        const dt_latitude =  parseFloat(JSON.stringify(group.ROUTE[2]));
        const dt_longitude = parseFloat(JSON.stringify(group.ROUTE[3]));
  
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

        return (
            <View >
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
                    strokeColor="pink"
                    mode={"WALKING"}

                    />
                </MapView>
            </View>
        );
    };
};

export default RouteGroup;