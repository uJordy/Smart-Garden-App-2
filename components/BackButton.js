import { View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

import Back from '../assets/svg/Back';

// export default function BackButton({ hello }) {
export default BackButton = ({buttonClassName,onPress}) => {

  // export default class BackButton extends Component {
  // console.log(prop.className)

  return (
    <View className={buttonClassName}>
      <TouchableOpacity 
      className="bg-slate-800 aspect-square w-full h-full rounded-full" 
      onPress={onPress}
      >
        <View className="h-[70%] w-[70%] mx-auto my-auto ">
          <Back fill="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  )
}
