import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import Geolocation from '@react-native-community/geolocation'

const KAKAO_API_KEY = '87bb3dde6f868e35e0a4f64884ba2c87'

const GeoLocationAPI = ({currentUser, navigation}) => {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [addressName, setAddressName] = useState(null)
  const [lists, setLists] = useState()

  useEffect(() => {
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
  }, [])

  const getAddressName = () => {
    axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: 'KakaoAK ' + KAKAO_API_KEY,
          },
        },
      )
      .then(response => {
        const fullAddress = response.data.documents[0].address_name.split(' ')
        setAddressName(fullAddress[0] + ' ' + fullAddress[1])
      })
  }

  const getTourList = () => {
    const address = addressName.split(' ')
    axios
      .post(`http://13.125.77.122:3000/tour`, {
        city: address[0],
        town: address[1],
      })
      .then(response => {
        setLists(response.data.tour)
      })
  }

  return (
    <View style={styles.holeContainer}>
      <View style={styles.locationBox}>
        <Text style={{fontSize: 20, marginRight: 10}}>현재 위치</Text>
        <TouchableOpacity onPress={getAddressName}>
          <Icon name={'refresh-circle-outline'} size={30} />
        </TouchableOpacity>
      </View>
      {addressName ? (
        <View style={styles.locationInfoContainer}>
          <View style={styles.locationText}>
            <Text style={{fontSize: 15}}>{addressName}</Text>
          </View>
          <TouchableOpacity onPress={getTourList} style={styles.searchBtn}>
            <Text>검색</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>위치 정보 없음.</Text>
      )}
      {lists ? (
        <ScrollView style={styles.listContainer}>
          {lists.map(list => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EachTour', {
                  id: list.id,
                  currentUser: currentUser,
                })
              }
              key={list.id}
              style={styles.eachList}>
              <Text style={{fontSize: 18}}>{list.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  holeContainer: {
    alignItems: 'center',
  },
  locationBox: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  locationText: {
    borderWidth: 1,
    padding: 3,
    borderRadius: 10,
    marginRight: 10,
  },
  locationInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBtn: {
    alignItems: 'center',
    padding: 3,
    borderRadius: 20,
    backgroundColor: '#e1f0e7',
    padding: 7,
  },
  listContainer: {
    borderWidth: 1,
    padding: 5,
    width: '90%',
    marginTop: 5,
    height: '12%',
  },
  eachList: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 3,
    padding: 3,
  },
})

export default GeoLocationAPI
