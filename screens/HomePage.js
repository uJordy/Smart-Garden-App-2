import React, { useLayoutEffect, useState } from 'react';
import { Text, SafeAreaView, View, ScrollView, Image, Platform, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import HomePageTask from '../components/HomePageTask';
import GardenPropItem from '../components/GardenPropItem';
import { useNavigation } from '@react-navigation/native';

import Leaf from '../assets/svg/Leaf';

var GardenData = {};
const fileName = "GardenDictionary.json" //.json essential

var sgDictExample = {
    Temperature: 50, //Celcius 
    Light: 20, //Percentage
    SoilMoisture: 5, //Percentage
    Humidity: 80 //Percentage
}
GardenData = sgDictExample;

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

function HomePage({navigation}) {

    // const tabNavigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    const pressHandler = (gardenprop) => {
        navigation.navigate('EditGardenPropPage', {
            gardenprop: gardenprop
        })
    }

    return (
        <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-8' : ''}`}>
            <ScrollView>
                <View className="w-16 h-16 mx-auto mb-9">
                    <Leaf fill="#2db551"/>
                </View>    
                <GardenPropItem type="Temperature"  onPress={pressHandler} />
                <GardenPropItem type="Light Intensity" onPress={pressHandler}/>
                <GardenPropItem type="Soil Moisture" onPress={pressHandler}/>
                <GardenPropItem type="Humidity" onPress={pressHandler}/>
              
                <View className="mx-auto w-[90%] mt-2 flex flex-row justify-evenly flex-wrap">
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default HomePage;