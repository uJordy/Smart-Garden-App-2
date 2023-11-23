import React, { useLayoutEffect } from 'react';
import { Text, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import PlantJob from '../components/PlantJob';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import WhiteToTransparent from '../assets/svg/WhiteToTransparent';


function AutomationPage(props) {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    return (
        <SafeAreaView>
          {/* Add automation button */}
          <View className="w-full flex flex-row justify-end">
            <TouchableOpacity className="h-12 w-12 rounded-full bg-sky-500">
              <Ionicons className="h-full w-full mx-auto my-auto aspect-square text-white bg-orange-700" name="add-circle-outline" size={40}/>
            </TouchableOpacity>
          </View>
            <ScrollView>

                {/* Header */}
                <View>
                    <Text className="text-3xl font-bold px-6 pt-6 pb-2" >Welcome back, John</Text>

                    {/* Upcoming tasks */}

                    <View className="flex flex-row items-center  w-max mx-5 my-3 rounded" >
                        <Text className="text-2xl">Upcoming Tasks</Text>

                        <View className="bg-orange-500 mx-2 rounded-full">
                            <Text className="text-2xl mx-2 rounded-full text-white">5</Text>
                        </View>
                    </View>
                </View>

                {/* Garden tasks */}
                <View className="h-27 mx-2 rounded-lg bg-slate-100 shadow-lg">
                    {/* <Image className='h-5/6 w-28 bg-left float-left absolute left-2 top-2'resizeMode='cover' alignSelf='left' source={require('../app/assets/isometricgarden.png')}/> */}
                    <Text className="text-2xl font-medium p-1 px-2">Garden</Text>
                    {/* List of plants for tasks */}
                    <ScrollView className="w-full flex pb-1" horizontal={true}>
                        <PlantJob type="fertilise" />
                        <PlantJob type="water" />
                        <PlantJob type="fertilise" />
                        <PlantJob type="water" />
                        <PlantJob type="water" />
                        <PlantJob type="water" />
                        <PlantJob type="water" />

                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default AutomationPage;