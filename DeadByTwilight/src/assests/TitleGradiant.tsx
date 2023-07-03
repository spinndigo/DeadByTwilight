import * as React from 'react';
import Svg, {LinearGradient, Defs, Stop, SvgProps} from 'react-native-svg';

// linear-gradient(120deg, rgba(2,0,36,1) 0%, rgba(156,118,76,1) 31%, rgba(0,212,255,1) 100%);

/* SVGR has dropped some elements not supported by react-native-svg: title */
export const TitleGradient: React.FC<SvgProps> = props => (
  <Svg width={48} height={1} {...props}>
    <Defs>
      <LinearGradient id="Gradient1">
        <Stop stopColor={'#73716f'} offset="0%" />
        <Stop stopColor={'#e99a4b'} offset="100%" />
      </LinearGradient>
    </Defs>
  </Svg>
);
