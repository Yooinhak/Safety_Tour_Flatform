import React from "react";
import {  Text, SafeAreaView, StyleSheet, Pressable, ScrollView, TouchableOpacity } from "react-native";
import CommonView from "./Common/CommonView";

function Settings({goHomePress}) {
    return (
        <SafeAreaView style={styles.holeContainer}>
            <CommonView />

            <ScrollView style={styles.mainContainer}>
                <Text>Settings View</Text>
            </ScrollView>
            <Pressable onPress={goHomePress} style={styles.goHomeBtn}>
                <Text>홈</Text>
            </Pressable>
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

export default Settings