import {
  Text,
  ScrollView,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SegmentedButtons} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useScreenContext} from '../../Contexts/ScreenContext';
import Form1Page1 from '../../Components/Form1Page1';
import Form1Page2 from '../../Components/Form1Page2';
import Form1Page3 from '../../Components/Form1Page3';
import Form1Page4 from '../../Components/Form1Page4';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import Form1Preview from '../../Components/Form1Preview';
import styles from './style';
import {unsubmitForm1} from '../../Redux/Slices/Form1DataSlice';

export type PageUnlockDetailsType = {
  1: 'locked' | 'unlocked';
  2: 'locked' | 'unlocked';
  3: 'locked' | 'unlocked';
  4: 'locked' | 'unlocked';
};

const Form1Screen = () => {
  const dispatch = useAppDispatch();
  const [segmentedButtonValue, setSegmentedButtonValue] = useState('1');
  const pageUnlockDetailsFromRedux = useAppSelector(
    state => state.Form1Data.pageUnlockDetails,
  );
  const isForm1Submitted = useAppSelector(state => state.Form1Data.isSubmitted);
  const [isPreviewing, setIsPreviewing] = useState(false);
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
  const handleEditForm = () => {
    dispatch(unsubmitForm1());
  };

  return (
    <KeyboardAvoidingView
      style={screenStyles.canvas}
      enabled={true}
      behavior="height">
      <ScrollView>
        {/* <View style={screenStyles.menuButton}>
            <MenuDrawerButton color={ColorPalette.green} />
          </View> */}
        <Text style={[screenStyles.heading, screenStyles.bigBoldText]}>
          Form 1
        </Text>
        {!isForm1Submitted ? (
          <>
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
          </>
        ) : (
          <>
            <Text style={screenStyles.submittedText}>
              Your Application has been Submitted Successfully
            </Text>
            <TouchableOpacity
              onPress={() => setIsPreviewing(true)}
              style={screenStyles.submitedFormCardButton}>
              <View style={screenStyles.submitedFormCardSubContainer}>
                <AntDesign name="filetext1" size={30} />
                <Text>Form1</Text>
              </View>
              <TouchableOpacity
                onPress={handleEditForm}
                style={screenStyles.editFormButton}>
                <Text>Edit</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </>
        )}
        {isPreviewing && <Form1Preview setIsPreviewing={setIsPreviewing} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Form1Screen;
