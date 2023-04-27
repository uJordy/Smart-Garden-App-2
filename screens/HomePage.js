import React, { useLayoutEffect } from 'react';
import { Text, SafeAreaView, Image, View, ScrollView, ImageBackground, TouchableOpacity, Pressable, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';


function HomePage(props) {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
            
                {/* Header */}
                <View>
                    <Text className="text-3xl font-bold px-6 pt-6 pb-2" >Welcome back, John</Text>
                    
                    {/* Upcoming tasks */}

                    <View className="flex flex-row items-center  w-max mx-5 my-3 rounded" >
                        <Text className="text-2xl">Upcoming Tasks</Text>

                        <View className="bg-orange-500 mx-2 rounded-full">
                            <Text className= "text-2xl mx-2 rounded-full text-white">5</Text>
                        </View>
                    </View>
                </View>

                {/* Garden tasks */}
                <View className="h-27 mx-2 rounded-lg bg-slate-200 ">
                    {/* <Image className='h-5/6 w-28 bg-left float-left absolute left-2 top-2'resizeMode='cover' alignSelf='left' source={require('../app/assets/isometricgarden.png')}/> */}
                    <Text className="text-2xl font-medium p-1 px-2">Garden</Text> 
                    {/* List of plants for tasks */}
                    <View className=" bg-gardenorange w-full flex pb-1">
                        <TouchableOpacity className="border-[3px] border-sky-600 mx-2 rounded-full h-16  w-16 aspect-square">
                            <View className="mx-auto my-auto grid rounded-full w-[90%] h-[90%]">
                                <Image className='w-full h-full rounded-full place-self-center' resizeMode='cover' source={require('../app/assets/exampleplant.webp')}/>
                                <Image className='w-2/4 h-2/4 absolute z-20 float-right left-0' resizeMode='cover' source={require('../app/assets/drop.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
}


export default HomePage;