import {View, Text, TouchableOpacity, Alert, Image} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import {Portal} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {SetStateType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {updateDocumentsDetails} from '../../Redux/Slices/Form1DataSlice';
import {urlRegExp} from '../../RegExp/RegExp';
import styles from './style';

export type DocumentsDetailsType = {
  resume: string | null;
  profilePic: string | null;
  signature: string | null;
};

type Form1Page4PropsType = {
  setSegmentedButtonValue: SetStateType<string>;
};

const Form1Page4: React.FC<Form1Page4PropsType> = ({
  setSegmentedButtonValue,
}) => {
  const dispatch = useAppDispatch();
  const documentsDetailsFromRedux = useAppSelector(
    state => state.Form1Data.documentsDetails,
  );
  const [errors, setErrors] = useState<Partial<DocumentsDetailsType>>({});
  const [isPdfOpen, setIsPdfOpen] = useState(false);
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
    if (validate()) {
      // save and finish logic
      Alert.alert('Form Submitted');
    }
  };

  const validate = () => {
    const newErrors: Partial<DocumentsDetailsType> = {};
    if (!documentsDetailsFromRedux.resume)
      newErrors.resume = 'Please upload resume';
    if (!documentsDetailsFromRedux.signature)
      newErrors.signature = 'Please upload signature';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDocumentPick = async (type: keyof DocumentsDetailsType) => {
    try {
      if (type == 'resume') {
        const result = await DocumentPicker.pickSingle({
          type: DocumentPicker.types.pdf,
          copyTo: 'cachesDirectory',
        });
        const updatedDetails = {
          ...documentsDetailsFromRedux,
          [type]: result.fileCopyUri,
        };
        dispatch(updateDocumentsDetails(updatedDetails));
      } else if (type == 'signature') {
        const result = await DocumentPicker.pickSingle({
          type: DocumentPicker.types.images,
          copyTo: 'cachesDirectory',
        });
        const updatedDetails = {
          ...documentsDetailsFromRedux,
          [type]: result.fileCopyUri,
        };
        dispatch(updateDocumentsDetails(updatedDetails));
      }
      if (type == 'profilePic') {
        const result = await DocumentPicker.pickSingle({
          type: DocumentPicker.types.images,
          copyTo: 'cachesDirectory',
        });
        const updatedDetails = {
          ...documentsDetailsFromRedux,
          [type]: result.fileCopyUri,
        };
        dispatch(updateDocumentsDetails(updatedDetails));
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('User cancelled the selection!!!');
      } else {
        console.error(err);
      }
    }
  };

  const HandleRemoveDocument = (type: keyof DocumentsDetailsType) => {
    const updatedDetails = {
      ...documentsDetailsFromRedux,
      [type]: null,
    };
    dispatch(updateDocumentsDetails(updatedDetails));
  };

  const renderLabel = (label: string, required: boolean) => (
    <Text>
      {label}
      {required && <Text style={screenStyles.errorText}> *</Text>}
    </Text>
  );

  const getFileNameFromUri = (uri: string): string => {
    const match = uri.match(urlRegExp);
    return match ? match[1] : 'unknown';
  };

  return (
    <View>
      {!isPdfOpen ? (
        <View>
          <Text style={screenStyles.subHeading}>Upload Documents</Text>
          <View style={screenStyles.documentsDetailsCard}>
            {renderLabel('Resume(.pdf)', true)}
            <View style={screenStyles.eachDocCard}>
              {!documentsDetailsFromRedux.resume ? (
                <TouchableOpacity onPress={() => handleDocumentPick('resume')}>
                  <MaterialIcons
                    name="upload-file"
                    size={50}
                    color={ColorPalette.gray}
                  />
                </TouchableOpacity>
              ) : (
                <>
                  <Text style={screenStyles.greenText}>
                    Uploaded
                    <AntDesign name="checkcircle" color={ColorPalette.green} />
                  </Text>
                  <View
                    style={screenStyles.resumePreviewAndRemoveButtonContainer}>
                    <TouchableOpacity onPress={() => setIsPdfOpen(true)}>
                      <Text>
                        {getFileNameFromUri(documentsDetailsFromRedux.resume)}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => HandleRemoveDocument('resume')}>
                      <AntDesign
                        name="closecircle"
                        color={ColorPalette.red}
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            {errors.resume && (
              <Text style={screenStyles.errorText}>{errors.resume}</Text>
            )}
            {renderLabel('Signature', true)}
            <View style={screenStyles.eachDocCard}>
              {!documentsDetailsFromRedux.signature ? (
                <TouchableOpacity
                  onPress={() => handleDocumentPick('signature')}>
                  <MaterialIcons
                    name="upload-file"
                    size={50}
                    color={ColorPalette.gray}
                  />
                </TouchableOpacity>
              ) : (
                <>
                  <View style={screenStyles.signatureRemoveButtonContainer}>
                    <Text style={screenStyles.greenText}>
                      Uploaded
                      <AntDesign
                        name="checkcircle"
                        color={ColorPalette.green}
                      />
                    </Text>
                    <TouchableOpacity
                      onPress={() => HandleRemoveDocument('signature')}>
                      <AntDesign
                        name="closecircle"
                        color={ColorPalette.red}
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={{uri: documentsDetailsFromRedux.signature}}
                    style={screenStyles.imageThumbnailStyle}
                  />
                </>
              )}
            </View>
            {errors.signature && (
              <Text style={screenStyles.errorText}>{errors.signature}</Text>
            )}
            {renderLabel('Passport size Photo', false)}
            <View style={screenStyles.eachDocCard}>
              {!documentsDetailsFromRedux.profilePic ? (
                <TouchableOpacity
                  onPress={() => handleDocumentPick('profilePic')}>
                  <MaterialIcons
                    name="upload-file"
                    size={50}
                    color={ColorPalette.gray}
                  />
                </TouchableOpacity>
              ) : (
                <>
                  <View style={screenStyles.signatureRemoveButtonContainer}>
                    <Text style={screenStyles.greenText}>
                      Uploaded
                      <AntDesign
                        name="checkcircle"
                        color={ColorPalette.green}
                      />
                    </Text>
                    <TouchableOpacity
                      onPress={() => HandleRemoveDocument('profilePic')}>
                      <AntDesign
                        name="closecircle"
                        color={ColorPalette.red}
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={{uri: documentsDetailsFromRedux.profilePic}}
                    style={screenStyles.imageThumbnailStyle}
                  />
                </>
              )}
            </View>
          </View>
          <View style={screenStyles.BackSaveButtonContainer}>
            <TouchableOpacity
              onPress={handleGoBack}
              style={screenStyles.goBackButton}>
              <Text style={screenStyles.whiteText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={screenStyles.saveButton}>
              <Text style={screenStyles.whiteText}>Save and Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Portal>
          <View style={screenStyles.canvas}>
            <TouchableOpacity
              style={screenStyles.backButtonOnPDFView}
              onPress={() => setIsPdfOpen(false)}>
              <Entypo name="chevron-left" size={30} />
            </TouchableOpacity>
            <Pdf
              source={{
                uri: documentsDetailsFromRedux.resume
                  ? documentsDetailsFromRedux.resume
                  : undefined,
              }}
              style={{flex: 1}}
            />
          </View>
        </Portal>
      )}
    </View>
  );
};

export default Form1Page4;
