/*
see here for solution used below:
https://github.com/software-mansion/react-native-svg/issues/1248#issuecomment-573429140
*/

import {Circle, G, Line, Svg} from 'react-native-svg';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, TouchableWithoutFeedback} from 'react-native';
import {CheckProps} from '../components';

interface Props {
  hitOffset?: number;
}

const radius = 100;
const circumference = 2 * Math.PI * radius;
const goodArcLength = Math.round(circumference / 8); // 45 degrees
const greatArcLength = Math.round(goodArcLength / 4); // 11 degrees
const circleCenter = {x: 250, y: 160};
const circleCenterPoint = {cx: `${circleCenter.x}`, cy: `${circleCenter.y}`};
const hitZoneAngleSpan = Math.floor(
  ((goodArcLength + greatArcLength) / circumference) * 360,
); // 56 degrees

const arrowArcStartOffset = 40;

const AnimatetdG = Animated.createAnimatedComponent(G);
export const SegmentedCircle: React.FC<Props & CheckProps> = ({
  hitOffset = 0,
  onGood = () => undefined,
  onGreat,
  onMiss,
}) => {
  const [show, setShow] = useState(true);
  const rotateIntensity = useRef(new Animated.Value(0)).current;
  const hitStart = hitOffset + arrowArcStartOffset;
  const arrowStartAngle = hitStart;
  const arrowEndAngle = hitStart + hitZoneAngleSpan + arrowArcStartOffset;
  const rotateInterpolator = rotateIntensity.interpolate({
    inputRange: [0, 1],
    outputRange: [`${arrowStartAngle}deg`, `${arrowEndAngle}deg`],
  });

  useEffect(() => {
    Animated.timing(rotateIntensity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(result => {
      if (result.finished) {
        onMiss();
      }
      setShow(false);
    });
  }, []);

  const onPress = () => {
    rotateIntensity.stopAnimation(value => {
      if (0.5 <= value && value < 0.65) onGreat();
      else if (0.65 <= value && value < 1) onGood();
      else {
        onMiss();
        setShow(false);
      }
    });
  };

  if (!show) return null; // check is complete, no need for component anymore

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Svg
        width={radius * 3}
        height={radius * 2.5}
        viewBox={`50 0 ${radius * 3} ${radius * 3}`}>
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
                {perspective: 1000},
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
    </TouchableWithoutFeedback>
  );
};
