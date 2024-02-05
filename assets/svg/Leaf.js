import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    {...props}
  >
    <Path
      d="M12.5 3.5c4.45-.358 7.95 1.308 10.5 5a25.645 25.645 0 0 1 4 11c8.79-6.486 18.624-9.32 29.5-8.5 4.677 15.962 1.01 29.628-11 41-8.605 5.677-17.771 6.843-27.5 3.5a30.603 30.603 0 0 1-12.5 4v-3c10.354-3.164 19.02-8.997 26-17.5-.667-.667-1.333-.667-2 0a202.372 202.372 0 0 1-16 10.5 3.646 3.646 0 0 1-1.5-1c.095-2.82.595-5.653 1.5-8.5l-.5-1.5c-1.154 2.457-2.488 2.457-4 0-6.636-12.44-5.47-24.108 3.5-35Z"
      style={{
        opacity: 0.905,
      }}
    />
  </Svg>
)
export default SvgComponent
