import React, { useLayoutEffect } from "react";
import { Text, View, SafeAreaView, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Heart from '../assets/svg/heart-o.svg'

function PlantPage(props) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView>
      <View className="h-[480px] bg-blue-600 shadow-2xl rounded-bl-[60px] rounded-br-[60px]">
        <View className="flex-1 overflow-hidden rounded-bl-[60px] rounded-br-[60px]">
          <Image
            className="absolute w-full h-full z-10"
            backgroundColor="#dee5db"
            source={require("../assets/img/exampleplant3.webp")}
          />
        </View>
      </View>
      <View className="mx-3 mt-12">
        <View className="flex-1 flex-row justify-between">
          <Text className="text-4xl font-bold">Not ALong PlantName</Text>
          {/* <Image
          className="h-5 w-5 stroke-blue-500"
          source={require("../assets/svg/heart-o.svg")}
          /> */}
          <View className="pr-8">
            <Heart width={35} height={35} fill={"red"} stroke={"red"}/>
          </View>
        </View>
        <Text className="mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
          reiciendis tenetur nostrum earum aliquam, maxime quam optio tempora
          quod temporibus sapiente excepturi dignissimos inventore hic
          consequatur dolores sunt architecto doloribus.
        </Text>
      </View>
    </ScrollView>
  );
}

export default PlantPage;
