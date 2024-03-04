import { View, Text, SafeAreaView, ScrollView, Switch } from 'react-native'
import React, { useContext, useState } from 'react'

import Leaf from '../assets/svg/Leaf'
import BackButton from '../components/BackButton';
import LineChart from '../components/LineChart';
import Slider from '@react-native-community/slider';


import GardenPropDict from '../static/GardenPropDict';


export default function EditGardenPropPage({ route, navigation }) {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const { gardenprop } = route.params;
  const type = gardenprop

  const [value, setValue] = useState(0); //Garden prop value

  propHistory = useContext(DataContext);
  console.log(propHistory)

  function handleGoBack() {
    navigation.goBack()
  }


  function handleSlideChange(newTemp) {
    setValue(newTemp)
  }

  function handleSlideComplete(newTemp) {
    //Save data to database
    // console.log(Date.now())

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
          <View className="basis-1/4 ">
            <View className="ml-auto pr-4 my-auto ">
              <Switch
                trackColor={{ false: 'rgb(120,120,120,1)', true: 'rgba(181, 45, 145, 1)' }}
                thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="rgba(120, 120, 120, 1)"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>
        <Text className="text-3xl font-bold mx-auto pt-4">{type}</Text>
        <View className="bg-green-500 rounded-full aspect-square w-48 mx-auto mt-10 py-10shadow-lg">
          <Text className="mx-auto my-auto text-5xl font-bold text-white">20%</Text>
        </View>
        <View className="w-[70%] mx-auto pt-8">
          <Text className="mx-auto text-2xl font-semibold">{"N/A" && "Target: " + value.toFixed(0) + GardenPropDict[type].Suffix}</Text>
          <Slider
            step={GardenPropDict[type].Step}
            minimumValue={GardenPropDict[type].MinVal}
            maximumValue={GardenPropDict[type].MaxVal}
            minimumTrackTintColor="rgba(255, 255, 2555, 1)'"
            maximumTrackTintColor="rgba(52, 52, 52, 0.3)'"
            onValueChange={handleSlideChange}
            onSlidingComplete={handleSlideComplete}
          />
        </View>

        <View className="mt-36 rounded-t-[40rem] w-full h-96 bg-slate-800 shadow-xl shadow-black">
          <Text className="pt-2 mx-auto text-2xl text-white font-semibold">History</Text>
          <View className="bg-slate-50 mt-5">
            <Text className="mx-auto">Dropdown menu</Text>
          </View>
          <LineChart type={type} chartClassName="pt-6" />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

