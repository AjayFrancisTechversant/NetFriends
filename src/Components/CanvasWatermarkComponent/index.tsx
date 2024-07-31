import React, {useEffect, useState} from 'react';
import {Text, useFont} from '@shopify/react-native-skia';
import moment from 'moment';

type CanvasWatermarkComponentPropsType = {
  region: string;
  canvasHeight: number;
  canvasWidth: number;
};
const CanvasWatermarkComponent: React.FC<CanvasWatermarkComponentPropsType> = ({
  region,
  canvasHeight,
  canvasWidth,
}) => {
  const fontSize = 12;
  const font = useFont(require('../../Assets/Fonts/Helvetica.ttf'), fontSize);
  const currentFormattedTime = moment(new Date()).format('LLL');

  return (
    <>
      <Text
        x={canvasWidth - 140}
        y={canvasHeight - fontSize * 2}
        text={`${currentFormattedTime}`}
        font={font}
      />
      <Text
        x={canvasWidth - 120}
        y={canvasHeight - fontSize}
        text={`${region}`}
        font={font}
      />
    </>
  );
};

export default CanvasWatermarkComponent;
