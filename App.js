import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeMain from './src/screens/HomeMain'
import TourList from './src/screens/TourList'
import EachTourList from './src/screens/EachTourList'
import LoginScreen from './src/screens/LoginScreen'
console.reportErrorsAsExceptions = false;

const currentLocal = {
  city: "",
  town: ""
}


function HomeScreen({navigation}) {
  return(
    <HomeMain 
      currentLocal={currentLocal}
      goTourPress={() => {
        navigation.navigate("TourS")
      }}
      goLoginPress={() => {
        navigation.navigate("login")
      }}
    />
  )
}

function TourListScreen({navigation}) {

  return (
    <TourList 
      currentLocal={currentLocal}
      navigation={navigation}
    />
  )
}

function EachTourListScreen({navigation, route}) {
  return (
    <EachTourList 
      id={route.params.id}
      navigation={navigation}
    />
  )
}

function LoginScreenView({navigation}) {
  return (
    <LoginScreen 
      goHomePress={() => {
        navigation.navigate("Home")
      }}
    />
  )
}

const Tab = createBottomTabNavigator()

function TourListTabScreen() {

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Tour') {
          iconName = 'list'
        } else if (route.name === 'EachTour') {
          iconName = focused ? 'information-circle' : 'information-circle'
        }

        return <Icon name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown: false
    })}>
      <Tab.Screen name="Tour" component={TourListScreen} />
      <Tab.Screen name="EachTour" component={EachTourListScreen} />
    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();

const App = () => {
    
  useEffect(() => {
      SplashScreen.hide()
  }, [])

  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="TourS" component={TourListTabScreen} />
        <Stack.Screen name="login" component={LoginScreenView} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

// http://13.125.33.210:3000/ 백엔드