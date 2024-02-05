import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlantPage from './screens/PlantPage';
import HomePage from './screens/HomePage';
import AutomationPage from './screens/AutomationPage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

import Home from './screens/HomePage';
import EditGardenPropPage from './screens/EditGardenPropPage';

const Tab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="HomeScreen" component={Home}/>
      <Stack.Screen name="EditGardenPropPage" component={EditGardenPropPage} />
    </Stack.Navigator>
  )
}

function TabNavigator() {
  return (
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
        } else if (route.name === 'Automations') {
          iconName = focused ? 'alarm' : 'alarm-outline';
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#2db551', // same as orange-500
      tabBarInactiveTintColor: 'gray',
      headerShown: false
    })}
    >
    <Tab.Screen name="Home" component={StackNavigator}/>
    <Tab.Screen name="Plants" component={PlantPage} />
    <Tab.Screen name="Automations" component={AutomationPage} />
  </Tab.Navigator>
  )
}


function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
  </NavigationContainer>
  );
}

export default App;


