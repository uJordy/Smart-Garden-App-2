import { styled } from "nativewind";
import { Svg, Rect } from "react-native-svg";

const StyledRect = styled(Rect, { classProps: ["fill", "stroke"] });

function SoilMoistureSVG({ fill, ...props }) {
  return (
    <Svg height="100" width="100" {...props}>
      <StyledRect x="0" y="0" width="100" height="100" fill={fill} />
    </Svg>
  );
}
