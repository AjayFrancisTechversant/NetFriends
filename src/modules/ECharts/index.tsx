import React from 'react';
import {View} from 'react-native';
import * as echarts from 'echarts/core';
import {LineChart, PieChart} from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';
import {SVGRenderer} from '@wuba/react-native-echarts';
import EChartPieComponent from '../../Components/EChartPieComponent';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import EChartLineComponent from '../../Components/EChartLineComponent';
import styles from './style';

echarts.use([
  SVGRenderer,
  LineChart,
  GridComponent,
  PieChart,
  LegendComponent,
  ToolboxComponent,
]);

const Echarts: React.FC = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.canvas}>
      <View>
        <EChartPieComponent />
      </View>
      <View>
        <EChartLineComponent />
      </View>
      <View style={screenStyles.menuButton}>
        <MenuDrawerButton color={ColorPalette.green} />
      </View>
    </View>
  );
};

export default Echarts;
