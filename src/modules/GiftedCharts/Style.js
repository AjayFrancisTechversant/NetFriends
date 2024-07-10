import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    canvas: {
      flex: 1,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      margin: height*0.0125,
      borderRadius: 20,
      elevation: 10,
      backgroundColor: 'white',
    },
    pieContainer: {
      borderRadius: 20,
      height: '45%',
      elevation: 30,
      backgroundColor: 'white',
    },
    backButton: {
      position: 'absolute',
      left: 15,
      top: 10,
    },
    heading: {
      fontSize: 20,
      marginTop: height*0.0125,
      alignSelf: 'center',
    },
    pieChartContainer: {
      width: '100%',
      alignItems: 'center',
      marginVertical: height*0.0125,
    },
    pieChartLabel: {
      fontSize: 25,
    },
    pieChartLegendContainer: {
      alignSelf: 'center',
      flexDirection: 'row',
      gap: 30,
    },
    colorBit1: {
      height: 10,
      width: 30,
      backgroundColor: ColorPalette.pink,
      borderRadius: 5,
      alignSelf: 'center',
    },
    colorBit2: {
      height: 10,
      width: 30,
      backgroundColor: ColorPalette.violet,
      borderRadius: 5,
      alignSelf: 'center',
    },
    colorBit3: {
      height: 10,
      width: 30,
      backgroundColor: ColorPalette.lightBlue,
      borderRadius: 5,
      alignSelf: 'center',
    },
    barContainer: {
      height: '55%',
    },
    barChartContainer: {
      alignSelf: 'center',
      marginVertical: height*0.025,
    },
    dealsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    text1012: {
      alignSelf: 'center',
      color: ColorPalette.brightGreen,
      fontFamily: 'Helvetica-Bold',
      fontSize: 30,
    },
    text26B: {
      alignSelf: 'center',
      fontFamily: 'Helvetica-Bold',
      fontSize: 30,
      color: ColorPalette.black,
    },
    normalTexts: {
      fontFamily: 'Helvetica-Bold',
      color: ColorPalette.black,
    },
    progressionButton: {
      height: 50,
      width: '80%',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      backgroundColor: ColorPalette.violet,
      marginVertical: height*0.0315,
    },
    progressionText: {
      color: ColorPalette.white,
    },
    rightIconAbslute: {
      position: 'absolute',
      right: 20,
    },
  });
export default styles;
