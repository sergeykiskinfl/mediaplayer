import * as React from "react";
import Svg, { Circle } from "react-native-svg";
import { vmax } from "react-native-expo-viewport-units";

// The circle change its size, while playing tracks
const PulseCircle = () => {
  const [radius, setRadius] = React.useState(Math.floor(vmax(1.2)));
  
  let tick;

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (tick) {
        setRadius(Math.floor(vmax(1.2)));
        tick = !tick;
      } else {
        setRadius(Math.floor(vmax(1.4)));
        tick = !tick;
      }
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Svg height="100%" width="100%">
      <Circle cx={vmax(4)} cy={vmax(4)} r={radius} fill="green" />
    </Svg>
  );
};

export default PulseCircle;
