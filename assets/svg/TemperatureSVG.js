import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 50 50"
    width={40}
    height={40}
    {...props}
  >
    <Path d="M20.4 48.8c6.7 1.3 12.5-3.8 12.5-10.3 0-3.4-1.7-6.5-4.3-8.4V7.2c0-3.4-2.7-6.2-6.2-6.2-3.4 0-6.2 2.8-6.2 6.2v22.9c-3.1 2.3-4.9 6.2-4 10.6.8 4 4.1 7.3 8.2 8.1zM17.5 32l.9-.7v-24c0-2.2 1.8-3.9 3.9-3.9 2.2 0 4 1.8 4 3.9v24l.9.7c2.1 1.5 3.3 4 3.3 6.6 0 2.2-.9 4.3-2.4 5.8-1.6 1.5-3.6 2.4-5.8 2.4-4.1 0-7.3-2.9-8-6.5-.5-3.3.7-6.5 3.2-8.3z" />
    <Path d="M22.4 44.4c1.6 0 3.1-.6 4.2-1.7s1.7-2.6 1.7-4.2c0-4-3.4-5.3-4.3-6.1V15.5h-3.3v16.9c-.7.8-5.1 2.4-4.1 7.3.5 2.6 2.8 4.7 5.8 4.7zM36.9 7.8h-5.7v2.3h5.7c.6 0 1.1-.5 1.1-1.1.1-.7-.4-1.2-1.1-1.2zM35.8 15c0-.6-.5-1.1-1.1-1.1h-3.4v2.3h3.4c.6-.1 1.1-.6 1.1-1.2zM38.1 21c0-.6-.5-1.1-1.1-1.1h-5.7v2.3H37c.6 0 1.1-.6 1.1-1.2z" />
  </Svg>
)
export default SvgComponent
