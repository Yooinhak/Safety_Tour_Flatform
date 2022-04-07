import React, {useState, useEffect} from 'react'
import {
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import CommonView from './Common/CommonView'
import axios from 'axios'

function TourListSetting({currentLocal, navigation, currentUser}) {
  const [lists, setLists] = useState([])

  const onTourPress = id => {
    navigation.navigate('EachTour', {id: id, currentUser: currentUser})
  }

  useEffect(() => {
    async function fetchData() {
      const result = await axios.post('http://3.38.244.119:3000/tour', {
        city: currentLocal.city,
        town: currentLocal.town,
      })
      setLists(result.data.tour)
    }
    fetchData()
  }, [currentLocal])

  return (
    <ScrollView style={styles.mainContainer}>
      {lists.map(list => (
        <TouchableOpacity
          key={list.id}
          style={styles.btn}
          onPress={() => onTourPress(list.id)}>
          <Text>{list.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

function TourList({currentLocal, navigation, currentUser}) {
  return (
    <SafeAreaView style={styles.holeContainer}>
      <CommonView />

      <TourListSetting
        currentLocal={currentLocal}
        navigation={navigation}
        currentUser={currentUser}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('loginHome', currentUser)
        }}
        style={styles.goHomeBtn}>
        <Text>홈</Text>
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
  },
  btn: {
    borderWidth: 1,
    borderColor: '#000000',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goHomeBtn: {
    position: 'absolute',
    left: 5,
    bottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: 'skyblue',
  },
})

export default TourList
