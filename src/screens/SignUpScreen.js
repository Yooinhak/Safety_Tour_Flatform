import axios from 'axios'
import React, {useState} from 'react'
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'

function SignUpScreen({navigation}) {
  const [user, setUser] = useState({
    email: '',
    passwd: '',
    name: '',
  })

  const {email, passwd, name} = user

  const onChange = (keyValue, e) => {
    const {text} = e.nativeEvent
    setUser({
      ...user,
      [keyValue]: text,
    })
  }

  const goLoginPress = () => {
    navigation.navigate('login')
    setUser({
      email: '',
      passwd: '',
      name: '',
    })
  }

  const handleSignUp = () => {
    axios
      .post('http://3.38.244.119:3000/auth/signup', {
        email: user.email,
        passwd: user.passwd,
        name: user.name,
      })
      .then(response => {
        Alert.alert('회원가입에 성공했습니다!')
        setUser({
          email: '',
          passwd: '',
          name: '',
        })
        navigation.navigate('login')
      })
      .catch(e => {
        Alert.alert(e.response.data.message)
        setUser({
          email: '',
          passwd: '',
          name: '',
        })
      })
  }

  return (
    <SafeAreaView style={styles.holeContainer}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChange={e => onChange('email', e)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={passwd}
          onChange={e => onChange('passwd', e)}
        />
        <TextInput
          style={styles.input}
          placeholder="name"
          value={name}
          onChange={e => onChange('name', e)}
        />
      </View>

      <TouchableOpacity onPress={handleSignUp} style={styles.loginBtn}>
        <Text>회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goLoginPress} style={styles.goHomeBtn}>
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
})

export default SignUpScreen
