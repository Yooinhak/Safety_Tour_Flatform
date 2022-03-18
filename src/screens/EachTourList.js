import React, {useState, useEffect} from "react";
import {  View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import CommonView from "./Common/CommonView";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import KakaoService from "./Service/KakaoService"

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

    const locCode = KakaoService(item.geo_y, item.geo_x)
    
    return (
        <SafeAreaView style={styles.holeContainer}>

            <CommonView />

            <ScrollView style={styles.mainContainer}>

                <Text>{item.name}</Text>
                <Text>관광지 정보 : {item.info}</Text>
                <Text>주소 : {item.address}</Text>
                <Text>{locCode}</Text>

                <View style={styles.MapViewContainer}> 
                    <MapView 
                        style={{ flex: 1 }} 
                        provider={PROVIDER_GOOGLE} 
                        region={region}
                        rotateEnabled={false}
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
    mainContainer: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        height: '85%',
        width: '90%',
        marginLeft: '5%'
    },
    MapViewContainer: {
        width: "90%",
        height: 150, 
        marginLeft: "5%", 
        marginVertical: "5%"
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
    btn: {
        borderWidth: 1,
        borderColor: "#000000",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default EachTourList