import React, { Component } from 'react';
import { View, Text, Button, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlantPage from './screens/PlantPage';
import HomePage from './screens/HomePage';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen name="Home" component={HomePage} />
    //     {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
    //   </Stack.Navigator>
    // </NavigationContainer>

<NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Plants') {
              iconName = focused ? 'leaf' : 'leaf-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Plants" component={PlantPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;


