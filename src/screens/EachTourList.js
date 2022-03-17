import React, {useState, useEffect} from "react";
import {  Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import CommonView from "./Common/CommonView";

function EachTourList ({navigation, id}) {

    const [item, setItem] = useState({})

    useEffect(() => {
        
        axios.get(`http://13.125.33.210:3000/tour/${id}`)
        .then((response) => {
            setItem(response.data.tourDetail)
        })
        .catch((error) => console.log(error.response.data))
    }, [])
    
    return (
        <SafeAreaView style={styles.holeContainer}>
            <CommonView />

            <ScrollView style={styles.mainContainer}>
                <Text>{item.name}</Text>
                <Text>관광지 정보 : {item.info}</Text>
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