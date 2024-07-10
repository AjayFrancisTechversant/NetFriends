import React, {useRef, useEffect} from 'react';
import * as echarts from 'echarts/core';
import {LineChart} from 'echarts/charts';
import {GridComponent} from 'echarts/components';
import {SVGRenderer, SkiaChart} from '@wuba/react-native-echarts';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './Style';

echarts.use([SVGRenderer, LineChart, GridComponent]);

const EChartLineComponent = () => {
    const skiaRef = useRef(null);
    const option = {
        xAxis: {
          type: 'category',
          
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
          },
        ],
      };
    useEffect(() => {
      let chart;
      if (skiaRef.current) {
        chart = echarts.init(skiaRef.current, 'light', {
          renderer: 'svg',
          width: 400,
          height: 400,
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
}

export default EChartLineComponent
