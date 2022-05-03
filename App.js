import React, {useEffect} from 'react'
import {Alert} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeMain from './src/screens/HomeMain'
import TourList from './src/screens/TourList'
import EachTourList from './src/screens/EachTourList'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import Profile from './src/screens/Profile'
console.reportErrorsAsExceptions = false

const currentLocal = {
  city: '',
  town: '',
}

function HomeScreen({navigation}) {
  const defaultUser = {
    resUser: {
      id: '',
      email: '',
      name: '',
    },
    token: '',
    user: 'false',
  }

  return (
    <HomeMain
      navigation={navigation}
      currentLocal={currentLocal}
      currentUser={defaultUser}
    />
  )
}

function LoginHomeScreen({navigation, route}) {
  return (
    <HomeMain
      currentLocal={currentLocal}
      currentUser={route.params}
      navigation={navigation}
    />
  )
}

function TourListScreen({navigation, route}) {
  return (
    <TourList
      currentLocal={currentLocal}
      navigation={navigation}
      currentUser={route.params}
    />
  )
}

function EachTourListScreen({navigation, route}) {
  try {
    return (
      <EachTourList
        id={route.params.id}
        navigation={navigation}
        currentUser={route.params.currentUser}
      />
    )
  } catch (e) {
    Alert.alert('관광지를 먼저 선택해주세요.')
    return <TourList currentLocal={currentLocal} navigation={navigation} />
  }
}

function LoginScreenView({navigation, route}) {
  return <LoginScreen navigation={navigation} currentUser={route.params} />
}

function SignUpScreenView({navigation}) {
  return <SignUpScreen navigation={navigation} />
}

function ProfileScreen({navigation, route}) {
  return <Profile navigation={navigation} currentUser={route.params} />
}

const Tab = createBottomTabNavigator()

function TourListTabScreen({route}) {
  const currentUser = route.params
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName

          if (route.name === 'Tour') {
            iconName = 'list'
          } else if (route.name === 'EachTour') {
            iconName = focused ? 'information-circle' : 'information-circle'
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Tour"
        component={TourListScreen}
        initialParams={currentUser}
      />
      <Tab.Screen
        name="EachTour"
        component={EachTourListScreen}
        initialParams={{currentUser: currentUser}}
      />
    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator()

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TourS" component={TourListTabScreen} />
        <Stack.Screen name="login" component={LoginScreenView} />
        <Stack.Screen name="signUp" component={SignUpScreenView} />
        <Stack.Screen name="loginHome" component={LoginHomeScreen} />
        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen name="EachTour" component={EachTourListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

// http://13.125.77.122:3000/ server
