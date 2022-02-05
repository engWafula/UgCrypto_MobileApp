import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from "react-redux"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './Screens/Register';
import store from './redux/store';
import {MaterialCommunityIcons,Entypo} from "@expo/vector-icons"
import Home from "./Screens/Home"
import Login from "./Screens/Login"
import Crypto from "./Screens/Crypto"
import News from "./Screens/News"


const Tab =createBottomTabNavigator()

export default function Navigation() {
 
 

  return (
   
    < NavigationContainer >
     <Provider store={store}>
    <Tab.Navigator >
    <Tab.Screen name="Home" component={Home}
            options={{
                tabBarIcon:({color,size})=><MaterialCommunityIcons name="home" size={24} color="black"/>
            }}
            />
            <Tab.Screen
          
      name="Cryptocurrencies"
      component={Crypto}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="currency-btc"
            color="black"
            size={24}
          />
        )
      }}
    />
           <Tab.Screen name="Crypto news" component={News}
           options={{
                tabBarIcon:({color,size})=><Entypo name="news" size={24} color="black"/>
            }}
           />
    </Tab.Navigator>
    </Provider>
    </NavigationContainer>
  
  );
}


