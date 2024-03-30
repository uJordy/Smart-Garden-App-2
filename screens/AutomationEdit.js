import { View, SafeAreaView, ScrollView, Platform, Text, TouchableOpacity, TextInput, Button, Touchable } from 'react-native'
import React, { useState } from 'react'
import Animated, { useSharedValue, withSpring, FadeIn, FadeOut, Easing } from 'react-native-reanimated';

import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";

import BackButton from '../components/BackButton';
import Leaf from '../assets/svg/Leaf';
import DayButton from '../components/DayButton';
import AutomationTypeItem from '../components/AutomationTypeItem';

import GardenPropDict from '../static/GardenPropDict';

export default function AutomationEdit({ route, navigation }) {

  const [value, setValue] = useState(0); //Slider value
  const type = "Humidity";

  function handleSlideChange(newVal) {
    newVal = newVal.toFixed(0);
    setValue(newVal)
  }

  function handleGoBack() {
    navigation.goBack()
  }

  const _iconStyle = (borderColor) => ({
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: borderColor,
  });
  const styles = {
    container: { marginTop: 24 },
    verticalStyle: { marginTop: 16 },
    textStyle: { textDecorationLine: "none" },
    iconImageStyle: { height: 20, width: 20 },
  };
  const staticData = [
    {
      id: 0,
      fillColor: "#ff7473",
      unfillColor: "#fbbfbb",
      iconStyle: _iconStyle("#fbbfbb"),
      iconImageStyle: styles.iconImageStyle,
    },
    {
      id: 1,
      fillColor: "#5567e9",
      unfillColor: "#afb5f5",
      iconStyle: _iconStyle("#afb5f5"),
      iconImageStyle: styles.iconImageStyle,
    },
    {
      id: 2,
      fillColor: "#a98ae7",
      unfillColor: "#cab6f4",
      iconStyle: _iconStyle("#cab6f4"),
      iconImageStyle: styles.iconImageStyle,
    },
    {
      id: 3,
      fillColor: "#fcb779",
      unfillColor: "#ffd1a7",
      iconStyle: _iconStyle("#ffd1a7"),
      iconImageStyle: styles.iconImageStyle,
    },
    {
      id: 4,
      fillColor: "#2be055",
      unfillColor: "#cbf2d5",
      iconStyle: _iconStyle("#cbf2d5"),
      iconImageStyle: styles.iconImageStyle,
    },
  ];

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [checkboxState, setCheckboxState] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };



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
              <TouchableOpacity className="rounded-full bg-gray-800 px-5 py-2">
                <Text className="text-white font-semibold text-base">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Main Content */}
        <View className="mx-4">

          <View>
            <TextInput
              className="m-2 rounded-lg bg-gray-300 text-white p-2 border-gray-500 border-2 focus:border-amber-400"
              // onChangeText={}
              // value={number}
              placeholder="Automation Name"
            // keyboardType="numeric"
            />
          </View>

          <View className="flex flex-row flex-wrap justify-around mt-4">
            <AutomationTypeItem type="Temperature" />
            <AutomationTypeItem type="Light Intensity" />
            <AutomationTypeItem type="Soil Moisture" />
            <AutomationTypeItem type="Humidity" />
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
          <BouncyCheckbox
            // size={25}
            fillColor="red"
            unfillColor="#FFFFFF"
            // text="Custom Checkbox"
            iconStyle={{ borderColor: "red" }}
            // innerIconStyle={{ borderWidth: 2 }}
            isChecked={checkboxState}
            onPress={() => setCheckboxState(!checkboxState)}
            disableBuiltInState
          />

          <TouchableOpacity onPress={() => setCheckboxState(!checkboxState)}><Text>Hellooo!</Text></TouchableOpacity>

          {/* <BouncyCheckboxGroup
            data={staticData}
            onChange={(selectedItem) => {
              console.log("SelectedItem: ", JSON.stringify(selectedItem));
            }}
          /> */}

          <View className="mx-auto mt-20 flex-row justify-around">
            <Text className="my-auto font-semibold text-lg">Time</Text>
            <DateTimePicker
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
              <DayButton day="Monday" />
              <DayButton day="Tuesday" />
              <DayButton day="Wednesday" />
              <DayButton day="Thursday" />
              <DayButton day="Friday" />
              <DayButton day="Saturday" />
              <DayButton day="Sunday" />
            </View>
          </View>

          <View className="mt-20">
            <TouchableOpacity className="w-40 h-10 rounded-3xl bg-red-500 border-4 border-red-300 mx-auto mt-auto ">
              <Text className="text-lg mx-auto my-auto text-white font-bold">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}