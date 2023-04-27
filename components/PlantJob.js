import React, { Component } from "react";

export default class PlantJob extends Component {
  render() {
    return (
      <TouchableOpacity className="border-[3px] border-sky-600 mx-2 rounded-full h-16  w-16 aspect-square">
        <View className="mx-auto my-auto grid rounded-full w-[90%] h-[90%]">
          <Image
            className="w-full h-full rounded-full place-self-center"
            resizeMode="cover"
            source={require("../app/assets/exampleplant.webp")}
          />
          <Image
            className="w-2/4 h-2/4 absolute z-20 float-right left-0"
            resizeMode="cover"
            source={require("../app/assets/drop.png")}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
