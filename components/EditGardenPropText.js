import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import Animated, { useSharedValue, withSpring, withRepeat, FadeIn, FadeOut, Easing, useAnimatedStyle, interpolateColor, withTiming } from 'react-native-reanimated';
import GardenPropDict from '../static/GardenPropDict';

import useStore from '../stores/garden';


const EditGardenPropText = ({type, cancelColorAnim}) => {

  const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date())
  const CurrentSensorValue = useStore((state) => state.CurrentSensorValue)

  const gardata = useStore((state) => state.data)

  useEffect(() => {
    setTimeout(() => {
      // console.log("refresh");
      setFakeCurrentDate(new Date())
    }
      , 1000)
  }, [fakeCurrentDate])

  function getValue() { //To compensate for dictionary name "Light" / "Light Intensity"
    if (type === "Light Intensity") {
      return parseInt(gardata["Light"].Value)
    } else if (type === "Soil Moisture") {
      return parseInt(gardata["SoilMoisture"].Value)
    } else {
      return parseInt(gardata[type].Value)
    }
  }

  if (CurrentSensorValue(type) === parseInt(getValue().toFixed(0))) { 
    cancelColorAnim();
  }

  return (
    <Animated.Text
      className="mx-auto my-auto text-5xl font-bold text-white"
      entering={FadeIn.duration(500).easing(Easing.ease).delay(400)} exiting={FadeOut}>
      {CurrentSensorValue(type) + GardenPropDict[type].Suffix}
    </Animated.Text>
  )
}

export default EditGardenPropText