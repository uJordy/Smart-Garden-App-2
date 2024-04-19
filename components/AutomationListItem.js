import {Text, View, Switch, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState } from 'react';
import hash from 'hash-it';

import SunSVG from '../assets/svg/SunSVG'
import TemperatureSVG from '../assets/svg/TemperatureSVG'
import SoilMoisture from '../assets/svg/SoilMoisture'
import Humidity from '../assets/svg/Humidity'

import useStore from '../stores/garden';

const AutomationItem = ({ data, onPress }) => {
  
  const toggleAutomation = useStore((state) => state.toggleAutomation)
  const [isEnabled, setIsEnabled] = useState(data.Enabled);

  const toggleSwitch = () => {
    toggleAutomation(hash(data.Name), !isEnabled)
    setIsEnabled(previousState => !previousState)

  };

  daySelected = data.DaySelected;
  time = new Date(data["Time"]);
  type = data.Type;

  const daysSelectedParsed = () => {
    if (
      daySelected["Monday"] === true &&
      daySelected["Tuesday"] === true &&
      daySelected["Wednesday"] === true &&
      daySelected["Thursday"] === true &&
      daySelected["Friday"] === true &&
      daySelected["Saturday"] === true &&
      daySelected["Sunday"] === true
    ) {
      return "Everyday"
    } else if (
      daySelected["Monday"] === true &&
      daySelected["Tuesday"] === true &&
      daySelected["Wednesday"] === true &&
      daySelected["Thursday"] === true &&
      daySelected["Friday"] === true
    ) {
      return "Weekdays"
    } else if (
      daySelected["Saturday"] === true &&
      daySelected["Sunday"] === true
    ) {
      return "Weekend"
    }
    else {
      daysStr = ""

      for (let key in daySelected) {
        if (daySelected[key] === true) {
          if (daysStr === "") { //to avoid adding comma at beginning of string
            daysStr += " " + key
          } else {
            daysStr += ", " + key
          }

        }
      }
      if (daysStr === "") {
        return "No days selected"
      }
      return daysStr
    }
  }

  function GardenPropIcon({ type }) {
    if (type === "Temperature") {
      return <TemperatureSVG fill="#fff" /> //15abeb
    } else if (type === "Light Intensity") {
      return <SunSVG fill="#fff" /> //facc15
    } else if (type === "Soil Moisture") {
      return <SoilMoisture fill="#fff" />
    } else if (type === "Humidity") {
      return <Humidity fill="#fff" />
    }
  }

  return (
    <TouchableOpacity className="mx-auto w-[90%] h-20 flex-1 flex-row justify-between bg-sky-500 rounded-lg drop-shadow-lg my-1" onPress={() => onPress(type)}>
      <View className="pl-4 text-lg my-auto w-[80%] ">
        <View className="flex flex-row content-center">
          <View className="h-6 aspect-square my-auto mr-2"><GardenPropIcon type={type} /></View>
          <Text className="text-white font-semibold text-xl">{time.getHours() + ":" + time.getMinutes()}</Text>
          <MaterialIcons className="mx-1 my-auto text-center text-white text-[10px] " name="circle" />
          <Text className="align-middle text-lg text-white font-semibold w-[65%] h-[100%] text-wrap grow">{data["Name"]}</Text>
        </View>
        <Text className="text-white">{daysSelectedParsed()}</Text>
      </View>
      <View className="flex items-center justify-center pr-4 ">
        <Switch
          trackColor={{ false: '#075275', true: '#e9520e' }}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#075275"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </TouchableOpacity>
  )
}
export default AutomationItem;