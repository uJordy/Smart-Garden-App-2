import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

export default function DayButton({day}) {
  return (
    <TouchableOpacity className="aspect-square bg-slate-800 w-12 rounded-full">
    <Text className="m-auto text-lg text-white">{day.charAt(0)}</Text>
  </TouchableOpacity>
  )
}