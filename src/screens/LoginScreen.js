import axios from 'axios'
import React, {useState} from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'

function LoginScreen({navigation}) {
  const [inputUser, setInputUser] = useState({
    email: '',
    passwd: '',
  })

  const {email, passwd} = inputUser

  const goHomePress = () => {
    navigation.navigate('Home')
  }

  const goSignUpPress = () => {
    navigation.navigate('signUp')
  }

  const onChange = (keyValue, e) => {
    const {text} = e.nativeEvent
    setInputUser({
      ...inputUser,
      [keyValue]: text,
    })
  }

  const handleLogin = async () => {
    await axios
      .post('http://3.38.244.119:3000/auth/login', {
        email: inputUser.email,
        passwd: inputUser.passwd,
      })
      .then(response => {
        Alert.alert('로그인 되었습니다!')
        setInputUser({
          email: '',
          passwd: '',
        })
        navigation.navigate('loginHome', response.data)
      })
      .catch(e => {
        Alert.alert(e.response.data.message)
        setInputUser({
          email: '',
          passwd: '',
        })
      })
  }

  return (
    <SafeAreaView style={styles.holeContainer}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={e => onChange('email', e)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={passwd}
          onChange={e => onChange('passwd', e)}
        />
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
        <Text>로그인</Text>
      </TouchableOpacity>

      <View style={styles.modifyView}>
        <TouchableOpacity onPress={goSignUpPress}>
          <Text style={styles.fontModify}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={goHomePress} style={styles.goHomeBtn}>
        <Text>홈</Text>
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
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
  loginBtn: {
    paddingVertical: 8,
    paddingHorizontal: 107,
    borderRadius: 7,
    backgroundColor: 'rgba(252, 255, 176, 0.6)',
  },
  modifyView: {
    alignItems: 'center',
    marginVertical: 10,
  },
  fontModify: {
    fontSize: 13,
  },
})

export default LoginScreen
