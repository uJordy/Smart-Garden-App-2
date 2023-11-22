import React, { Component } from "react";
import { TouchableOpacity, View, Image } from "react-native";



function HomePage({ type }) {

  const imgSource =
  //   (type === 'fertilise') ? '../assets/img/fertiliser.png' :
  //     (type === 'water') ? '../assets/img/drop.png' : '';

    (type === 'fertilise') ? require('../assets/img/fertiliser.png') :
      (type === 'water') ? require('../assets/img/drop.png') : require('../assets/img/drop.png');


  return (
    <TouchableOpacity className={`border-[3px] border-sky-600 ${type === 'fertilise' ? 'border-orange-300' : ''} mx-2 rounded-full h-16 w-16 aspect-square`}>
      <View className="mx-auto my-auto grid rounded-full w-[90%] h-[90%]">
        <Image
          className="w-full h-full rounded-full place-self-center"
          resizeMode="cover"
          source={require("../assets/img/exampleplant.webp")}
        />
        <Image
          className="w-2/4 h-2/4 absolute z-20 float-right left-0 top-[-8px]"
          resizeMode="cover"
          source={imgSource}

        />
      </View>
    </TouchableOpacity>
  );
}

export default HomePage;

