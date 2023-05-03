import React, { useLayoutEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function PlantPage(props) {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);
  return (
    <ScrollView>
      <View className="h-[480px] bg-blue-600 shadow-2xl rounded-bl-[60px] rounded-br-[60px]">
        <View className="flex-1 overflow-hidden rounded-bl-[60px] rounded-br-[60px]">
          <Image className="absolute w-full h-full z-10" backgroundColor='#dee5db' source={require("../assets/img/exampleplant3.webp")} />
        </View> 
      </View>
      <View className="mx-3 mt-12">
        <Text className="text-4xl font-bold">Basil</Text>
        <Text className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui reiciendis tenetur nostrum earum aliquam, maxime quam optio tempora quod temporibus sapiente excepturi dignissimos inventore hic consequatur dolores sunt architecto doloribus.</Text>
      </View>
    </ScrollView>
  )
}

export default PlantPage