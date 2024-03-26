import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

import SunSVG from '../assets/svg/SunSVG'
import TemperatureSVG from '../assets/svg/TemperatureSVG'
import SoilMoisture from '../assets/svg/SoilMoisture'
import Humidity from '../assets/svg/Humidity'

function GardenPropIcon({ type }) {

  if (type === "Temperature") {
    return <TemperatureSVG fill="#cbd5e1" />
  } else if (type === "Light Intensity") {
    return <SunSVG fill="#cbd5e1" />
  } else if (type === "Soil Moisture") {
    return <SoilMoisture fill="#cbd5e1" />
  } else if (type === "Humidity") {
    return <Humidity fill="#cbd5e1" />
  }
}

export default function AutomationTypeItem({ type }) {
  return (
    <TouchableOpacity className="m-1 bg-slate-800 w-[45%] h-14 rounded-full">
      <View className="flex flex-row my-auto justify-around w-full">
        <View className="ml-2 "><GardenPropIcon type={type} /></View>
        <Text className="pl-2 m-auto text-lg text-slate-300 grow ">{type}</Text>
      </View>
      {/* <Text className="m-auto text-lg text-white">{type.charAt(0)}</Text> */}
    </TouchableOpacity>
  )
}