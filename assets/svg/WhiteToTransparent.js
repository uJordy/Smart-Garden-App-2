import * as React from "react";
import {
  Svg,
  Circle,
  Ellipse,
  Text,
  Rect,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Path
} from 'react-native-svg';

const RedToTransparent = (props) => (
//   <Svg height="150" width="300">
//   <Ellipse cx="150" cy="75" rx="85" ry="55" fill="url(#grad-1-bug)" />
//   <Defs>
//     <LinearGradient
//       id="grad-1-bug"
//       x1="65"
//       y1="0"
//       x2="235"
//       y2="0"
//       gradientUnits="userSpaceOnUse">
//       <Stop offset="0" stopColor="rgb(255,255,0)" stopOpacity="0" />
//       <Stop offset="1" stopColor="red" />
//     </LinearGradient>
//   </Defs>
// </Svg>

<Svg>
{/* <Ellipse cx="150" cy="75" rx="85" ry="55" fill="url(#grad-1)" /> */}
<Rect width="1600" height="900" fill="url(#grad-1)" />
<Defs>
  <LinearGradient
    id="grad-1"
    x1="65"
    y1="0"
    x2="235"
    y2="0"
    gradientUnits="userSpaceOnUse"
    gradientTransform="rotate(90)"
   >
    <Stop offset="0" stopColor="rgb(255,255,255)" stopOpacity={0}/>
    <Stop offset="0.9" stopColor="rgb(255,255,255)" stopOpacity={0}/>
    {/* <Stop offset="0.5" stopColor="rgb(0,255,255)" stopOpacity={1} /> */}
    <Stop offset="1" stopColor="rgb(255,255,0)" stopOpacity={0.9} />
    
  </LinearGradient>
</Defs>
</Svg>

  
);
export default RedToTransparent;