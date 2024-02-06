import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

import Leaf from '../assets/svg/Leaf'
import Back from '../assets/svg/Back'
import BackButton from '../components/BackButton';
import Slider from '@react-native-community/slider';

export default function EditGardenPropPage({ route, navigation }) {

  const { gardenprop } = route.params;

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-8' : ''}`}>
      <ScrollView bounces={false}>
        <View className="flex flex-row  h-16">
          <View className="basis-1/4 ">
            <BackButton buttonClassName="mr-auto my-auto pl-4 h-10" onPress={handleGoBack} />
          </View>
          <View className="basis-1/2">
            <View className="w-16 h-16 mx-auto mb-9"><Leaf fill="#2db551" /></View>
          </View>
          <View className="basis-1/4 " />
        </View>
        <Text className="text-3xl font-bold mx-auto pt-4">{gardenprop}</Text>
        <View className="bg-green-500 rounded-full aspect-square w-48 mx-auto mt-10 py-10shadow-lg">
          <Text className="mx-auto my-auto text-5xl font-bold text-white">20%</Text>
        </View>
        <View className="w-[70%] mx-auto pt-8">
          <Text className="mx-auto text-2xl font-semibold">30%</Text>
          <Slider
            step={0.1}
            minimumValue={0}
            maximumValue={35}
            minimumTrackTintColor="rgba(255, 255, 2555, 1)'"
            maximumTrackTintColor="rgba(52, 52, 52, 0.3)'"
          // onValueChange={handleSlideChange}
          />
        </View>
        <View className="mt-36 rounded-t-[40rem] w-full h-96 bg-slate-800 shadow-xl shadow-black">
          <Text className="pt-2 mx-auto text-2xl text-white font-semibold">History</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

