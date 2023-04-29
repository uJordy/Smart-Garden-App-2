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
  <Svg xmlns="http://www.w3.org/2000/svg" width={1600} height={900} {...props}>
    <Defs>
      <LinearGradient id="a" gradientTransform="rotate(-90 .5 .5)">
        <Stop offset="0%" stopColor="rgba(239, 80, 80, 1)" />
        <Stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
      </LinearGradient>
    </Defs>
    <Path fill="url(#a)" d="M0 0h1600v900H0z" />
  </Svg>

  
);
export default RedToTransparent;