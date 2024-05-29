import { Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Animated, { useSharedValue, FadeIn, FadeOut, Easing, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

import useStore from '../stores/garden';

const ActionView = () => {

  const waterGarden = useStore((state) => state.waterGarden)
  const getBlinds = useStore((state) => state.getBlinds)
  const toggleBlinds = useStore((state) => state.toggleBlinds)
  const blinds = useStore((state) => state.data.BlindsOpen)
  const [waterRes, setWaterRes] = useState([null, null]); //Response from watering action
  const feedbackTransparency = useSharedValue(1);
  // const blinds = getBlinds()


  const opacityStyle = useAnimatedStyle(() => ({
    opacity: feedbackTransparency.value,
  }));

  function handleWaterGarden() {
    var [success, res] = waterGarden();
    setWaterRes([success, res])
    feedbackTransparency.value = 1
  }

  function handleBlinds() {
    toggleBlinds()
  }

  if (waterRes !== null) {
    feedbackTransparency.value = withDelay(5000, withTiming(0, { duration: 1000 }));
  }
  return (
    <View className="mx-auto w-[90%] my-2 mb-2 bg-white rounded-2xl">
      <Text className="pl-2 pt-2 text-lg text-gray-300">Actions</Text>
      <View className="mx-auto w-[90%] mt-2 mb-2 flex flex-row justify-evenly flex-wrap rounded-2xl">
        <TouchableOpacity className="w-[40%] bg-amber-500 rounded-2xl p-1 border-0 shadow"
          onPress={handleWaterGarden}>
          <Text className="text-xl mt-auto text-center text-white">Water Garden</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[40%] bg-purple-500 rounded-2xl p-1 border-0 shadow" onPress={handleBlinds}>
          <Text className="text-xl mt-auto text-center text-white">{blinds ? "Close Blinds" : "Open Blinds"}</Text>
        </TouchableOpacity>
      </View>

      {!waterRes[0] ? //accepts nulls
        <Animated.Text
          className="mx-auto text-lg text-red-500"
          style={[opacityStyle]}
          entering={FadeIn.duration(500).easing(Easing.ease).delay(400)} exiting={FadeOut}
        >{waterRes[1]}</Animated.Text>
        :
        <Animated.Text
          className="mx-auto text-lg text-green-500"
          style={[opacityStyle]}
          entering={FadeIn.duration(500).easing(Easing.ease).delay(400)} exiting={FadeOut}
        >{waterRes[1]}</Animated.Text>
      }

      {/* entering={FadeIn.duration(500).easing(Easing.ease).delay(400)} exiting={FadeOut} */}
    </View>
  )
}

export default ActionView