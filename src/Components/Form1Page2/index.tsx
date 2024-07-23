import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SetStateType} from '../../Types/Types';
import { useScreenContext } from '../../Contexts/ScreenContext';
import styles from './style';

type Form1Page2PropsType = {
  setSegmentedButtonValue: SetStateType<string>;
};
const Form1Page2: React.FC<Form1Page2PropsType> = ({
  setSegmentedButtonValue,
}) => {

    const handleGoBack = () => {
        setSegmentedButtonValue('1')
      };
    const handleSave = () => {
        //save to redux logic
        setSegmentedButtonValue('3')
      };
    const screenContext = useScreenContext();
    const screenStyles = styles(
      screenContext,
      screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
      screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
    );
  
  return (
    <View>
      <Text>Form1Page2</Text>
    <View style={screenStyles.BackSaveButtonContainer}>
          <TouchableOpacity onPress={handleGoBack} style={screenStyles.goBackButton}>
            <Text style={screenStyles.whiteText}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={screenStyles.saveButton}>
            <Text style={screenStyles.whiteText}>Save and Continue</Text>
          </TouchableOpacity>
    </View>
    </View>
  );
};

export default Form1Page2;
