import React, {useState, useEffect} from "react";
import {  View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import CommonView from "./Common/CommonView";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import KakaoService from "./Service/KakaoService"
import SKService from "./Service/SkService"
import ModalScreen from "./ModalScreen"

function EachTourList ({navigation, id}) {

    const [item, setItem] = useState({})
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [modalOn, setModalOn] = useState(false)
    const [mapOn, setMapOn] = useState(false)

    const onModal = () => {
        setModalOn(true)
    }

    const offModal = () => {
        setModalOn(false)
    }

    const onMapOn = () => {
        setMapOn(!mapOn)
    }

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://13.125.33.210:3000/tour/${id}`)
            setItem(response.data.tourDetail)
            setRegion({
                latitude: response.data.tourDetail.geo_x,
                longitude: response.data.tourDetail.geo_y,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
        }
        fetchData()
    }, [id])

    useEffect(() => {
        return () => setModalOn(false)
    }, [])


    
    return (
        <>
        <SafeAreaView style={styles.holeContainer}>

            <CommonView />

            <ScrollView style={styles.mainContainer}>
                <View style={styles.eachBox}>
                    <Text style={styles.eachText}>{item.name}</Text>
                </View>
                <View style={styles.eachBox}>
                    <Text style={styles.eachText}>정보 : {item.info}</Text>
                </View>
                <View style={styles.eachBox}>
                    <Text style={styles.eachText}> 시설 정보 : {item.facilities}</Text>
                </View>
                <SKService 
                    locCode={KakaoService(item.geo_y, item.geo_x)}
                    region={region} 
                    onModal={onModal}
                />
            
                <View style={styles.MapViewContainer}> 
                    <TouchableOpacity style={styles.clickBox} onPress={onMapOn}>
                        <Text>지도 보기</Text>
                    </TouchableOpacity>
                    {mapOn ? <MapView
                        initialRegion={region}
                        style={{ flex: 1 }}
                        provider={PROVIDER_GOOGLE} 
                        region={region}
                        rotateEnabled={false}
                    >
                    <Marker coordinate={region} />
                    </MapView> : <></>}
                    <Text> {item.addressDetail}</Text>
                </View> 


            </ScrollView>

            <TouchableOpacity 
                onPress={() => {
                    setMapOn(false)
                    navigation.navigate("Home")
                }}
                style={styles.goHomeBtn}
            >
                <Text>홈</Text>
            </TouchableOpacity>
        </SafeAreaView>
        {modalOn ? <ModalScreen offModal={offModal} /> : <></>}
        </>
    )
}

const styles = StyleSheet.create({
    holeContainer: {
        backgroundColor: '#e1f0e7',
        height: '100%'
    },
    mainContainer: {
        backgroundColor: '#ffffff',
        height: '85%',
        width: '90%',
        marginLeft: '5%',
    },
    MapViewContainer: {
        // width: "90%",
        height: 150, 
        marginVertical: 5,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#e4baba',
    },
    eachBox: {
        borderWidth: 1,
        marginHorizontal: 5,
        marginVertical: 5,
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        borderColor: '#e4baba'
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
    eachText: {
        fontSize: 20,
    },
    clickBox: {
        borderWidth: 1,
        marginHorizontal: 5,
        borderRadius: 5,
        width: "18%"
    }
})

export default EachTourList