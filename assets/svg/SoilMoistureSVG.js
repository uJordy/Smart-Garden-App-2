import * as React from "react"
import {Svg, Path } from "react-native-svg"


const SoilMoistureSVG = ({ width, height, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 32 32"
    width="38"
    height="38"
    {...props}
  >
    <Path d="M24.5 30a5.202 5.202 0 0 1-4.626-8.08l3.616-5.382a1.217 1.217 0 0 1 2.02 0l3.55 5.277a5.492 5.492 0 0 1 .94 2.936A5.385 5.385 0 0 1 24.5 30Zm0-11.38-2.936 4.367A3.208 3.208 0 0 0 24.5 28a3.385 3.385 0 0 0 3.5-3.249 3.435 3.435 0 0 0-.63-1.867ZM11 16v-5h1a4.005 4.005 0 0 0 4-4V4h-3a3.978 3.978 0 0 0-2.747 1.107A6.003 6.003 0 0 0 5 2H2v3a6.007 6.007 0 0 0 6 6h1v5H2v2h14v-2Zm2-10h1v1a2.002 2.002 0 0 1-2 2h-1V8a2.002 2.002 0 0 1 2-2ZM8 9a4.005 4.005 0 0 1-4-4V4h1a4.005 4.005 0 0 1 4 4v1ZM2 21h14v2H2zM2 26h14v2H2z" />
    <Path
      d="M0 0h32v32H0z"
      data-name="&lt;Transparent Rectangle&gt;"
      style={{
        fill: "none",
      }}
    />
  </Svg>
)
export default SoilMoistureSVG
