import React, { Component, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlantPage from './screens/PlantPage';
import AutomationPage from './screens/AutomationPage';
import Home from './screens/HomePage';
import EditGardenPropPage from './screens/EditGardenPropPage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as FileSystem from 'expo-file-system';

import useStore from './stores/garden' 

var GardenData = {};
const fileName = "GardenDictionary.json" //.json essential

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

GardenData = {};
GardenData = sgDictExample; // Overwrite saved data

var sgDictExample = {
  Temperature: { //Celcius 
    Value: 0, //Current
    History: []
  }, 
  Light: { //Percentage
    Value: 0, 
    History: []
  }, 
  SoilMoisture: { //Percentage
    Value: 0, 
    History: []
  }, 
  Humidity: { //Percentage
    Value: 0, 
    History: []
  }, 
}

// get GardenData() {
//   return this.GardenData;
// }

// Must loadData() first!

function createFile() {
  GardenData = sgDictExample;
}

function saveData() {
  const id = FileSystem.documentDirectory + fileName;

  FileSystem.getInfoAsync(id).then(file => {
    if (file.exists) {
      // Ensures garden data can't save null data
      if (GardenData.Temperature != null &&
        GardenData.Light != null &&
        GardenData.SoilMoisture != null &&
        GardenData.Humidity != null
      ) {
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
    } else {
      console.warn("File Not Found, creating new..")
      createFile()
    }
  }).catch((error) => {
    console.error(error);
  })
}


// async update(id, updates) {
//   id = FileSystem.documentDirectory + 'GardenDictionary.json'
//   updates = { first: "added new content!" };
//   try {
//     console.log("checking if file exists")

//     FileSystem.getInfoAsync(id).then(file => {
//       if (file.exists) {
//         console.log("file exists")

//         FileSystem.readAsStringAsync(id).then(payloadJson => {
//           // console.log(tmp)
//           const payload = JSON.parse(payloadJson)
//           console.log(payload)
//         })
//       }
//       else {
//         console.error("no FILE found, creating")
//         FileSystem.writeAsStringAsync(id, JSON.stringify(updates))
//       }
//     }).catch((error) => {
//       console.error(error);
//     });
//   } catch (e) {
//     console.error(e)
//   }
// }

function addHistoryData(sensor, data) {
  if (typeof(data) === "string"){
    GardenData[sensor].History.append(data)
    console.log("Successfully appended historical data for " + sensor)
  } else {
    console.error("History Data: Invalid data type")
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
  console.log("hello")
  const addHistory = useStore((state) => state.addHistory)
  addHistory()
  return (
    <NavigationContainer>
      <TabNavigator />
  </NavigationContainer>
  );
}

export default App;





