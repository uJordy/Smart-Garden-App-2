import { TouchableOpacity, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'

import BouncyCheckbox from "react-native-bouncy-checkbox";

import SunSVG from '../assets/svg/SunSVG'
import TemperatureSVG from '../assets/svg/TemperatureSVG'
import SoilMoisture from '../assets/svg/SoilMoisture'
import Humidity from '../assets/svg/Humidity'

// function GardenPropIcon({ type }) {

//   if (type === "Temperature") {
//     return <TemperatureSVG fill="#cbd5e1" />
//   } else if (type === "Light Intensity") {
//     return <SunSVG fill="#cbd5e1" />
//   } else if (type === "Soil Moisture") {
//     return <SoilMoisture fill="#cbd5e1" />
//   } else if (type === "Humidity") {
//     return <Humidity fill="#cbd5e1" />
//   }
// }

function GardenPropIcon({ type }) {



  if (type === "Temperature") {
    return <TemperatureSVG fill="#57534e" /> //15abeb
  } else if (type === "Light Intensity") {
    return <SunSVG fill="#57534e" /> //facc15
  } else if (type === "Soil Moisture") {
    return <SoilMoisture fill="#57534e" />
  } else if (type === "Humidity") {
    return <Humidity fill="#57534e" />
  }
}


export default function AutomationTypeItem({ type }) {

  var classStyling = ""
  const [checkboxState, setCheckboxState] = useState(false);

  if (type === "Temperature") {
    classStyling += " bg-blue-200"
  } else if (type === "Light Intensity") {
    classStyling += " bg-yellow-200"
  } else if (type === "Soil Moisture") {
    classStyling += " bg-stone-200"
  } else if (type === "Humidity") {
    classStyling += " bg-red-200"
  }

  return (
    <TouchableOpacity
      className={"m-1 w-[47%] h-14 rounded-full active:border-violet-700 border-gray-500 border-2" + classStyling}>
      <View className="flex flex-row my-auto justify-around w-full">
        <View className="ml-2 w-8 "><GardenPropIcon type={type} /></View>
        <Text className="pl-2 m-auto text-gray-600 grow font-semibold">{type}</Text>
        <View className="">
          <BouncyCheckbox
            className="m-auto mx-auto ml-2"
            // size={25}
            fillColor="#6b7280"
            unfillColor="#f3f4f6"
            // text="Custom Checkbox"
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            isChecked={checkboxState}
            onPress={() => setCheckboxState(!checkboxState)}
            disableBuiltInState
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}