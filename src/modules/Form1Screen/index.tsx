import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import {SegmentedButtons} from 'react-native-paper';
import Form1Page1 from '../../Components/Form1Page1';

const Form1Screen = () => {
  const [segmentedButtonValue, setSegmentedButtonValue] = useState('1');
  const segmentedButtons = [
    {
      value: '1',
      label: 'Personal Details',
    },
    {
      value: '2',
      label: 'Address',
    },
    {
      value: '3',
      label: 'Education',
    },
    {
      value: '4',
      label: 'Documents',
    },
  ];
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  return (
    <ScrollView style={screenStyles.canvas}>
      <Text style={[screenStyles.heading, screenStyles.bigBoldText]}>
        Form 1
      </Text>
      <SegmentedButtons
        style={screenStyles.segmentedButtonsStyle}
        value={segmentedButtonValue}
        onValueChange={setSegmentedButtonValue}
        buttons={segmentedButtons}
      />
      {segmentedButtonValue=='1'?
     <Form1Page1/> 
    :
    null
    }
    </ScrollView>
  );
};

export default Form1Screen;
