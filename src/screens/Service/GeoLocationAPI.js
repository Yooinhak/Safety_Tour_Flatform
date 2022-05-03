import React, {useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Geolocation from '@react-native-community/geolocation'

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
