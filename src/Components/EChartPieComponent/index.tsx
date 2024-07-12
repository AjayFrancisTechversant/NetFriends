import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts/core';
import {LineChart, PieChart} from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';
import {
  SVGRenderer,
  SkiaChart,
  SkiaChartProps,
} from '@wuba/react-native-echarts';
import styles from './style';
import {useScreenContext} from '../../Contexts/ScreenContext';

echarts.use([
  SVGRenderer,
  LineChart,
  GridComponent,
  PieChart,
  LegendComponent,
  ToolboxComponent,
]);

const EChartPieComponent: React.FC = () => {
  const skiaRef = useRef<any>(null);
  const option = {
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 20,
        },
        label: {
          show: true,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        data: [
          {value: 1048, name: 'Search Engine'},
          {value: 735, name: 'Direct'},
          {value: 580, name: 'Email'},
          {value: 484, name: 'Union Ads'},
          {value: 300, name: 'Video Ads'},
        ],
      },
    ],
  };
  useEffect(() => {
    let chart: any;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: screenContext.windowWidth,
        height: screenContext.windowHeight / 2,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, []);

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return <SkiaChart ref={skiaRef} />;
};

export default EChartPieComponent;
