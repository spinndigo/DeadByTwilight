/*
see here for solution used below:
https://stackoverflow.com/questions/37165715/react-native-transforms-with-pivot-point?rq=3
*/

import {Circle, G, Line, Svg} from 'react-native-svg';
import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';

interface Props {
  hitOffset?: number;
}

const radius = 120;
const circumference = 2 * Math.PI * radius;
const goodArcLength = Math.round(circumference / 8); // 45 degrees
const greatArcLength = Math.round(goodArcLength / 4); // 11 degrees
const circleCenter = {x: 250, y: 160};
const circleCenterPoint = {cx: `${circleCenter.x}`, cy: `${circleCenter.y}`};
const hitZoneArcLength = goodArcLength + greatArcLength;

const AnimatetdG = Animated.createAnimatedComponent(G);
export const SegmentedCircle: React.FC<Props> = ({hitOffset = 0}) => {
  const rotateIntensity = useRef(new Animated.Value(0)).current;
  const rotateInterpolator = rotateIntensity.interpolate({
    inputRange: [0, 1],
    outputRange: [`${hitOffset}deg`, `${hitOffset + hitZoneArcLength + 18}deg`],
  });

  useEffect(() => {
    Animated.timing(rotateIntensity, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(result => {
      console.log(result);
    });
  }, []);

  return (
    <>
      <Svg width={'100%'} height={'100%'}>
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
        <G transform={`translate(${circleCenter.x}, ${circleCenter.y})`}>
          <AnimatetdG
            // @ts-expect-error
            style={{
              transform: [
                {
                  translateX: 0,
                },
                {
                  rotate: rotateInterpolator,
                },
                {
                  translateX: 0,
                },
              ],
            }}>
            <G transform={`translate(-${circleCenter.x}, -${circleCenter.y})`}>
              <Line
                x1={circleCenter.x}
                y1={circleCenter.y - (radius + 20)}
                x2={circleCenter.x}
                y2={circleCenter.y - (radius - 20)}
                stroke={'red'}
                strokeWidth={5}
              />
            </G>
          </AnimatetdG>
        </G>
      </Svg>
    </>
  );
};
