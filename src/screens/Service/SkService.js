import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native'

const SK_API_KEY = 'l7xxa74a5d7d8724435da2db516737edde0d'

function DensityEmotion({dt}) {
  if (dt <= 30) {
    return <Image style={styles.logo} source={require('./image/great.png')} />
  } else if (dt <= 60) {
    return <Image style={styles.logo} source={require('./image/soso.png')} />
  } else if (dt <= 80) {
    return <Image style={styles.logo} source={require('./image/notGood.png')} />
  } else {
    return <Image style={styles.logo} source={require('./image/bad.png')} />
  }
}

export default function SKService({locCode = 4571040024, region, onModal}) {
  const [covidInfo, setCovidInfo] = useState({
    lDongCd: '4571040024',
    hh: '02',
    flowDensityPercentile: 3.9800000190734863,
    taxiDensityPercentile: 2.319999933242798,
    congestionPercentile: 11.640000343322754,
    contactDensityPercentile: 3.8399999141693115,
    x: 980999.681361,
    y: 1775924.4445290002,
    dt: '20220319',
  })

  useEffect(() => {
    axios
      .get(
        `https://apis.openapi.sk.com/safecaster/v1/search/safetyindex/ldongcd/all/current?ldongCd=${locCode}`,
        {
          headers: {
            appKey: SK_API_KEY,
          },
        },
      )
      .then(response => {
        setCovidInfo(response.data.data[0])
      })
      .catch(e => {
        console.log(e)
      })
  }, [locCode])

  useEffect(() => {
    return () => {
      setCovidInfo({})
    }
  }, [])

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
  // }, [locCode, region])

  const str = covidInfo.dt

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>
          {str.substr(4, 2)}월 {str.substr(6, 2)}일{' '}
        </Text>
        <Text>{covidInfo.hh}시 기준</Text>
      </View>
      <View style={styles.imageContainer}>
        <DensityEmotion dt={covidInfo.contactDensityPercentile} />
        <Text>
          현재 코로나 안전 수치는{' '}
          {Math.ceil(covidInfo.contactDensityPercentile)}
        </Text>
      </View>
      <View style={styles.densityInfoContainer}>
        <Text style={{color: 'rgba(0,0,0,0.5)'}}>코로나 안전 수치란?</Text>
        <TouchableOpacity onPress={onModal} style={styles.clickBox}>
          <Text style={{color: 'rgba(0,0,0,0.5)'}}>Click here!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    borderColor: '#e4baba',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
  },
  densityInfoContainer: {
    flexDirection: 'row',
  },
  clickBox: {
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  logo: {
    width: 100,
    height: 100,
  },
})
