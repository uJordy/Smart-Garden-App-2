// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { Text, View, Pressable} from 'react-native';

// import { useColorScheme } from 'nativewind';

// export default function App() {

//   const { colorScheme, toggleColorScheme } = useColorScheme();
//   return (
//     <View className="flex-1 bg-red-400 items-center justify-center">
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//       <Pressable className="p-4 bg-white dark:bg-black" onPress={toggleColorScheme}>
//       <Text className="text-black dark:text-white">
//         Click me to {colorScheme === 'dark' ? 'light' : 'dark'} mode!
//       </Text>
//     </Pressable>
//     </View>
//   );
// }


import React, {Component} from 'react';
import { View, Text, Button, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/HomePage';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

 
