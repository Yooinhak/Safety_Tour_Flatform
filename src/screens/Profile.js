import React from 'react'
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

function Profile({navigation, currentUser}) {
  const goLoginHomePress = () => {
    navigation.navigate('loginHome', currentUser)
  }

  return (
    <SafeAreaView style={styles.holeContainer}>
      <View>
        <Text style={styles.text}>이메일 : {currentUser.resUser.email}</Text>
        <Text style={styles.text}>이름 : {currentUser.resUser.name}</Text>
      </View>

      <TouchableOpacity onPress={goLoginHomePress} style={styles.goHomeBtn}>
        <Text>뒤로가기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  holeContainer: {
    backgroundColor: '#e1f0e7',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goHomeBtn: {
    position: 'absolute',
    left: 5,
    bottom: 40,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: 'skyblue',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 20,
  },
})

export default Profile
