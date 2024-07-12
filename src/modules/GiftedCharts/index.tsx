import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {PieChart, BarChart} from 'react-native-gifted-charts';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';

const GiftedCharts = ({navigation}) => {
  const pieData = [
    {value: 37, label: 'ETH', color: ColorPalette.pink},
    {value: 44, label: 'BTC', color: ColorPalette.violet},
    {value: 19, label: 'USDT', color: ColorPalette.lightBlue},
  ];
  const barData = [
    {value: 200, label: 'M'},
    {value: 500, label: 'T'},
    {value: 745, label: 'W'},
    {value: 320, label: 'T'},
    {value: 600, label: 'F'},
    {value: 256, label: 'S'},
    {value: 300, label: 'S'},
  ];
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  return (
    <View style={screenStyles.canvas}>
      <ScrollView style={screenStyles.container}>
        <View style={screenStyles.pieContainer}>
          <View style={screenStyles.backButton}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Entypo
                name="chevron-left"
                size={30}
                color={ColorPalette.black}
              />
            </TouchableOpacity>
          </View>
          <Text style={[screenStyles.heading, screenStyles.normalTexts]}>
            Detailed Statistics
          </Text>
          <View style={screenStyles.pieChartContainer}>
            <PieChart
              showGradient
              radius={80}
              donut
              innerRadius={50}
              data={pieData}
              focusOnPress
              centerLabelComponent={() => {
                return (
                  <Text
                    style={[
                      screenStyles.pieChartLabel,
                      screenStyles.normalTexts,
                    ]}>
                    $4200
                  </Text>
                );
              }}
              isAnimated
            />
          </View>
          <View style={screenStyles.pieChartLegendContainer}>
            <View>
              <Text style={screenStyles.normalTexts}>
                {pieData[0].value + '% ' + pieData[0].label}
              </Text>
              <View style={screenStyles.colorBit1}></View>
            </View>
            <View>
              <Text style={screenStyles.normalTexts}>
                {pieData[1].value + '% ' + pieData[1].label}
              </Text>
              <View style={screenStyles.colorBit2}></View>
            </View>
            <View>
              <Text style={screenStyles.normalTexts}>
                {pieData[2].value + '% ' + pieData[2].label}
              </Text>
              <View style={screenStyles.colorBit3}></View>
            </View>
          </View>
        </View>
        <View style={screenStyles.barContainer}>
          <Text style={[screenStyles.heading, screenStyles.normalTexts]}>
            Market Activity
          </Text>
          <View style={screenStyles.barChartContainer}>
            <BarChart
              height={80}
              showGradient
              gradientColor={ColorPalette.darkOrange}
              frontColor={ColorPalette.lightOrange}
              barWidth={22}
              barBorderRadius={10}
              data={barData}
              xAxisThickness={0}
              yAxisThickness={0}
              isAnimated
              hideYAxisText
              hideRules
            />
          </View>
          <View style={screenStyles.dealsContainer}>
            <View>
              <Text style={screenStyles.text1012}>1012</Text>
              <Text style={screenStyles.normalTexts}>Open Deals</Text>
            </View>
            <View>
              <Text style={screenStyles.text26B}>$2.6 B</Text>
              <Text style={screenStyles.normalTexts}>Deals Volume</Text>
            </View>
          </View>
          <TouchableOpacity style={screenStyles.progressionButton}>
            <Text
              style={[screenStyles.normalTexts, screenStyles.progressionText]}>
              Progression
            </Text>
            <View style={screenStyles.rightIconAbslute}>
              <Entypo
                name="triangle-right"
                size={25}
                color={ColorPalette.white}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default GiftedCharts;
