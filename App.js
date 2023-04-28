import React, { Component } from 'react';
import { View, Text, Button, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/HomePage';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlantPage from './screens/PlantPage';

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
<Tab.Navigator>
  <Tab.Screen name="Home" component={HomePage} />
  <Tab.Screen name="Settings" component={PlantPage} />
</Tab.Navigator>
</NavigationContainer>
  );
}

export default App;


