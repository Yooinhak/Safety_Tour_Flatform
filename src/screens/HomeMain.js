import React, {useState} from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native'
import CommonView from "./Common/CommonView";
import CitySelector from "./CitySelector";
import TownSelector from "./TownSelector";

function HomeMain({goTourPress, goLoginPress}) {

    const [ currentCity, setCity ] = useState("")
    const [ currentTown, setTown ] = useState("")

    const onChange = (value) => {
        setCity(value)
    }

    const onTownChange = (value) => {
        setTown(value)
    }

    return (
        <SafeAreaView style={styles.holeContainer}>
            <CommonView />

            <ScrollView style={styles.mainContainer}> 
                <View style={styles.selectorContainer}>

                    <CitySelector onChange={onChange} />
                    <TownSelector currentCity={currentCity} onChange={onTownChange} />

                    <TouchableOpacity onPress={goTourPress} style={styles.btn}>
                        <Text>선택</Text>
                    </TouchableOpacity>

                    <View style={styles.line} />
                </View>
            </ScrollView>

            <TouchableOpacity
                onPress={goLoginPress}
                style={styles.loginBtn}
            >
                <Text>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    holeContainer: {
        backgroundColor: '#e1f0e7',
        height: '100%',
    },
    mainContainer: {
        backgroundColor: '#ffffff',
        height: '85%',
        width: '90%',
        marginLeft: '5%',
    },
    selectorContainer: {
        marginVertical: "5%",
        alignItems: "center"
    },
    btn: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#e1f0e7'
    },
    loginBtn: {
        position: 'absolute',
        left: 5,
        bottom: 40,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: 'skyblue'
    },
    line: {
        width: "80%",
        height: "1%",
        borderBottomWidth: 1,
        marginTop: 15
    }
})

export default HomeMain