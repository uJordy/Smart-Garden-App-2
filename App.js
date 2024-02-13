import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlantPage from './screens/PlantPage';
import AutomationPage from './screens/AutomationPage';
import Home from './screens/HomePage';
import EditGardenPropPage from './screens/EditGardenPropPage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import * as FileSystem from 'expo-file-system';


var GardenData = {};
const fileName = "GardenDictionary.json" //.json essential

var sgDictExample = {
    Temperature: 50, //Celcius 
    Light: 20, //Percentage
    SoilMoisture: 5, //Percentage
    Humidity: 80 //Percentage
}
GardenData = sgDictExample;

var sgPastDataDict = {
    Temperature:
    {
     Date: 0, //date.now() 
     Data: 0  
    }
}


// Must loadData() first!
function saveData() {
    const id = FileSystem.documentDirectory + fileName;

    FileSystem.getInfoAsync(id).then(file => {
        if (file.exists) {
            // Ensures garden data can't save null data
            if (GardenData.Temperature != null &&
                GardenData.Light != null &&
                GardenData.SoilMoisture != null &&
                GardenData.Humidity != null
            ){
                const updatedPayload = sgDictExample;

                FileSystem.writeAsStringAsync(id, JSON.stringify(updatedPayload)).then(success => {
                    console.log("Successfully saved!")
                })
            }

        } else {
            console.warn("File Not Found, creating new..")
            createFile()
        }
    })
}

function loadData() {
    const id = FileSystem.documentDirectory + fileName;

    FileSystem.getInfoAsync(id).then(file => {
        if (file.exists) {
            FileSystem.readAsStringAsync(id).then(payloadJson => {
                const payload = JSON.parse(payloadJson)
                console.log(payload);
                GardenData = payload;
                console.log("Successfully loaded")
            })
        }else {
            console.warn("File Not Found, creating new..")
            createFile()
        }
    }).catch((error) => {
        console.error(error);
    })
}


 async function update (id, updates) {
    id = FileSystem.documentDirectory + 'GardenDictionary.json'
    updates = {first: "added new content!"};
    try {
        console.log("checking if file exists")

        FileSystem.getInfoAsync(id).then(file => {
            if(file.exists){
                console.log("file exists")

                FileSystem.readAsStringAsync(id).then(payloadJson => {
                    // console.log(tmp)
                    const payload = JSON.parse(payloadJson)
                    console.log(payload)
                })
            }
            else{
                console.error("no FILE found, creating")
                FileSystem.writeAsStringAsync(id, JSON.stringify(updates))
            }
        }).catch((error) => {
            console.error(error);
          });
    } catch (e) {
      console.error(e)
    }
  }

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home}/>
      <Stack.Screen name="EditGardenPropPage" component={EditGardenPropPage}  />
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





