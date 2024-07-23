import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import {SetStateType} from '../../Types/Types';

type DocumentsDetailsType = {
  resume: string | undefined;
  profilePic?: string | undefined;
  signature: string | undefined;
};
type Form1Page4PropsType = {
  setSegmentedButtonValue: SetStateType<string>;
};

const Form1Page4: React.FC<Form1Page4PropsType> = ({
  setSegmentedButtonValue,
}) => {
  const [DocumentsDetails, setDocumentsDetails] =
    useState<DocumentsDetailsType>({
      resume: undefined,
      profilePic: undefined,
      signature: undefined,
    });
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const handleGoBack = () => {
    setSegmentedButtonValue('3');
  };
  const handleSave = () => {
    //save and finish logic
  };

  return (
    <View>
      <Text style={screenStyles.subHeading}>Upload Documents</Text>
      <View style={screenStyles.documentsDetailsCard}>
        <Text>resume</Text>
        <Text>Signature</Text>
        <Text>Passport size Photo</Text>
      </View>
      <View style={screenStyles.BackSaveButtonContainer}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={screenStyles.goBackButton}>
          <Text style={screenStyles.whiteText}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={screenStyles.saveButton}>
          <Text style={screenStyles.whiteText}>Save and Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form1Page4;
