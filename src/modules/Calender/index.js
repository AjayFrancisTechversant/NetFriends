import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './Style';

const CURRENT_DATE = CalendarUtils.getCalendarDateString(Date());

const Calender = () => {
  const [selected, setSelected] = useState();

  const onDayPress = useCallback(day => {
    setSelected(day.dateString);
  }, []);

  const marked = useMemo(() => {
    return {
      [CURRENT_DATE]: {
        dotColor: 'red',
        marked: true,
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'orange',
        selectedTextColor: 'red',
      },
    };
  }, [selected]);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <ScrollView>
      <Text style={screenStyles.text}>Calendar with selectable date</Text>
      <Calendar
        enableSwipeMonths
        current={CURRENT_DATE}
        style={screenStyles.calendar}
        onDayPress={onDayPress}
        markedDates={marked}
      />
    </ScrollView>
  );
};

export default Calender;
