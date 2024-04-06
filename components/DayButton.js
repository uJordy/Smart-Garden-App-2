import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

export default function DayButton({day, selected, onPress}) {

  return (
    <TouchableOpacity className={`aspect-square w-12 rounded-full ${selected ? 'bg-orange-500' : 'bg-gray-800'}`} onPress={() => onPress(day, !selected)}>
    <Text className={`m-auto text-lg ${selected ? 'text-white' : 'text-gray-300'}`}>{day.charAt(0)}</Text>
  </TouchableOpacity>
  )
}