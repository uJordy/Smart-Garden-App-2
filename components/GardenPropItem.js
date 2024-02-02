import { StyleSheet, Text, View , Switch, TouchableOpacity} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useState} from 'react'
import SunSVG from '../assets/svg/SunSVG'
import Slider from '@react-native-community/slider';

const GardenPropItem = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // const [temperature, setTemperature] = useState(props.value ?? 0);
  const [temperature, setTemperature] = useState(0);

  const [slideStartingValue, setSlideStartingValue] = useState(0);
  const [slideStartingCount, setSlideStartingCount] = useState(0);

  function handleSlideChange(newTemp) {
    // console.log(newTemp)
    setTemperature(newTemp)
  }

  return (
    <TouchableOpacity className="mx-auto w-[90%] h-28 bg-slate-500 rounded-2xl flex-1 flex-column drop-shadow-lg">

    <View className="h-[100%] w-full mx-auto flex-1 flex-row justify-between ">
      <View className="pl-4 text-lg align-middle  content-center my-auto ">
          <View className="flex flex-row content-center">

              <View className=""><SunSVG fill="#facc15"/></View>
              <Text className= "pl-2 text-white font-bold text-2xl my-auto">{temperature && +temperature.toFixed(3)}</Text>
              <MaterialIcons className="mx-1 my-auto text-center text-white text-[10px] " name="circle"/>
              <Text className="align-middle text-xl text-white font-semibold my-auto">Temperature </Text>
          </View>
          {/* <Text className="text-white">Everyday</Text>  */}
      </View>
      <View className="flex items-center justify-center pr-4 ">
        <Switch
          trackColor={{false: '#075275', true: '#e9520e'}}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#075275"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  <View className="w-[90%] mx-auto">
    <Slider
        step={0.5}
        minimumValue={0}
        maximumValue={35}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#334155"
        onValueChange={handleSlideChange}
        temperature = {temperature}
      />
    {/* <Slider
        onSlidingStart={value => {
          setSlideStartingValue(value);
          setSlideStartingCount(prev => prev + 1);
        }}
      /> */}
            {/* <Text>
        Starts: {slideStartingCount} Value: {slideStartingValue}
      </Text> */}
  </View>
</TouchableOpacity>
  )
}
 export default GardenPropItem;