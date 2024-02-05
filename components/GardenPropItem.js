import { StyleSheet, Text, View , Switch, TouchableOpacity} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useState} from 'react'
import SunSVG from '../assets/svg/SunSVG'
import TemperatureSVG from '../assets/svg/TemperatureSVG'
import Slider from '@react-native-community/slider';

function GardenPropIcon({type}) {
  if (type === "Temperature") {
    return <TemperatureSVG fill="#fff"/> //15abeb
  } else if (type === "Light Intensity") {
    return <SunSVG fill="#fff"/> //facc15
  }
}


const GardenPropItem = ({type}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // const [temperature, setTemperature] = useState(props.value ?? 0);
  const [temperature, setTemperature] = useState(0);
  classStyling = "mx-auto w-[90%] h-28  rounded-2xl flex-1 flex-column drop-shadow-lg my-2"

  if (type === "Temperature") {
    classStyling += " bg-sky-500"
  } else if (type === "Light Intensity") {
    classStyling += " bg-yellow-500"
  }

  function handleSlideChange(newTemp) {
    // console.log(newTemp)
    setTemperature(newTemp)
  }

  return (
    <TouchableOpacity className={classStyling}>

    <View className="h-[100%] w-full mx-auto flex-1 flex-row justify-between ">
      <View className="pl-4 text-lg align-middle  content-center my-auto ">
          <View className="flex flex-row content-center">

              <View className=""><GardenPropIcon type={type}/></View>
              <Text className= "pl-2 text-white font-bold text-2xl my-auto w-20 text-center">{temperature + "°C" && +temperature.toFixed(0) + "°C"}</Text>
              <MaterialIcons className="mx-1 my-auto text-center text-white text-[10px] " name="circle"/>
              <Text className="align-middle text-xl text-white font-semibold my-auto">{type} </Text>
          </View>
          {/* <Text className="text-white">Everyday</Text>  */}
      </View>
      <View className="flex items-center justify-center pr-4 ">
        <Switch
          trackColor={{false: '#075275', true: 'rgba(255,255,255,0.6)'}}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="rgba(52, 52, 52, 0.3)"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  <View className="w-[90%] mx-auto">
    <Slider
        step={0.1}
        minimumValue={0}
        maximumValue={35}
        minimumTrackTintColor="rgba(255, 255, 2555, 1)'"
        maximumTrackTintColor="rgba(52, 52, 52, 0.3)'"
        onValueChange={handleSlideChange}
      />
  </View>
</TouchableOpacity>
  )
}
 export default GardenPropItem;