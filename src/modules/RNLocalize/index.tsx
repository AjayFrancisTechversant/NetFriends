import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import {
  findBestLanguageTag,
  getCalendar,
  getCountry,
  getCurrencies,
  getLocales,
  getNumberFormatSettings,
  getTemperatureUnit,
  getTimeZone,
  uses24HourClock,
  usesAutoDateAndTime,
  usesAutoTimeZone,
  usesMetricSystem,
} from 'react-native-localize';

const RNLocalize = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  // console.log(getLocales());
  // console.log(getCurrencies());
  // console.log(getNumberFormatSettings());
  // console.log(getCountry());
  // console.log(getCalendar());
  // console.log(getTemperatureUnit());
  // console.log(usesAutoDateAndTime());
  // console.log(usesMetricSystem());
  // console.log(uses24HourClock());
  // console.log(getTimeZone());
  // console.log(usesAutoTimeZone());
  // console.log(findBestLanguageTag(["fr-FR","en-US", "en", ]));
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.heading}>RNLocalize</Text>
    </View>
  );
};

export default RNLocalize;
