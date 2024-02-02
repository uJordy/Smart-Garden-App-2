import React, { useLayoutEffect, useState } from 'react';
import { Text, SafeAreaView, View, ScrollView, Image, Platform, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import HomePageTask from '../components/HomePageTask';
import GardenPropItem from '../components/GardenPropItem';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

import SoilMoistureSVG from '../assets/svg/SoilMoistureSVG';
import SunSVG from '../assets/svg/SunSVG';
import HumiditySVG from '../assets/svg/HumiditySVG';
import SliderExample from '../components/sliderstyles';

var GardenData = {};
const fileName = "GardenDictionary.json" //.json essential

// const [sliderDimensions, setSliderDimensions] = useState({
//     height: null,
//     top: null,
//     bottom: null,
//   });




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

function HomePage(props) {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    return (
        <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-8' : ''}`}>
            <ScrollView>
                <Image className="w-16 h-16 mx-auto" source={require("../assets/img/leaf-logo.png")} />

                <View className="bg-orange-500 mx-auto mt-2 rounded-full h-8">
                    <Text className="text-2xl rounded-full text-white mx-2">Home</Text>
                </View>

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

                <GardenPropItem/>
              
                <View className="mx-auto w-[90%] mt-2 flex flex-row justify-evenly flex-wrap">


                <TouchableOpacity 
                className="w-[32%] h-24 bg-yellow-200 rounded-3xl aspect-square"
                onPress={() => saveData()}
                >
                    <View className="m-3"><SunSVG fill="#facc15"/></View>
                        <Text className="font-semibold ml-2 mt-2 text-gray-800">Save Data</Text>
                        <Text className="ml-2 text-slate-800">10c</Text>
                </TouchableOpacity>


                <TouchableOpacity className="w-[32%] h-24 bg-blue-200 rounded-3xl aspect-square"
                onPress={() => loadData()}
                >
                    <View className="m-3"><HumiditySVG fill="#60a5fa"/></View>
                    <Text className="font-semibold ml-2 mt-2 text-gray-800">Load Data</Text>
                    <Text className="ml-2 text-slate-800">Dry</Text>
                </TouchableOpacity>



                {/* <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                /> */}


                    {/* <View className="w-[32%] h-24 bg-blue-200 rounded-3xl aspect-square">
                        <View className="m-3"><HumiditySVG fill="#60a5fa"/></View>
                        <Text className="font-semibold ml-2 mt-2 text-gray-800">Humidity</Text>
                        <Text className="ml-2 text-slate-800">Dry</Text>
                    </View>

                    <TouchableOpacity class%Name="w-[32%] h-24 bg-orange-200 rounded-3xl aspect-square">
                        <View className="m-3"><SoilMoistureSVG fill="#fb923c"/></View>
                        <Text className="font-semibold ml-2 mt-2 text-gray-800">Soil moisture</Text>
                        <Text className="ml-2 text-slate-800">High</Text>
                    </TouchableOpacity>

                    <View className="w-[32%] h-24 bg-yellow-200 rounded-3xl aspect-square">
                    <View className="m-3"><SunSVG fill="#facc15"/></View>
                        <Text className="font-semibold ml-2 mt-2 text-gray-800">Sunlight</Text>
                        <Text className="ml-2 text-slate-800">Good</Text>
                    </View> */}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// const styles = StyleSheet.create({
//     title: {
//       textAlign: 'center',
//       fontSize: 20,
//       marginVertical: 50,
//     },
//     slider: {
//       width: 50,
//       height: '80%',
//       marginLeft: 'auto',
//       marginRight: 'auto',
//       position: 'relative',
//       marginBottom: 50,
//     },
//     rail: {
//       width: 20,
//       height: '100%',
//       marginLeft: 'auto',
//       marginRight: 'auto',
//       backgroundColor: 'orange',
//     },
//     stepper: {
//       width: '100%',
//       height: 5,
//       backgroundColor: 'green',
//     },
//   });

// const styles = StyleSheet.create({
//     input: {
//       height: 40,
//       margin: 12,
//       borderWidth: 1,
//       padding: 10,
//     },
//   });

export default HomePage;