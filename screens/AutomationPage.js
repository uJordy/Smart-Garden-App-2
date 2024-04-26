import React, { useLayoutEffect } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useStore from '../stores/garden';

import AutomationListItem from '../components/AutomationListItem';
import AutomationListEmptyComponent from '../components/AutomationListEmptyComponent';


function AutomationPage() {

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    // Zustand stores

    const automationList = useStore((state) => state.getAutomationList)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    const pressHandler = (action, data) => {
        data ??= {} //if data is null, assign empty object

        if (data.LastRan) { //React navigation doesn't accept objects and fucntions in .navigate()
            if (data.LastRan.constructor === Date) {
                console.log("date matched in press handler")
                data.LastRan = data.LastRan.toJSON()
            }
        }
        navigation.navigate('AutomationEdit', {
            action: action,
            data: data
        })
    }


    // console.log(automationList())
    // console.log("automation page list")

    return (
        <SafeAreaView>
            {/* Add automation button */}
            <View className="w-full h-12 pr-6 flex flex-row justify-end">
                <TouchableOpacity
                    className="h-[48px] w-[48px] rounded-full bg-sky-500 shadow-md"
                    onPress={() => pressHandler("create")}
                >
                    <MaterialIcons className="w-[40px] h-[40px] mx-auto my-auto text-center text-white text-[40px]" name="add" />
                </TouchableOpacity>
            </View>


            {/* Header */}
            <View>
                <Text className="text-3xl font-bold px-6 pt-6 pb-2" >Automations</Text>
            </View>

            {/* Created automations */}
            <FlatList
                data={Object.values(automationList())}
                renderItem={({ item }) => <AutomationListItem data={item} onPress={() => pressHandler("edit", item)} />}
                ListEmptyComponent={<AutomationListEmptyComponent />}
            />
        </SafeAreaView>
    );
}


export default AutomationPage;