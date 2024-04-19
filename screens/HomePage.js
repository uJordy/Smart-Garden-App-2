import React, { useLayoutEffect, useState, useContext } from 'react';
import { Text, SafeAreaView, View, ScrollView, Platform } from 'react-native';
import GardenPropItem from '../components/GardenPropItem';

import Leaf from '../assets/svg/Leaf';

import AutomationHandler from '../core/AutomationHandler'



function HomePage({navigation}) {

    AutomationHandler()

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
                    <Leaf fill="#2db551"/>
                </View>    
                <GardenPropItem type="Temperature"  onPress={pressHandler}/>
                <GardenPropItem type="Light Intensity" onPress={pressHandler}/>
                <GardenPropItem type="Soil Moisture" onPress={pressHandler}/>
                <GardenPropItem type="Humidity" onPress={pressHandler} />
              
                <View className="mx-auto w-[90%] mt-2 flex flex-row justify-evenly flex-wrap">
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default HomePage;