import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AutomationListEmptyComponent() {
  return (
    <View className="justify-center content-center mx-auto flex-row h-16">
      <Text className="my-auto">Press </Text>
      <View
        className="w-8 rounded-full bg-sky-500 shadow-md aspect-square my-auto"
      >
        <MaterialIcons className="w-full mx-auto my-auto text-center text-white text-[30px]" name="add" />
      </View>
      <Text className="my-auto"> to create new automation </Text>
    </View>
  )
}