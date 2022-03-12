import React from "react";
import {  View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";


function LoginScreen({goHomePress}) {
    return (

        <SafeAreaView style={styles.holeContainer}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    placeholder="password"
                />
            </View>

            <TouchableOpacity style={styles.loginBtn}>
                <Text>로그인</Text>
            </TouchableOpacity>

            <View style={styles.modifyView}>
                <TouchableOpacity>
                    <Text style={styles.fontModify}>회원가입</Text>
                </TouchableOpacity>
                <View style={styles.searchView}>
                    <TouchableOpacity>
                        <Text style={styles.fontModify}>아이디 찾기</Text>
                    </TouchableOpacity>
                    <View style={styles.sep}/>
                    <TouchableOpacity>
                        <Text style={styles.fontModify}>비밀번호 찾기</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity onPress={goHomePress} style={styles.goHomeBtn}>
                <Text>홈</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    holeContainer: {
        backgroundColor: '#e1f0e7',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    goHomeBtn: {
        position: 'absolute',
        left: 5,
        bottom: 40,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: 'skyblue'
    },
    loginBtn: {
        paddingVertical: 8,
        paddingHorizontal: 107,
        borderRadius: 7,
        backgroundColor: "rgba(252, 255, 176, 0.6)"
    },
    modifyView: {
        alignItems: "center",
        marginVertical: 10,
    },
    searchView: {
        marginVertical: 10,
        flexDirection: "row"
    },
    fontModify: {
        fontSize: 13
    },
    sep: {
        height: 17,
        width: 2,
        marginHorizontal: 5,
        backgroundColor: "rgba(0,0,0,0.5)"
    }
})

export default LoginScreen