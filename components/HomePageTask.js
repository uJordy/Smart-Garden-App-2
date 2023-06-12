import React, { Component } from "react";
import { TouchableOpacity, View, Image, Text, TouchableHighlight } from "react-native";



function HomePageTask({ type }) {

  const imgSource =
    //   (type === 'fertilise') ? '../assets/img/fertiliser.png' :
    //     (type === 'water') ? '../assets/img/drop.png' : '';

    (type === 'fertilise') ? require('../assets/img/fertiliser.png') :
      (type === 'water') ? require('../assets/img/drop.png') : require('../assets/img/drop.png');


  return (
    <TouchableOpacity className="h-20 w-[95%] mx-auto">
      <View className="flex flex-row items-center mx-auto my-auto rounded-full w-full h-full p-2">
        <Image
          className="w-16 h-16 rounded-full"
          resizeMode="cover"
          source={require("../assets/img/exampleplant.webp")}
        />

        <View className="flex flex-column w-1/2 ml-2 ">
          <Text className="h-[40%] text-xl font-bold">Plant Name</Text>
          <Text className="h-[40%] text-red-500">Over due by 3 days</Text>
        </View>

        <TouchableOpacity className="w-12 h-12 rounded-full ">
          <Image
            className="w-[50%] h-[50%] mx-auto my-auto"
            resizeMode="contain"
            source={require("../assets/img/snooze.png")}
          />
        </TouchableOpacity>
        
        <TouchableOpacity className="w-12 h-12 rounded-full bg-slate-100">
          <Image
            className="w-[50%] h-[50%] mx-auto my-auto"
            resizeMode="contain"
            source={require("../assets/img/check.png")}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default HomePageTask;

