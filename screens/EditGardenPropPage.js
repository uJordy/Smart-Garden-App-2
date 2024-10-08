import { View, Text, SafeAreaView, ScrollView, Switch, Platform, Button } from 'react-native'
import React, {useState } from 'react'
import Animated, { useSharedValue, withSpring, withRepeat, FadeIn, FadeOut, Easing, useAnimatedStyle, interpolateColor, withTiming, withSequence, cancelAnimation } from 'react-native-reanimated';

import Leaf from '../assets/svg/Leaf'
import BackButton from '../components/BackButton';
import LineChart from '../components/LineChart';
import Slider from '@react-native-community/slider';

import GardenPropDict from '../static/GardenPropDict';
import useStore from '../stores/garden'
import EditGardenPropText from '../components/EditGardenPropText';


export default function EditGardenPropPage({ route, navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const { gardenprop } = route.params;
  const [type] = useState(gardenprop)

  const [value, setValue] = useState(0); //Slider value

  // Zustand stores

  const gardata = useStore((state) => state.data)

  const setTemperature = useStore((state) => state.setTemperature)
  const setLight = useStore((state) => state.setLight)
  const setSoilMoisture = useStore((state) => state.setSoilMoisture)
  const setHumidity = useStore((state) => state.setHumidity)

  const addTemperatureHistory = useStore((state) => state.addTemperatureHistory)
  const addLightHistory = useStore((state) => state.addLightHistory)
  const addSoilMoistureHistory = useStore((state) => state.addSoilMoistureHistory)
  const addHumidityHistory = useStore((state) => state.addHumidityHistory)

  const CurrentSensorValue = useStore((state) => state.CurrentSensorValue)

  const [slide_debounce, setDebounce] = useState(false);



  //If target value === current value then go green 
  if (CurrentSensorValue(type) !== parseInt(getValue().toFixed(0))) {
    initValue = 0
  } else {
    initValue = 2
  }
  const progress = useSharedValue(initValue);

  const animatedStyle = useAnimatedStyle(() => {  //Animates between different colours depending on its target value status
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1, 2],
        ['red', 'orange', 'green']
      ),
    };
  });

  if (CurrentSensorValue(type) !== parseInt(getValue().toFixed(0))) { //If current value !== target value, flash orange and red on indicator
    // if the current value is equal to target
    progress.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      withTiming(0, { duration: 1000 })
      , -1);
  }

  function cancelColorAnim() {
    cancelAnimation(progress)
    progress.value = withSequence(withTiming(2))
  }
  function handleGoBack() {
    navigation.goBack()
  }

  function handleSlideChange(newVal) {
    setValue(newVal)
  }

  function handleSlideComplete(newVal) {
    if (slide_debounce) return

    setDebounce(true)
    setTimeout(() => {
      setDebounce(false)
    }, 500)

    newVal = newVal.toFixed(0)
    console.log("[ADD HISTORY] Adding history for: " + type)
    if (type === "Temperature") {
      setTemperature(newVal)
      addTemperatureHistory(newVal)
    } else if (type === "Light Intensity") {
      setLight(newVal)
      addLightHistory(newVal)
    } else if (type === "Soil Moisture") {
      setSoilMoisture(newVal)
      addSoilMoistureHistory(newVal)
    } else if (type === "Humidity") {
      setHumidity(newVal)
      addHumidityHistory(newVal)
    }
  }

  function getValue() { //To compensate for dictionary name "Light" / "Light Intensity"
    if (type === "Light Intensity") {
      return parseInt(gardata["Light"].Value)
    } else if (type === "Soil Moisture") {
      return parseInt(gardata["SoilMoisture"].Value)
    } else {
      return parseInt(gardata[type].Value)
    }
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
        <Animated.View className="rounded-full aspect-square w-48 mx-auto mt-10 py-10shadow-lg" style={[animatedStyle]}>
          <EditGardenPropText type={type} cancelColorAnim={cancelColorAnim} />
        </Animated.View>
        <View className="w-[70%] mx-auto pt-8">
          <Text className="mx-auto text-2xl font-semibold">{"N/A" && "Target: " + getValue().toFixed(0) + GardenPropDict[type].Suffix}</Text>
          <Slider
            step={GardenPropDict[type].Step}
            minimumValue={GardenPropDict[type].MinVal}
            maximumValue={GardenPropDict[type].MaxVal}
            minimumTrackTintColor="rgba(255, 255, 2555, 1)'"
            maximumTrackTintColor="rgba(52, 52, 52, 0.3)'"
            onValueChange={handleSlideChange}
            onSlidingComplete={handleSlideComplete}
            value={getValue()}
          />
        </View>

        <View className="mt-36 rounded-t-[40rem] w-full h-96 bg-slate-800 shadow-xl shadow-black">
          <Text className="pt-2 mx-auto text-2xl text-white font-semibold">History</Text>
          <View className="bg-slate-800">
            <Text className="mx-auto bg-slate-800 text-xl text-white font-semibold">Last week</Text>
          </View>
          <LineChart type={type} />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

