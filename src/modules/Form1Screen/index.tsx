import {Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import {SegmentedButtons} from 'react-native-paper';
import {useScreenContext} from '../../Contexts/ScreenContext';
import Form1Page1 from '../../Components/Form1Page1';
import Form1Page2 from '../../Components/Form1Page2';
import Form1Page3 from '../../Components/Form1Page3';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import Form1Page4 from '../../Components/Form1Page4';
import styles from './style';

const Form1Screen = () => {
  const [segmentedButtonValue, setSegmentedButtonValue] = useState('1');
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const segmentedButtons = [
    {
      value: '1',
      label: 'Personal',
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

  return (
    <KeyboardAvoidingView
      style={screenStyles.canvas}
      enabled={true}
      behavior="height">
      <ScrollView>
        <Text style={[screenStyles.heading, screenStyles.bigBoldText]}>
          Form 1
        </Text>
        <SegmentedButtons
          density="small"
          theme={{
            colors: {
              secondaryContainer: ColorPalette.lightGreen,
              outline: ColorPalette.green,
            },
          }}
          style={screenStyles.segmentedButtonsStyle}
          value={segmentedButtonValue}
          onValueChange={setSegmentedButtonValue}
          buttons={segmentedButtons}
        />
        {segmentedButtonValue == '1' ? (
          <Form1Page1 setSegmentedButtonValue={setSegmentedButtonValue} />
        ) : segmentedButtonValue == '2' ? (
          <Form1Page2 setSegmentedButtonValue={setSegmentedButtonValue} />
        ) : segmentedButtonValue == '3' ? (
          <Form1Page3 setSegmentedButtonValue={setSegmentedButtonValue} />
        ) : segmentedButtonValue == '4' ? (
          <Form1Page4 setSegmentedButtonValue={setSegmentedButtonValue} />
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Form1Screen;
