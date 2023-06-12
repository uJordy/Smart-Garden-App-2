import React, { useLayoutEffect } from 'react';
import { Text, SafeAreaView, View, ScrollView, Image, Platform, FlatList, TouchableOpacity } from 'react-native';
import HomePageTask from '../components/HomePageTask';
import { useNavigation } from '@react-navigation/native';

import SoilMoistureSVG from '../assets/svg/SoilMoistureSVG';

import { styled } from "nativewind";
import { Svg, Rect } from "react-native-svg";
// import SoilMoistureSVG from '../assets/svg/HelloTest';
import HelloTest from '../assets/svg/SoilMoistureSVG';

// const StyledRect = styled(Rect, { classProps: ["fill", "stroke"] });

// function MyStyledSvg({ stroke, ...props }) {
//   return (
//     <Svg height="100" width="100" {...props}>
//       <StyledRect x="0" y="0" width="100" height="100" stroke={stroke} />
//     </Svg>
//   );
// }



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
                    <View className="w-[32%] h-24 bg-orange-200 rounded-3xl aspect-square">
                        {/* <Image className="w-16 h-16 mx-auto" source={require("../assets/img/soil-analysis.png")} /> */}
                        <SoilMoistureSVG fill="fill-blue-500" />
                        {/* <MyStyledSvg fill="fill-blue-500" />; */}
                    </View>
                    <View className="w-[32%] h-24 bg-yellow-200 rounded-3xl aspect-square"></View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default HomePage;