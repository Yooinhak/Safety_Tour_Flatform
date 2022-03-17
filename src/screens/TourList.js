import React, {useState ,useEffect} from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import CommonView from "./Common/CommonView";
import axios from "axios";

function TourListSetting({currentLocal, navigation }) {

    const [lists, setLists] = useState([])

    const onTourPress = (id) => {
        navigation.navigate("EachTour", id = {id})
    }

    useEffect(() => {
        
        axios.post("http://13.125.33.210:3000/tour", {
            "city": currentLocal.city,
            "town": currentLocal.town
        })
        .then((response) => {
            setLists(response.data.tour)
        })
        .catch((error) => console.log(error.response.data))
    }, [])

    return (
        <ScrollView style={styles.mainContainer}>


            {lists.map( list => (
                <TouchableOpacity 
                    key={list.id} 
                    style={styles.btn}
                    onPress={() => onTourPress(list.id)}
                >
                    <Text>{list.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )

}

function TourList({ currentLocal, navigation }) {

    return (
        <SafeAreaView style={styles.holeContainer}>
            <CommonView />

            <TourListSetting 
                currentLocal={currentLocal}
                navigation={navigation}
            />

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
        backgroundColor: '#ffffff',
        height: '85%',
        width: '90%',
        marginLeft: '5%',
    },
    btn: {
        borderWidth: 1,
        borderColor: "#000000",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    goHomeBtn: {
        position: 'absolute',
        left: 5,
        bottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: 'skyblue'
    }
})

export default TourList
