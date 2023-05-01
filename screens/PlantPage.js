import React, { useLayoutEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function PlantPage(props) {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Plants</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PlantPage