import { StyleSheet, Text, View , Switch, TouchableOpacity, Pressable} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useState} from 'react'

import Slider from '@react-native-community/slider';

import GardenPropDict from '../static/GardenPropDict';

import SunSVG from '../assets/svg/SunSVG'
import TemperatureSVG from '../assets/svg/TemperatureSVG'
import SoilMoisture from '../assets/svg/SoilMoisture'
import Humidity from '../assets/svg/Humidity'

import useStore from '../stores/garden'


function GardenPropIcon({type}) {

  if (type === "Temperature") {
    return <TemperatureSVG fill="#57534e"/> //15abeb
  } else if (type === "Light Intensity") {
    return <SunSVG fill="#57534e"/> //facc15
  } else if (type === "Soil Moisture") {
    return <SoilMoisture fill="#57534e"/> 
  } else if (type === "Humidity") {
    return <Humidity fill="#57534e"/> 
  }
}

const GardenPropItem = ({type, onPress}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [value, setValue] = useState(0);
  const gardata = useStore((state) => state.data)

  classStyling = "mx-auto w-[90%] h-28  rounded-2xl flex-1 flex-column drop-shadow-lg my-2"

  if (type === "Temperature") {
    classStyling += " bg-blue-200"
  } else if (type === "Light Intensity") {
    classStyling += " bg-yellow-200"
  } else if (type === "Soil Moisture") {
    classStyling += " bg-stone-200"
  } else if (type === "Humidity") {
    classStyling += " bg-red-200"
  }

  function handleSlideChange(newTemp) {
    setValue(newTemp)
  }

  return (
    <TouchableOpacity className={classStyling} onPress={() => onPress(type)}>

    <View className="h-[100%] w-full mx-auto flex-1 flex-row justify-between ">
      <View className="pl-4 text-lg align-middle  content-center my-auto ">
          <View className="flex flex-row content-center">

              <View className=""><GardenPropIcon type={type}/></View>
              <Text className= "px-2 text-stone-600 font-bold text-2xl my-auto min-w-[20%] text-center">{"N/A" && +value.toFixed(0) + GardenPropDict[type].Suffix}</Text>
              <MaterialIcons className="mx-1 my-auto text-center text-stone-600 text-[10px] " name="circle"/>
              <Text className="align-middle text-xl text-stone-600 font-semibold my-auto">{type} </Text>
          </View>
      </View>
      <View className="flex items-center justify-center pr-4 ">
        <Switch
          trackColor={{false: 'rgb(120,120,120,1)', true: 'rgba(255,255,255, 0.5)'}}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor= "rgba(120, 120, 120, 1)"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  <View className="w-[90%] mx-auto">
    <Slider
        step={GardenPropDict[type].Step}
        minimumValue={GardenPropDict[type].MinVal}
        maximumValue={GardenPropDict[type].MaxVal}
        minimumTrackTintColor="rgba(255, 255, 2555, 1)'"
        maximumTrackTintColor="rgba(52, 52, 52, 0.3)'"
        onValueChange={handleSlideChange}
        // value={gValue}
      />
  </View>
</TouchableOpacity>
  )
}
 export default GardenPropItem;