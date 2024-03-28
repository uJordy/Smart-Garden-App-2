import { View, SafeAreaView, ScrollView, Platform, Text, TouchableOpacity, TextInput, Button, Touchable } from 'react-native'
import React, { useState } from 'react'

import DateTimePicker from '@react-native-community/datetimepicker';

import BackButton from '../components/BackButton';
import Leaf from '../assets/svg/Leaf';
import DayButton from '../components/DayButton';
import AutomationTypeItem from '../components/AutomationTypeItem';

export default function AutomationEdit({ route, navigation }) {

  function handleGoBack() {
    navigation.goBack()
  }

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };



  return (
    <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-8' : ''} `}>
      <ScrollView>
        {/* Top Bar */}
        <View className="flex flex-row  h-16">
          <View className="basis-1/4 ">
            <BackButton buttonClassName="mr-auto my-auto pl-4 h-10" onPress={handleGoBack} />
          </View>
          <View className="basis-1/2">
            <View className="w-16 h-16 mx-auto mb-9"><Leaf fill="#2db551" /></View>
          </View>
          <View className="basis-1/4 ">
            <View className="ml-auto pr-4 my-auto ">
              <TouchableOpacity className="rounded-full bg-slate-800 px-5 py-2">
                <Text className="text-white font-semibold text-base">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Main Content */}
        <View className="mx-4">
          
          <View>
            <TextInput
              className="m-2 rounded-lg bg-slate-300 text-white p-2 border-slate-500 border-2 focus:border-amber-400"
              // onChangeText={}
              // value={number}
              placeholder="Automation Name"
            // keyboardType="numeric"
            />
          </View>

          <View className="flex flex-row flex-wrap justify-around mt-4">
            <AutomationTypeItem type="Temperature"/>
            <AutomationTypeItem type="Light Intensity"/>
            <AutomationTypeItem type="Soil Moisture"/>
            <AutomationTypeItem type="Humidity"/>
          </View>

          <View className="mx-auto">
            <TextInput
              className="m-2 rounded-lg bg-slate-300 text-white p-2 border-slate-500 border-2 focus:border-amber-400 aspect-square h-20 text-2xl"
              // onChangeText={}
              // value={number}
              placeholder="Num"
            keyboardType="numeric"
            />
          </View>

          <View className="mx-auto mt-4">
            <DateTimePicker
              value={date}
              mode={"time"}
              is24Hour={true}
              onChange={onChange}
            />
          </View>

          {/* Select day indicator needed here */}
          <View className="flex flex-row justify-around mt-4">
            <DayButton day="Monday"/>
            <DayButton day="Tuesday"/>
            <DayButton day="Wednesday"/>
            <DayButton day="Thursday"/>
            <DayButton day="Friday"/>
            <DayButton day="Saturday"/>
            <DayButton day="Sunday"/>
          </View>

          <View className="mt-5">
            <TouchableOpacity className="w-40 h-10 rounded-3xl bg-red-500 border-4 border-red-300 mx-auto mt-auto ">
              <Text className="text-lg mx-auto my-auto text-white font-bold">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}