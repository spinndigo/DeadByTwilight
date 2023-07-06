import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
  Circle,
} from 'react-native-svg';

interface SkillProps {
  hitZone: 0 | 1 | 2 | 3 | 4 | 5;
}

type Props = SkillProps & SvgProps;

const GradiantCircle = (props: Props) => {
  const {hitZone, ...rest} = props;
  return (
    <Svg viewBox="-10 -10 220 220" {...rest}>
      <Defs>
        <LinearGradient
          id="HitZone"
          x1={0}
          x2={1}
          y1={0}
          y2={1}
          gradientUnits="objectBoundingBox">
          <Stop offset="0%" stopColor="purple" />
          <Stop offset="25%" stopColor="purple" />
          <Stop offset="26%" stopColor="green" />
        </LinearGradient>
        <LinearGradient
          id="MissZone"
          x1={0}
          x2={0}
          y1={0}
          y2={1}
          gradientUnits="objectBoundingBox">
          <Stop offset="0%" stopColor="grey" />
          <Stop offset="100%" stopColor="grey" />
        </LinearGradient>
      </Defs>

      <G fill="none" strokeWidth={10}>
        <Path
          stroke={`url(#${hitZone === 0 ? 'HitZone' : 'MissZone'})`}
          d="M0-100a100 100 0 0 1 86.6 50"
          transform="translate(100 100)"
        />
        <Path
          stroke={`url(#${hitZone === 1 ? 'HitZone' : 'MissZone'})`}
          d="M86.6-50a100 100 0 0 1 0 100"
          transform="translate(100 100)"
        />
        <Path
          stroke={`url(#${hitZone === 2 ? 'HitZone' : 'MissZone'})`}
          d="M86.6 50A100 100 0 0 1 0 100"
          transform="translate(100 100)"
        />
        <Path
          stroke={`url(#${hitZone === 3 ? 'HitZone' : 'MissZone'})`}
          d="M0 100a100 100 0 0 1-86.6-50"
          transform="translate(100 100)"
        />
        <Path
          stroke={`url(#${hitZone === 4 ? 'HitZone' : 'MissZone'})`}
          d="M-86.6 50a100 100 0 0 1 0-100"
          transform="translate(100 100)"
        />
        <Path
          stroke={`url(#${hitZone === 5 ? 'HitZone' : 'MissZone'})`}
          d="M-86.6-50A100 100 0 0 1 0-100"
          transform="translate(100 100)"
        />
      </G>
    </Svg>
  );
};
export default GradiantCircle;
