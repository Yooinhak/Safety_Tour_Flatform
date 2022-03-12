import React from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import CommonView from "./Common/CommonView";

function TourList({goHomePress}) {
    return (
        <SafeAreaView style={styles.holeContainer}>
            <CommonView />

            <ScrollView style={styles.mainContainer}>
                <TouchableOpacity
                    style={styles.btn}
                >
                    <Text>이곳을 누르세요</Text>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity onPress={goHomePress} style={styles.goHomeBtn}>
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
