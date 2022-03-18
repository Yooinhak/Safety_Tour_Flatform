import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Text} from 'react-native'

const SK_API_KEY = 'l7xxa74a5d7d8724435da2db516737edde0d'

export default function SKService({locCode, region}) {
    const [covidInfo, setCovidInfo] = useState(
        {
            lDongCd: "4571040024",
            hh: "02",
            flowDensityPercentile: 3.9800000190734863,
            taxiDensityPercentile: 2.319999933242798,
            congestionPercentile: 11.640000343322754,
            contactDensityPercentile: 3.8399999141693115,
            x: 980999.681361,
            y: 1775924.4445290002,
            dt: "20220319"
        }
    )
    
    useEffect(() => {
        axios.get(`https://apis.openapi.sk.com/safecaster/v1/search/safetyindex/ldongcd/all/current?ldongCd=${locCode}`,{
            headers: {
                appKey : SK_API_KEY
            }
        }).then((response) => {
            setCovidInfo(response.data.data[0])
        }).catch((e) => {
            return <Text>loading...</Text>
        })
    }, [locCode, region])

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await axios.get(`https://apis.openapi.sk.com/safecaster/v1/search/safetyindex/ldongcd/all/current?ldongCd=${locCode}`,{
    //             headers: {
    //                 appKey : SK_API_KEY
    //             }
    //         })
    //         setCovidInfo(response.data.data[0])
    //     }
    //     fetchData()
    // }, [])

    return  <Text>{covidInfo.contactDensityPercentile}</Text>
}