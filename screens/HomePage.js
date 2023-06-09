import React, { useLayoutEffect } from 'react';
import { Text, SafeAreaView, View, ScrollView, Image, Platform } from 'react-native';
import HomePageTask from '../components/HomePageTask';
import { useNavigation } from '@react-navigation/native';

import WhiteToTransparent from '../assets/svg/WhiteToTransparent';


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

                <View className="bg-orange-500 mx-auto mt-2 rounded-full h-8 w-8">
                    <Text className="text-2xl mx-auto rounded-full text-white">5</Text>
                </View>

                <View className="w-[90%] mx-auto mt-2 bg-slate-50 rounded-lg">
                    <Text className="text-xl mx-2 mt-2">Tasks</Text>

                    <HomePageTask/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default HomePage;