import { StyleSheet, Text, View , Switch, TouchableOpacity} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useState} from 'react'

const AutomationItem = ({data, onPress}) => {
  const [isEnabled, setIsEnabled] = useState(data.Enabled);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  DaySelected = data.DaySelected;
  time = new Date(data["Time"]);

  const daysSelectedParsed = () => {
    if (
      DaySelected["Monday"] === true &&
      DaySelected["Tuesday"] === true &&
      DaySelected["Wednesday"] === true &&
      DaySelected["Thursday"] === true &&
      DaySelected["Friday"] === true &&
      DaySelected["Saturday"] === true &&
      DaySelected["Sunday"] === true
    ) {
      return "Everyday"
    } else if (
      DaySelected["Monday"] === true &&
      DaySelected["Tuesday"] === true &&
      DaySelected["Wednesday"] === true &&
      DaySelected["Thursday"] === true &&
      DaySelected["Friday"] === true
    ){
      return "Weekdays"
    } else if (
      DaySelected["Saturday"] === true && 
      DaySelected["Sunday"] === true
    ) {
      return "Weekend"
    }
    else {
      daysStr = ""

      for (let key in DaySelected) {
        if (DaySelected[key] === true) {
          if (daysStr === "") { //to avoid adding comma at beginning of string
            daysStr += " " + key
          } else {
            daysStr += ", " + key
          }
          
        }
      }
      if (daysStr === "") {
        return "No days selected"
      }
      return daysStr
    }
  }

  return (
    <TouchableOpacity className="mx-auto w-[90%] h-20 flex-1 flex-row justify-between bg-sky-500 rounded-lg drop-shadow-lg my-1" onPress={() => onPress(type)}>
    <View className="pl-4 text-lg align-middle  content-center my-auto">
        <View className="flex flex-row content-center">
            <Text className= "text-white font-semibold text-xl">{time.getHours() + ":" + time.getMinutes()}</Text>
            <MaterialIcons className="mx-1 my-auto text-center text-white text-[10px] " name="circle"/>
            <Text className="align-middle text-xl text-white font-semibold">{data["Name"]}</Text>
        </View>
        <Text className="text-white">{daysSelectedParsed()}</Text>  
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