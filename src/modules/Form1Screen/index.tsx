import { Text, ScrollView, KeyboardAvoidingView, View } from 'react-native';
import React, { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';
import { useScreenContext } from '../../Contexts/ScreenContext';
import Form1Page1 from '../../Components/Form1Page1';
import Form1Page2 from '../../Components/Form1Page2';
import Form1Page3 from '../../Components/Form1Page3';
import Form1Page4 from '../../Components/Form1Page4';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import { useAppSelector } from '../../hooks/hooks';
import styles from './style';

export type PageUnlockDetailsType = {
  1: 'locked' | 'unlocked';
  2: 'locked' | 'unlocked';
  3: 'locked' | 'unlocked';
  4: 'locked' | 'unlocked';
};

const Form1Screen = () => {
  const [segmentedButtonValue, setSegmentedButtonValue] = useState('1');
  const pageUnlockDetailsFromRedux = useAppSelector(
    state => state.Form1Data.pageUnlockDetails,
  );

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
      disabled: pageUnlockDetailsFromRedux[1] === 'locked',
    },
    {
      value: '2',
      label: 'Address',
      disabled: pageUnlockDetailsFromRedux[2] === 'locked',
    },
    {
      value: '3',
      label: 'Education',
      disabled: pageUnlockDetailsFromRedux[3] === 'locked',
    },
    {
      value: '4',
      label: 'Documents',
      disabled: pageUnlockDetailsFromRedux[4] === 'locked',
    },
  ];

  return (
    <KeyboardAvoidingView
      style={screenStyles.canvas}
      enabled={true}
      behavior="height"
    >
      <ScrollView>
        {/* Uncomment this if MenuDrawerButton is needed */}
        {/* <View style={screenStyles.menuButton}>
          <MenuDrawerButton color={ColorPalette.green} />
        </View> */}
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
        {segmentedButtonValue === '1' && (
          <Form1Page1 setSegmentedButtonValue={setSegmentedButtonValue} />
        )}
        {segmentedButtonValue === '2' && (
          <Form1Page2 setSegmentedButtonValue={setSegmentedButtonValue} />
        )}
        {segmentedButtonValue === '3' && (
          <Form1Page3 setSegmentedButtonValue={setSegmentedButtonValue} />
        )}
        {segmentedButtonValue === '4' && (
          <Form1Page4 setSegmentedButtonValue={setSegmentedButtonValue} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Form1Screen;
