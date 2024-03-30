import React, { useLayoutEffect } from 'react';
import { Text, SafeAreaView, View, ScrollView, TouchableOpacity, Switch} from 'react-native';
import PlantJob from '../components/PlantJob';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import WhiteToTransparent from '../assets/svg/WhiteToTransparent';
import AutomationListItem from '../components/AutomationListItem';


function AutomationPage() { //{navigation}

    const navigation = useNavigation();
    const gardenprop = "hello"

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    const pressHandler = (gardenprop) => {
        navigation.navigate('AutomationEdit', {
            gardenprop: gardenprop,
        })
    }

    

    return (
        <SafeAreaView>
          {/* Add automation button */}
          <View className="w-full h-12 pr-6 flex flex-row justify-end">
            <TouchableOpacity 
            className="h-[48px] w-[48px] rounded-full bg-sky-500 shadow-md"
            onPress={() => pressHandler(gardenprop)}
            >
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
                    <AutomationListItem onPress={pressHandler}/>
                </View>

                {/* <Toggle/> */}
            </ScrollView>
        </SafeAreaView>
    );
}


export default AutomationPage;