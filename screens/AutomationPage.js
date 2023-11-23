import React, { useLayoutEffect } from 'react';
import { Text, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import PlantJob from '../components/PlantJob';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
          <View className="w-full h-12 pr-3 flex flex-row justify-end">
            <TouchableOpacity className="h-[48px] w-[48px] rounded-full bg-sky-500 shadow-md">
              <MaterialIcons className="w-[40px] h-[40px] mx-auto my-auto text-center text-white text-[40px]" name="add"/>
            </TouchableOpacity>
          </View>
            <ScrollView>

                {/* Header */}
                <View>
                    <Text className="text-3xl font-bold px-6 pt-6 pb-2" >Automations</Text>
                </View>

                {/* Created automations */}
                <View>
                    <View className="mx-auto w-[90%] h-20 bg-sky-500 rounded-lg">
                        <Text className="pl-2 text-white font-semibold text-lg">00:00 ● Automation Name</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default AutomationPage;