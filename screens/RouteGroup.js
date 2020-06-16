import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput, PermissionsAndroid, Image} from 'react-native';
import {socket, group, client} from './Home';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';


class RouteGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            region: {
                latitude: 0,
                longitude: 0, 
                latitudeDelta: 0, 
                longitudeDelta: 0
            }, 
        }
    }
    
    calcDelta(lat, lon){
        const latDelta = 0.015;
        const lonDelta = 0.0121;
        
        this.setState({
            region: {
                latitude: lat,
                longitude: lon, 
                latitudeDelta: latDelta, 
                longitudeDelta: lonDelta

            }
        })
    }

    componentDidMount(){
        
        Geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude);
            var long = parseFloat(position.coords.longitude);
            console.log("LA POSICCION lat: ", lat);
            console.log("LA POSICCION long: ", long);
            
            this.calcDelta(lat, long);

        }, (error) => alert(JSON.stringify(error)), {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        ) 
        
    }

    marker(){
        return{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude

        }
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
                    initialRegion={this.state.region} 
                    mapType={"hybrid"}
                    onMapReady={MapReady}>
                    <MapView.Marker coordinate={coordinates[0]} />
                    <MapView.Marker coordinate={coordinates[1]} />
                    <MapView.Marker coordinate={this.marker()}>
                        <Image source = {require('../assets/marker5.png')} style={{height: 35, width:35 }}/>
                    </MapView.Marker>
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
    };
};

export default RouteGroup;