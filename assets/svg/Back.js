import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path d="M362 1.7c-3.9 1.3-19.8 16.8-123.8 120.7C128.7 231.7 118.8 241.9 117 246.8c-2.5 6.7-2.5 11.7 0 18.4 1.8 4.9 11.7 15.1 121.2 124.4 114.1 114 119.5 119.3 124.7 120.9 21.4 6.9 40.8-14.7 31.5-35.2-1.1-2.5-37.7-39.8-109.3-111.5L177.5 256l107.6-107.7C355.2 78 393.3 39.2 394.4 36.8c6.1-13.5-.4-29.7-14-34.8C374-.3 368.3-.4 362 1.7z" />
  </Svg>
)
export default SvgComponent
