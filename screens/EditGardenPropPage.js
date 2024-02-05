import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

export default function EditGardenPropPage() {

  return (
    <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-8' : ''}`}>
      <Text>EditGardenPropPage</Text>

    </SafeAreaView>
  )
}