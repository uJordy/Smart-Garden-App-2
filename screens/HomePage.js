import React, { useLayoutEffect } from 'react';
import { SafeAreaView, View, ScrollView, Platform, Text, TouchableOpacity } from 'react-native';
import GardenPropItem from '../components/GardenPropItem';

import Leaf from '../assets/svg/Leaf';


function HomePage({ navigation }) {


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    const pressHandler = (gardenprop) => {
        navigation.navigate('EditGardenPropPage', {
            gardenprop: gardenprop,
        })
    }

    return (
        <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-8' : ''}`}>
            <ScrollView>
                <View className="w-16 h-16 mx-auto mb-9">
                    <Leaf fill="#2db551" />
                </View>
                <GardenPropItem type="Temperature" onPress={pressHandler} />
                <GardenPropItem type="Light Intensity" onPress={pressHandler} />
                <GardenPropItem type="Soil Moisture" onPress={pressHandler} />
                <GardenPropItem type="Humidity" onPress={pressHandler} />

                <View className="mx-auto w-[90%] my-2 mb-2 bg-white rounded-2xl">
                    <Text className="pl-2 pt-2 text-lg text-gray-300">Actions</Text>
                    <View className="mx-auto w-[90%] mt-2 mb-2 flex flex-row justify-evenly flex-wrap rounded-2xl">
                        <TouchableOpacity className="w-[40%] bg-amber-500 rounded-2xl p-1 border-0 shadow">
                            <Text className="text-xl mt-auto text-center text-white">Water Garden</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="w-[40%] bg-purple-500 rounded-2xl p-1 border-0 shadow">
                            <Text className="text-xl mt-auto text-center text-white">Toggle Blinds</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default HomePage;