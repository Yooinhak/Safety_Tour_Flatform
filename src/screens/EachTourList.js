import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native'
import axios from 'axios'
import CommonView from './Common/CommonView'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import KakaoService from './Service/KakaoService'
import SKService from './Service/SkService'
import ModalScreen from './ModalScreen'

function LikeOn({id, currentUser}) {
  const [likeOn, setLikeOn] = useState('heart-outline')

  useEffect(() => {
    setLikeOn('heart-outline')
    axios
      .get(`http://13.125.77.122:3000/like/`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
      .then(response => {
        response.data.getLikes.map(function (like) {
          like.tour.id == id && setLikeOn('heart')
        })
      })
      .catch(e => {
        console.log(e)
      })
    return () => {}
  }, [id])

  const onClick = () => {
    if (likeOn == 'heart-outline') {
      axios
        .get(`http://13.125.77.122:3000/like/${id}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        })
        .then(() => {
          setLikeOn('heart')
          Alert.alert('즐겨찾기에 등록되었습니다.')
        })
        .catch(e => {
          console.log(e)
        })
    } else {
      axios
        .delete(`http://13.125.77.122:3000/like/${id}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        })
        .then(() => {
          setLikeOn('heart-outline')
          Alert.alert('즐겨찾기를 해제하였습니다.')
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  return (
    <TouchableOpacity onPress={onClick} style={{marginLeft: 30}}>
      <View style={styles.completeCircle}>
        <Icon name={likeOn} size={30} color="#e71c47" />
      </View>
    </TouchableOpacity>
  )
}

function CommentFc({
  item = [],
  id,
  currentUser,
  onCreateComment,
  onDeleteComment,
}) {
  const [currentComment, setCurrentComment] = useState('')

  const onChange = e => {
    setCurrentComment(e)
  }

  const onCreatePress = () => {
    onCreateComment(currentComment)
    setCurrentComment('')
  }

  function LoadComment({list}) {
    return (
      <View style={styles.eachCommentContainer}>
        <Text>{list.comment}</Text>
        <TouchableOpacity
          onPress={() => onDeleteComment(list.id)}
          style={{right: 10, position: 'absolute'}}>
          <View style={styles.completeCircle}>
            <Icon name="close" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.commentContainer}>
      <Text>Comment</Text>

      {item.map(list => (
        <LoadComment key={list.id} list={list} />
      ))}

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={e => onChange(e)}
          style={styles.input}
          placeholder="댓글을 입력해주세요."
          value={currentComment}
        />
        <TouchableOpacity onPress={onCreatePress} style={{marginLeft: 10}}>
          <View style={styles.completeCircle}>
            <Icon name="enter" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function EachTourList({navigation, id, currentUser}) {
  const [item, setItem] = useState({})
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [modalOn, setModalOn] = useState(false)
  const [mapOn, setMapOn] = useState(false)
  const [commentList, setCommentList] = useState([])

  const onModal = () => {
    setModalOn(true)
  }

  const offModal = () => {
    setModalOn(false)
  }

  const onMapOn = () => {
    setMapOn(!mapOn)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://13.125.77.122:3000/tour/${id}`)
      setItem(response.data.tourDetail)
      setCommentList(response.data.tourDetail.comments)
      setRegion({
        latitude: response.data.tourDetail.geo_x,
        longitude: response.data.tourDetail.geo_y,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    }
    fetchData()
  }, [id])

  const onCreateComment = currentComment => {
    if (currentComment == '') {
      Alert.alert('댓글을 입력해주세요.')
    } else {
      axios
        .post(
          `http://13.125.77.122:3000/comment`,
          {
            tid: id,
            comment: currentComment,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          },
        )
        .then(response => {
          setCommentList([...commentList, response.data.comment])
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  const onDeleteComment = commentId => {
    axios
      .delete(`http://13.125.77.122:3000/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
      .then(() => {
        Alert.alert('댓글이 삭제되었습니다.')
        setCommentList(commentList.filter(item => item.id !== commentId))
      })
      .catch(e => {
        Alert.alert(e.response.data.message)
      })
  }

  useEffect(() => {
    return () => setModalOn(false)
  }, [])

  return (
    <>
      <SafeAreaView style={styles.holeContainer}>
        <CommonView />

        <ScrollView style={styles.mainContainer}>
          <View style={styles.eachBox}>
            <Text style={styles.eachText}>{item.name}</Text>
            <LikeOn id={id} currentUser={currentUser} />
          </View>
          <View style={styles.eachBox}>
            <Text style={styles.eachText}>정보 : {item.info}</Text>
          </View>
          <View style={styles.eachBox}>
            <Text style={styles.eachText}> 시설 정보 : {item.facilities}</Text>
          </View>
          <SKService
            locCode={KakaoService(item.geo_y, item.geo_x)}
            region={region}
            onModal={onModal}
          />

          <View style={styles.MapViewContainer}>
            <TouchableOpacity style={styles.clickBox} onPress={onMapOn}>
              <Text>지도 보기</Text>
            </TouchableOpacity>
            {mapOn ? (
              <MapView
                initialRegion={region}
                style={{flex: 1}}
                provider={PROVIDER_GOOGLE}
                region={region}
                rotateEnabled={false}>
                <Marker coordinate={region} />
              </MapView>
            ) : (
              <></>
            )}
            <Text> {item.addressDetail}</Text>
          </View>

          <CommentFc
            onCreateComment={onCreateComment}
            item={commentList}
            id={id}
            currentUser={currentUser}
            onDeleteComment={onDeleteComment}
          />
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            setMapOn(false)
            navigation.navigate('loginHome', currentUser)
          }}
          style={styles.goHomeBtn}>
          <Text>홈</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {modalOn ? <ModalScreen offModal={offModal} /> : <></>}
    </>
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
  MapViewContainer: {
    // width: "90%",
    height: 150,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e4baba',
  },
  eachBox: {
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderColor: '#e4baba',
    flexDirection: 'row',
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
  btn: {
    borderWidth: 1,
    borderColor: '#000000',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eachText: {
    fontSize: 20,
  },
  clickBox: {
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    width: '18%',
  },
  commentContainer: {
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: '#e4baba',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    height: 36,
    width: '80%',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eachCommentContainer: {
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
})

export default EachTourList
