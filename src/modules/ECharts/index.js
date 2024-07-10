import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import * as echarts from 'echarts/core';
import {LineChart, PieChart} from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';
import {SVGRenderer, SkiaChart} from '@wuba/react-native-echarts';
import styles from './Style';
import EChartPieComponent from '../../Components/EChartPieComponent';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import { View } from 'react-native';
import EChartLineComponent from '../../Components/EChartLineComponent';

echarts.use([
  SVGRenderer,
  LineChart,
  GridComponent,
  PieChart,
  LegendComponent,
  ToolboxComponent,
]);

const Echarts = ({navigation}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
  
<View style={screenStyles.canvas} >
      <View ><EChartPieComponent /></View>
      <View ><EChartLineComponent /></View>
    <View style={screenStyles.menuButton}>
        <MenuDrawerButton navigation={navigation} color={ColorPalette.green}/>
    </View>
</View>
  )

}

export default Echarts;
