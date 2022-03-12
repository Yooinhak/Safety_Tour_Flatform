import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import RNPickerSelect from "react-native-picker-select";
import TouchHistoryMath from "react-native/Libraries/Interaction/TouchHistoryMath";
import CommonView from "./Common/CommonView";

function HomeMain({goTourPress, goLoginPress}) {
    return (
        <SafeAreaView style={styles.holeContainer}>
            <CommonView />

            <ScrollView style={styles.mainContainer}> 
                <View style={styles.selectorContainer}>
                    <View style={styles.eachSelector}>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 18, 
                            color: "#e3afb0", 
                            width: "20%"
                            }}>시/도
                        </Text>
                        <RNPickerSelect
                            onValueChange={value => console.log(value)}
                            style={pickerSelectStyles}
                            items={[
                                {label: "서울특별시", value: "서울"},
                                {label: "경기도", value: "경기"}
                            ]}
                        />
                    </View>
                    <View style={styles.eachSelector}>
                        <Text style={{
                            textAlign: "center", 
                            fontSize: 18, 
                            color: "#d2de95", 
                            width: "20%"
                            }}>시/군/구
                        </Text>
                        <RNPickerSelect
                            onValueChange={value => console.log(value)}
                            style={pickerSelectStyles}
                            items={[
                                {label: "서울특별시", value: "서울"},
                                {label: "경기도", value: "경기"}
                            ]}
                        />
                    </View>
                    <TouchableOpacity 
                        onPress={goTourPress}
                        style={styles.btn}
                    >
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
        height: '100%'
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
    eachSelector: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: "5%",
    },
    line: {
        width: "80%",
        height: "1%",
        borderBottomWidth: 1,
        marginTop: 15
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
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        height: 50, 
        width: 200, 
        color: '#000000',
        borderColor: '#000000', 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10,
        marginLeft: 10
    },
    inputAndroid: {
        fontSize: 16,
        height: 50, 
        width: 200, 
        color: '#000000',
        borderColor: '#000000', 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10
    }
});

export default HomeMain