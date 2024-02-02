import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Slider, {SliderProps} from '@react-native-community/slider';


const SliderExample = ({temperature, onChangeSlide}) => {
  const [value, setValue] = useState(props.value ?? 0);
  function onchangetest(e){
    console.log(e)
  }
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.text}>{value && +value.toFixed(3)}</Text>
      <Slider
        step={2}
        minimumValue={0}
        maximumValue={36}
        value={value}
        // onValueChange={setValue}
        // onValueChange={onchangetest}
        // onSlidingComplete={onchangetest}
        
      />
    </View>
  );
};

export default SliderExample;