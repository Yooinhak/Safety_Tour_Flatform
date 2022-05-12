import React, {useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Geolocation from '@react-native-community/geolocation'

const KAKAO_API_KEY = '87bb3dde6f868e35e0a4f64884ba2c87'

function GetAddress(x, y) {
  axios
    .get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
      {
        headers: {
          Authorization: 'KakaoAK ' + KAKAO_API_KEY,
        },
      },
    )
    .then(response => {
      response.data.documents.map(doc => {
        if (doc.region_type === 'B') {
          setLocCode(doc.code)
        }
      })
    })
    .catch(
      e => {
        console.log(e)
        return 4571040024
      },
      [x, y],
    )

  return locCode
}

const GeoLocationAPI = ({}) => {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  const geoLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude)
        const longitude = JSON.stringify(position.coords.longitude)

        setLatitude(latitude)
        setLongitude(longitude)
      },
      error => {
        console.log(error.code, error.message)
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    )
  }
  return (
    <View>
      <Text> latitude: {latitude} </Text>
      <Text> longitude: {longitude} </Text>
      <TouchableOpacity onPress={() => geoLocation()}>
        <Text> Get GeoLocation </Text>
      </TouchableOpacity>
    </View>
  )
}

export default GeoLocationAPI
