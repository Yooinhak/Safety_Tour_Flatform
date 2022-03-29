import React, {useState, useEffect} from "react";
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import axios from 'axios'
import CommonView from "./Common/CommonView";
import CitySelector from "./CitySelector";
import TownSelector from "./TownSelector";

const SK_API_KEY = 'l7xxa74a5d7d8724435da2db516737edde0d'

function HomeMain({goTourPress, goLoginPress, currentLocal}) {

    const [ currentCity, setCity ] = useState("")
    const [ currentTown, setTown ] = useState("")
    const [ covidNum, setCovidNum] = useState({
        dailyConfirmedCnt: 0,
        totalConfirmedCnt: 0,
        baseDate: 20220101
    })

    const onChange = (value) => {
        setCity(value)
    }

    const onTownChange = (value) => {
        setTown(value)
        currentLocal.city = currentCity
        currentLocal.town = value
    }

    

    useEffect(() => {
        axios.get(`https://apis.openapi.sk.com/safecaster/v1/search/confirmed/new/all`,{
            headers: {
                appKey : SK_API_KEY
            }
        }).then((response) => {
            setCovidNum(response.data.data)
        }).catch((e) => {
            console.log(e)
        })
        return () => {
        }
    }, [])

    return (
        <SafeAreaView style={styles.holeContainer}>
            <CommonView />

            <View style={styles.mainContainer}> 
                <View style={styles.selectorContainer}>

                    <CitySelector onChange={onChange} />
                    <TownSelector currentCity={currentCity} onChange={onTownChange} />

                    <TouchableOpacity onPress={goTourPress} style={styles.btn}>
                        <Text>선택</Text>
                    </TouchableOpacity>

                    <View style={styles.line} />

                    <View style={styles.covidInfoContainer}>
                        <View style={styles.covidInfoTitle}>
                            <Text style={{fontSize: 15}}>국내 코로나19 현황</Text>
                            <Text style={{fontSize: 12}}>{covidNum.baseDate} 00:00 기준</Text>
                        </View>
                        <View style={styles.covidDetailInfo}>
                            <View style={styles.covidDetailInside}>
                                <Text style={styles.covidTitleFont}>일일 확진자수</Text>
                                <Text style={styles.covidFont}>{covidNum.dailyConfirmedCnt.toLocaleString('ko-KR')}</Text>
                            </View>
                            <View style={styles.verticalLine} />
                            <View style={styles.covidDetailInside}>
                                <Text style={styles.covidTitleFont}>누적 확진자수</Text>
                                <Text style={styles.covidFont}>{covidNum.totalConfirmedCnt.toLocaleString('ko-KR')}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

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
        justifyContent: 'center'
    },
    selectorContainer: {
        alignItems: "center",
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
        marginVertical: 50,
        borderColor: 'rgba(0,0,0,0.5)'
    },
    covidInfoContainer: {
        marginTop: 30,
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        padding: 9
    },
    covidInfoTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    covidDetailInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 17
    },
    verticalLine: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)'
    },
    covidTitleFont: {
        fontSize: 15,
        color: 'rgba(0,0,0,0.5)'
    },
    covidFont: {
        fontWeight: 'bold',
        fontSize: 23,
        marginTop: 3
    },
    covidDetailInside: {
        alignItems: 'center'
    }
})

export default HomeMain