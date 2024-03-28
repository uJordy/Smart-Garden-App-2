import { StyleSheet, Text, View , Switch, TouchableOpacity} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useState} from 'react'

const AutomationItem = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <TouchableOpacity className="mx-auto w-[90%] h-20 flex-1 flex-row justify-between bg-sky-500 rounded-lg drop-shadow-lg">
    <View className="pl-4 text-lg align-middle  content-center my-auto">
        <View className="flex flex-row content-center">
            <Text className= "text-white font-semibold text-xl">00:00</Text>
            <MaterialIcons className="mx-1 my-auto text-center text-white text-[10px] " name="circle"/>
            <Text className="align-middle text-xl text-white font-semibold">Automation Name</Text>
        </View>
        <Text className="text-white">Everyday</Text>  
    </View>
    <View className="flex items-center justify-center pr-4">
            <Switch
              trackColor={{false: '#075275', true: '#e9520e'}}
              thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#075275"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
        </View>
</TouchableOpacity>
  )
}
 export default AutomationItem;