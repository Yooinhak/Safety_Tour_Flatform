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

function ModalScreen({navigation, currentUser}) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.background} />
      <View style={styles.modal}>
        <Text style={styles.titleText}>로그인에 성공했습니다!</Text>
        <TouchableOpacity>
          <Text style={styles.doneText}>확인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

function LoginScreen({navigation}) {
  const [inputUser, setInputUser] = useState({
    email: '',
    passwd: '',
  })

  const [currentUser, setCurrentUser] = useState({
    resUser: {
      id: '',
      email: '',
      name: '',
    },
    token: '',
    user: 'false',
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
        setCurrentUser(response.data)
        // navigation.navigate('loginHome', response.data)
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
      <ModalScreen />
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
  container: {
    position: 'absolute',
    height: '115%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '95%',
    backgroundColor: 'white',
    padding: 10,
  },
  doneText: {
    color: 'rgb(1,123,255)',
    fontSize: 15,
    margin: 10,
  },
  titleText: {
    fontSize: 18,
    margin: 10,
  },
})

export default LoginScreen
