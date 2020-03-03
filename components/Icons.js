
import React from 'react'
import Svg, {
  G,
  Path
} from 'react-native-svg';

export const BackIcon = (props) => {
  return (
    <Svg {...props} height='20px' width='20px' viewBox='0 0 48 39'>
      <G transform="translate(0.000000,39.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
        <Path d="M65 293 c-35 -49 -64 -92 -64 -98 0 -5 29 -49 64 -98 60 -80 67 -86 85 
        -75 27 17 26 23 -20 84 -22 29 -40 56 -40 59 0 3 88 5 195 5 l195 0 0 25 0 25 
        -195 0 c-107 0 -195 2 -195 5 0 3 18 30 40 59 46 61 47 67 20 84 -18 11 -25 5 -85 -75z"/>
      </G>
    </Svg>
  )
}