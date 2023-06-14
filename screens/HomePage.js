import React, { useLayoutEffect } from 'react';
import { Text, SafeAreaView, View, ScrollView, Image, Platform, FlatList, TouchableOpacity } from 'react-native';
import HomePageTask from '../components/HomePageTask';
import { useNavigation } from '@react-navigation/native';

import SoilMoistureSVG from '../assets/svg/SoilMoistureSVG';




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
                    <Text className="text-2xl rounded-full text-white mx-2">5 Tasks</Text>
                </View>

                <TouchableOpacity className="w-[90%] mx-auto mt-2 bg-slate-50 rounded-2xl">
                    <Text className="text-xl mx-2 mt-2">Tasks</Text>
                    <ScrollView>
                        <HomePageTask />
                        <HomePageTask />
                        <HomePageTask />
                        <HomePageTask />
                    </ScrollView>
                </TouchableOpacity>

              
                <View className="mx-auto w-[90%] mt-2 flex flex-row justify-evenly flex-wrap">
                    <View className="w-[32%] h-24 bg-blue-200 rounded-3xl aspect-square">
                        
                    </View>
                    <TouchableOpacity className="w-[32%] h-24 bg-orange-200 rounded-3xl aspect-square">
                        <View className="m-3"><SoilMoistureSVG fill="#fb923c"/></View>
                        <Text className="font-semibold ml-2 mt-2 text-gray-900">Soil moisture</Text>
                        <Text className="ml-2 text-slate-800">High</Text>
                    </TouchableOpacity>
                    <View className="w-[32%] h-24 bg-yellow-200 rounded-3xl aspect-square"></View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default HomePage;