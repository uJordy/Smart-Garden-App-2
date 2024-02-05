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

    const pressHandler = () => {
        console.log("print")
        navigation.navigate('EditGardenPropPage')
    }

    return (
        <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-8' : ''}`}>
            <ScrollView>
                <View className="w-16 h-16 mx-auto mb-9">
                    <Leaf fill="#2db551"/>
                </View>    
                

                {/* <View className="bg-orange-500 mx-auto mt-2 rounded-full h-8">
                    <Text className="text-2xl rounded-full text-white mx-2">Home</Text>
                </View> */}

                {/* <View className="mx-auto">
                    <Text className="text-2xl font-bold">Home</Text>
                </View> */}

                {/* Tasks */}
                {/* <TouchableOpacity className="w-[90%] mx-auto mt-2 bg-slate-50 rounded-2xl">
                    <Text className="text-xl mx-2 mt-2">Tasks</Text>
                    <ScrollView>
                        <HomePageTask />
                        <HomePageTask />
                        <HomePageTask />
                        <HomePageTask />
                    </ScrollView>
                </TouchableOpacity> */}

                {/* <View className="mt-2">
                    <TouchableOpacity className="mx-auto w-[95%] h-20 bg-blue-200 rounded-2xl">
                        <View className="flex flex-row h-14">
                            <View className="ml-2 mt-2"><SunSVG fill="#facc15"/></View>
                            <Text className="bg-orange-500  align-baseline">Temperature</Text>
                        </View>
                    </TouchableOpacity>
                    </View> */}
                {/* <Button onPress={pressHandler} title="Hellooo"/> */}

                <GardenPropItem type="Temperature" className="Temperature" onPress={pressHandler} />
                <GardenPropItem type="Light Intensity"/>
                <GardenPropItem type="Soil Moisture"/>
                <GardenPropItem type="Humidity"/>
              
                <View className="mx-auto w-[90%] mt-2 flex flex-row justify-evenly flex-wrap">
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default HomePage;