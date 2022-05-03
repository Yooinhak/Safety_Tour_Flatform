import React, {useState, useEffect} from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import axios from 'axios'
import CommonView from './Common/CommonView'
import CitySelector from './CitySelector'
import TownSelector from './TownSelector'
import GeoLocationAPI from './Service/GeoLocationAPI'

const SK_API_KEY = 'l7xxa74a5d7d8724435da2db516737edde0d'

function LikeList({navigation, currentUser}) {
  const [likesList, setLikesList] = useState([])

  useEffect(() => {
    axios
      .get(`http://13.125.77.122:3000/like/`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
      .then(response => {
        setLikesList(response.data.getLikes)
      })
      .catch(e => {
        console.log(e)
      })
    return () => {}
  }, [currentUser])

  const goLikeTour = list => {
    navigation.navigate('EachTour', {
      id: list.tour.id,
      currentUser: currentUser,
    })
  }

  return (
    <>
      {likesList.map(list => (
        <TouchableOpacity
          onPress={() => goLikeTour(list)}
          key={list.tour.id}
          style={styles.likeBtn}>
          <Text>
            {list.tour.name} ({list.tour.providerName})
          </Text>
        </TouchableOpacity>
      ))}
    </>
  )
}

function HomeMain({navigation, currentLocal, currentUser}) {
  const [currentCity, setCity] = useState('')
  const [currentTown, setTown] = useState('')
  const [covidNum, setCovidNum] = useState({
    dailyConfirmedCnt: 0,
    totalConfirmedCnt: 0,
    baseDate: 20220101,
  })

  const onChange = value => {
    setCity(value)
  }

  const onTownChange = value => {
    setTown(value)
    currentLocal.city = currentCity
    currentLocal.town = value
  }

  const goTourPress = () => {
    if (currentUser.user !== 'success') {
      Alert.alert('로그인을 먼저 해주세요.')
    } else {
      navigation.navigate('TourS', currentUser)
    }
  }

  const goLoginPress = () => {
    navigation.navigate('login')
  }

  const goProfilePress = () => {
    navigation.navigate('profile', currentUser)
  }

  useEffect(() => {
    axios
      .get(
        `https://apis.openapi.sk.com/safecaster/v1/search/confirmed/new/all`,
        {
          headers: {
            appKey: SK_API_KEY,
          },
        },
      )
      .then(response => {
        setCovidNum(response.data.data)
      })
      .catch(e => {
        console.log(e)
      })
    return () => {}
  }, [])

  return (
    <SafeAreaView style={styles.holeContainer}>
      <CommonView />

      <ScrollView style={styles.mainContainer}>
        <View style={styles.selectorContainer}>
          <CitySelector onChange={onChange} />
          <TownSelector currentCity={currentCity} onChange={onTownChange} />

          <TouchableOpacity onPress={goTourPress} style={styles.btn}>
            <Text>선택</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        <GeoLocationAPI />

        <View style={styles.line} />

        {currentUser.user == 'success' ? (
          <>
            <View style={styles.favoritesContainer}>
              <Text style={{marginLeft: '3%'}}>즐겨찾는 관광지</Text>
              <LikeList navigation={navigation} currentUser={currentUser} />
            </View>

            <View style={styles.line} />
          </>
        ) : (
          <></>
        )}

        <View style={styles.covidInfoContainer}>
          <View style={styles.covidInfoTitle}>
            <Text style={{fontSize: 15}}>국내 코로나19 현황</Text>
            <Text style={{fontSize: 12}}>{covidNum.baseDate} 00:00 기준</Text>
          </View>
          <View style={styles.covidDetailInfo}>
            <View style={styles.covidDetailInside}>
              <Text style={styles.covidTitleFont}>일일 확진자수</Text>
              <Text style={styles.covidFont}>
                {covidNum.dailyConfirmedCnt.toLocaleString('ko-KR')}
              </Text>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.covidDetailInside}>
              <Text style={styles.covidTitleFont}>누적 확진자수</Text>
              <Text style={styles.covidFont}>
                {covidNum.totalConfirmedCnt.toLocaleString('ko-KR')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.line} />
      </ScrollView>

      {currentUser.user !== 'success' ? (
        <TouchableOpacity onPress={goLoginPress} style={styles.loginBtn}>
          <Text>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={goProfilePress} style={styles.loginBtn}>
          <Text>회원정보</Text>
        </TouchableOpacity>
      )}
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
    width: '90%',
    marginLeft: '5%',
  },
  selectorContainer: {
    alignItems: 'center',
    marginTop: '15%',
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#e1f0e7',
  },
  loginBtn: {
    position: 'absolute',
    left: 5,
    bottom: 40,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: 'skyblue',
  },
  line: {
    width: '100%',
    height: '1%',
    borderBottomWidth: 1,
    marginVertical: '10%',
    borderColor: 'rgba(0,0,0,0.5)',
  },
  covidInfoContainer: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 9,
    marginLeft: '5%',
  },
  covidInfoTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  covidDetailInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 17,
  },
  verticalLine: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  covidTitleFont: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.5)',
  },
  covidFont: {
    fontWeight: 'bold',
    fontSize: 23,
    marginTop: 3,
  },
  covidDetailInside: {
    alignItems: 'center',
  },
  likeBtn: {
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
    marginTop: '3%',
  },
})

export default HomeMain
