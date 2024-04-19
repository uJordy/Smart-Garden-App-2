import { View, SafeAreaView, ScrollView, Platform, Text, TouchableOpacity, TextInput, Button, Touchable } from 'react-native'
import React, { useState } from 'react'
import Animated, { useSharedValue, withSpring, FadeIn, FadeOut, Easing } from 'react-native-reanimated';
import hash from 'hash-it';

import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';

import BackButton from '../components/BackButton';
import Leaf from '../assets/svg/Leaf';
import DayButton from '../components/DayButton';
import AutomationTypeItem from '../components/AutomationTypeItem';

import GardenPropDict from '../static/GardenPropDict';






export default function AutomationEdit({ route, navigation }) {

  const defaultType = "Temperature";
  const defaultTime = 1598051730000

  const { action, data } = route.params; //create or edit

  const [value, setValue] = useState(data.Value ?? 0); //Slider value
  const [type, setType] = useState(defaultType); //Slider value

  const [automationName, setAutomationName] = useState(data.Name ?? "");

  const submitAutomation = useStore((state) => state.submitAutomation)
  const deleteAutomation = useStore((state) => state.deleteAutomation)


  //Nav
  function handleGoBack() {
    navigation.goBack()
  }

  function handleSlideChange(newVal) {
    newVal = newVal.toFixed(0);
    setValue(newVal)
  }

  const [date, setDate] = useState(new Date(data.Time ?? defaultTime));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [selectedAutoType, setSelectedAutoType] = useState(data.Type ?? defaultType);

  initTState = false
  initLIState = false
  initSMState = false
  initHState = false

  if (data.Type === "Temperature") initTState = true;
  if (data.Type === "Light Intensity") initLIState = true;
  if (data.Type === "Soil Moisture") initSMState = true;
  if (data.Type === "Humidity") initHState = true;

  const [checkboxTState, setCheckboxTState] = useState(initTState); //Temperature
  const [checkboxLIState, setCheckboxLIState] = useState(initLIState); //Light Intensity
  const [checkboxSMState, setCheckboxSMState] = useState(initSMState); //Soil Moisture
  const [checkboxHState, setCheckboxHState] = useState(initHState); //Humidity

  const [selectedDay, setSelectedDay] = useState( //Used dictionary to prevent duplicates
    data.DaySelected ?? {
      ["Monday"]: false,
      ["Tuesday"]: false,
      ["Wednesday"]: false,
      ["Thursday"]: false,
      ["Friday"]: false,
      ["Saturday"]: false,
      ["Sunday"]: false,
    });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  function handleAutomationTypeToggle(type) {

    //Make all other checkboxes false
    //selectedAutoType is treated as previous value
    if (selectedAutoType == "Temperature") {
      setCheckboxTState(false)
    } else if (selectedAutoType == "Light Intensity") {
      setCheckboxLIState(false)
    } else if (selectedAutoType == "Soil Moisture") {
      setCheckboxSMState(false)
    } else if (selectedAutoType == "Humidity") {
      setCheckboxHState(false)
    }

    setSelectedAutoType(type)
    setType(type)

    //Toggle the clicked type true
    if (type == "Temperature") {
      setCheckboxTState(true)
    } else if (type == "Light Intensity") {
      setCheckboxLIState(true)
    } else if (type == "Soil Moisture") {
      setCheckboxSMState(true)
    } else if (type == "Humidity") {
      setCheckboxHState(true)
    }
  }

  function handleDaySelect(day, enabled) {
    setSelectedDay({
      ...selectedDay,
      [day]: enabled
    })
  }

  function handleAutomation() {
    //send data to stores which can be saved to expo file system
    console.log("handle automation!!")
    if (typeof (automationName) !== "string") {
      warn("Automation name is not a string")
      return "auto string"
    }

    if (automationName.length > 20) {
      warn("Automation name is too long")
      return "auto length"
    }

    //Check if automation type is valid
    found = false;
    for (let type in GardenPropDict) {
      if (selectedAutoType === type) {
        found = true;
        break
      }
    }
    if (!found) {
      warn("Automation type invalid")
      return "auto type"
    }

    if (value < GardenPropDict[selectedAutoType].MinVal) {
      warn("Automation value smaller than min")
      return "slider min"
    }
    if (value > GardenPropDict[selectedAutoType].MaxVal) {
      warn("Automation value bigger than max")
      return "slider max"
    }

    if (date.constructor !== Date) {
      warn("Date object actually not date")
      return "date invalid"
    }

    const hashValue = hash(automationName)
    let data = {
      [hashValue]: {
        Name: automationName,
        Enabled: true,
        Type: type,
        Value: value,
        Time: date.toJSON(),
        DaySelected: selectedDay
      }
    }

    submitAutomation(hashValue, data);
    navigation.goBack()
  }

  function handleDeleteAutomation() {
    const hashValue = hash(automationName)
    navigation.goBack()
    deleteAutomation(hashValue);
  }


  return (
    <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-8' : ''} `}>
      <ScrollView>
        {/* Top Bar */}
        <View className="flex flex-row  h-16">
          <View className="basis-1/4 ">
            <BackButton buttonClassName="mr-auto my-auto pl-4 h-10" onPress={handleGoBack} />
          </View>
          <View className="basis-1/2">
            <View className="w-16 h-16 mx-auto mb-9"><Leaf fill="#2db551" /></View>
          </View>
          <View className="basis-1/4 ">
            <View className="ml-auto pr-4 my-auto ">
              <TouchableOpacity className="rounded-full bg-gray-800 px-5 py-2" onPress={handleAutomation}>
                <Text className="text-white font-semibold text-base">{`${action === "create" ? "Create" : "Save"}`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Main Content */}
        <View className="mx-4">

          <View>
            {action === "create" ? (
              <TextInput
                className="m-2 rounded-lg bg-gray-300 text-black p-2 border-gray-500 border-2 focus:border-amber-400"
                onChangeText={setAutomationName}
                value={automationName}
                maxLength={20}
                placeholder="Automation Name"
              />) :
              (<Text className="m-2 font-semibold text-2xl">{automationName}</Text>)}
          </View>

          <View className="flex flex-row flex-wrap justify-around mt-4">
            <AutomationTypeItem type="Temperature"
              checkboxState={checkboxTState}
              onPress={handleAutomationTypeToggle} />
            <AutomationTypeItem type="Light Intensity"
              checkboxState={checkboxLIState}
              onPress={handleAutomationTypeToggle} />
            <AutomationTypeItem type="Soil Moisture"
              checkboxState={checkboxSMState}
              onPress={handleAutomationTypeToggle} />
            <AutomationTypeItem type="Humidity"
              checkboxState={checkboxHState}
              onPress={handleAutomationTypeToggle} />
          </View>

          <View className="flex-row bg-gray-300 rounded-full p-2 m-2 justify-between mt-4">
            <Animated.Text
              className="my-auto text-xl font-bold text-white w-18"
              entering={FadeIn.duration(500).easing(Easing.ease).delay(400)} exiting={FadeOut}>
              {value + GardenPropDict[type].Suffix}
            </Animated.Text>
            <View className="basis-4/5">
              <Slider
                step={GardenPropDict[type].Step}
                minimumValue={GardenPropDict[type].MinVal}
                maximumValue={GardenPropDict[type].MaxVal}
                minimumTrackTintColor="rgba(255, 255, 2555, 1)'"
                maximumTrackTintColor="rgba(52, 52, 52, 0.3)'"
                onValueChange={handleSlideChange}
                value={value}
              />
            </View>
          </View>

          <View className="mx-auto flex-row justify-around">
            <Text className="my-auto font-semibold text-lg">Time</Text>
            <DateTimePicker
              display="spinner"
              value={date}
              mode={"time"}
              is24Hour={true}
              onChange={onChange}
            />
          </View>

          {/* Select day indicator needed here */}
          <View className="mt-4 mx-2 bg-gray-300 rounded-2xl">
            <Text className="ml-2 mt-2 text-lg font-semibold">Repeat</Text>

            <View className="flex flex-row justify-around mx-2 my-4">
              <DayButton day="Monday" selected={selectedDay["Monday"]} onPress={handleDaySelect} />
              <DayButton day="Tuesday" selected={selectedDay["Tuesday"]} onPress={handleDaySelect} />
              <DayButton day="Wednesday" selected={selectedDay["Wednesday"]} onPress={handleDaySelect} />
              <DayButton day="Thursday" selected={selectedDay["Thursday"]} onPress={handleDaySelect} />
              <DayButton day="Friday" selected={selectedDay["Friday"]} onPress={handleDaySelect} />
              <DayButton day="Saturday" selected={selectedDay["Saturday"]} onPress={handleDaySelect} />
              <DayButton day="Sunday" selected={selectedDay["Sunday"]} onPress={handleDaySelect} />
            </View>
          </View>

          {action === "edit" ? (
            <View className="mt-6">
              <TouchableOpacity className="w-40 h-10 rounded-3xl bg-red-500 border-4 border-red-300 mx-auto mt-auto " onPress={handleDeleteAutomation}>
                <Text className="text-lg mx-auto my-auto text-white font-bold">Delete</Text>
              </TouchableOpacity>
            </View>) : ""}

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}