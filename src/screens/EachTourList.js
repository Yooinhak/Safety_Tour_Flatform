import React, {useState, useEffect} from "react";
import {  View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import CommonView from "./Common/CommonView";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'


function EachTourList ({navigation, id}) {

    const [item, setItem] = useState({})
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    useEffect(() => {
        
        axios.get(`http://13.125.33.210:3000/tour/${id}`)
        .then((response) => {
            setItem(response.data.tourDetail)
            setRegion({
                latitude: response.data.tourDetail.geo_x,
                longitude: response.data.tourDetail.geo_y,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
        })
        .catch((error) => console.log(error.response.data))
    },[id])
    
    return (
        <SafeAreaView style={styles.holeContainer}>

            <CommonView />

            <ScrollView style={styles.mainContainer}>

                <Text>{item.name}</Text>
                <Text>관광지 정보 : {item.info}</Text>

                <View style={{ width: "90%", height: 300, marginLeft: "5%", marginVertical: "5%" }}> 
                    <MapView 
                        style={{ flex: 1 }} 
                        provider={PROVIDER_GOOGLE} 
                        region={region}
                    > 
                    <Marker coordinate={region} />
                    </MapView>
                </View>


            </ScrollView>

            <TouchableOpacity 
                onPress={() => {
                    navigation.navigate("Home")
                }} 
                style={styles.goHomeBtn}
            >
                <Text>홈</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    holeContainer: {
        backgroundColor: '#e1f0e7',
        height: '100%'
    },
    goHomeBtn: {
        position: 'absolute',
        left: 5,
        bottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: 'skyblue'
    },
    mainContainer: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        height: '85%',
        width: '90%',
        marginLeft: '5%'
    },
    btn: {
        borderWidth: 1,
        borderColor: "#000000",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default EachTourList