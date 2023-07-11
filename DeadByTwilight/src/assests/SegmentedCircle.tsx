import {Circle, Line, Svg} from 'react-native-svg';
import Animated from 'react-native-reanimated';
import React from 'react';

interface Props {
  hitOffset?: number;
}

const radius = 120;
const circumference = 2 * Math.PI * radius;
const goodArcLength = Math.round(circumference / 8); // 45 degrees
const greatArcLength = Math.round(goodArcLength / 4); // 11 degrees
const circleCenter = {x: 250, y: 160};
const circleCenterPoint = {cx: `${circleCenter.x}`, cy: `${circleCenter.y}`};

const AnimatedLine = Animated.createAnimatedComponent(Line);
export const SegmentedCircle: React.FC<Props> = ({hitOffset = 0}) => {
  return (
    <Svg>
      <Circle
        {...circleCenterPoint}
        r={`${radius}`}
        stroke={'grey'}
        fill={'none'}
        strokeWidth={7}
      />
      <Circle
        {...circleCenterPoint}
        r={`${radius}`}
        stroke={'green'}
        fill={'none'}
        strokeWidth={7}
        transform={`rotate(${hitOffset} ${circleCenter.x} ${circleCenter.y})`}
        strokeDasharray={[goodArcLength, 9999]}
      />
      <Circle
        {...circleCenterPoint}
        r={`${radius}`}
        stroke={'pink'}
        fill={'none'}
        strokeWidth={7}
        transform={`rotate(${hitOffset} ${circleCenter.x} ${circleCenter.y})`}
        strokeDasharray={[greatArcLength, 9999]}
      />
      <AnimatedLine
        x1={circleCenter.x}
        y1={circleCenter.y - (radius + 20)}
        x2={circleCenter.x}
        y2={circleCenter.y - (radius - 20)}
        transform={`rotate(${hitOffset} ${circleCenter.x} ${circleCenter.y})`}
        stroke={'red'}
        strokeWidth={5}
      />
    </Svg>
  );
};

// 80 and 100
