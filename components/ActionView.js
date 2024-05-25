import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export class ActionView extends Component {
  render() {
    return (
      <View className="mx-auto w-[90%] my-2 mb-2 bg-white rounded-2xl">
        <Text className="pl-2 pt-2 text-lg text-gray-300">Actions</Text>
        <View className="mx-auto w-[90%] mt-2 mb-2 flex flex-row justify-evenly flex-wrap rounded-2xl">
          <TouchableOpacity className="w-[40%] bg-amber-500 rounded-2xl p-1 border-0 shadow">
            <Text className="text-xl mt-auto text-center text-white">Water Garden</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[40%] bg-purple-500 rounded-2xl p-1 border-0 shadow">
            <Text className="text-xl mt-auto text-center text-white">Toggle Blinds</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

export default ActionView