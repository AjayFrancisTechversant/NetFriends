import {View, Text, TouchableOpacity, Alert, Image} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import {Portal} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {SetStateType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {
  lockPagesFrom,
  submitForm1,
  updateDocumentsDetails,
} from '../../Redux/Slices/Form1DataSlice';
import {urlRegExp} from '../../RegExp/RegExp';
import SignatureDraw from '../SignatureDraw';
import validate from '../../Validation/Validation';
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
  const [isSignatureDrawing, setIsSignatureDrawing] = useState(false);
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
    if (!validateForm()) {
      // save and finish logic
      Alert.alert(
        'Success',
        'Your Application has been submitted Successfully',
        [
          {
            text: 'Ok',
            onPress: () => {
              setSegmentedButtonValue('1');
              dispatch(lockPagesFrom(2))
              handleSubmit();
            },
          },
        ],
      );
    }
  };

  const validateForm = () => {
    const newErrors: Partial<DocumentsDetailsType> = {};
    if (!validate(documentsDetailsFromRedux.resume))
      newErrors.resume = 'Please upload resume!';
    if (!validate(documentsDetailsFromRedux.signature))
      newErrors.signature = 'Please upload signature!';
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
  const handleSubmit = () => {
    dispatch(submitForm1());
  };
  return (
    <View>
      {isPdfOpen ? (
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
      ) : isSignatureDrawing ? (
        <Portal>
          <SignatureDraw setIsSignatureDrawing={setIsSignatureDrawing} />
        </Portal>
      ) : (
        <View>
          <Text style={screenStyles.subHeading}>Upload Documents</Text>
          <View style={screenStyles.documentsDetailsCard}>
            {renderLabel('Resume(.pdf)', true)}
            {!documentsDetailsFromRedux.resume ? (
              <TouchableOpacity
                style={screenStyles.eachDocCard}
                onPress={() => handleDocumentPick('resume')}>
                <MaterialIcons
                  name="upload-file"
                  size={50}
                  color={ColorPalette.gray}
                />
                <Text>Upload</Text>
              </TouchableOpacity>
            ) : (
              <View style={screenStyles.eachDocCard}>
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
              </View>
            )}
            {errors.resume && (
              <Text style={screenStyles.errorText}>{errors.resume}</Text>
            )}
            {renderLabel('Signature', true)}
            {!documentsDetailsFromRedux.signature ? (
              <View style={screenStyles.drawOrUploadSignaturewholeContainer}>
                <TouchableOpacity
                  style={screenStyles.eachDocCard}
                  onPress={() => setIsSignatureDrawing(true)}>
                  <FontAwesome5
                    name="signature"
                    size={50}
                    color={ColorPalette.gray}
                  />
                  <Text style={screenStyles.alignSelfcenter}>Draw</Text>
                </TouchableOpacity>
                <Text>Or</Text>
                <TouchableOpacity
                  style={screenStyles.eachDocCard}
                  onPress={() => handleDocumentPick('signature')}>
                  <FontAwesome6
                    name="upload"
                    size={50}
                    color={ColorPalette.gray}
                  />
                  <Text style={screenStyles.alignSelfcenter}>Upload</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={screenStyles.eachDocCard}>
                <View style={screenStyles.signatureRemoveButtonContainer}>
                  <Text style={screenStyles.greenText}>
                    Uploaded
                    <AntDesign name="checkcircle" color={ColorPalette.green} />
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
              </View>
            )}
            {errors.signature && (
              <Text style={screenStyles.errorText}>{errors.signature}</Text>
            )}
            {renderLabel('Passport size Photo', false)}
            {!documentsDetailsFromRedux.profilePic ? (
              <TouchableOpacity
                style={screenStyles.eachDocCard}
                onPress={() => handleDocumentPick('profilePic')}>
                <FontAwesome
                  name="user-circle"
                  size={50}
                  color={ColorPalette.gray}
                />
                <Text>Upload</Text>
              </TouchableOpacity>
            ) : (
              <View style={screenStyles.eachDocCard}>
                <View style={screenStyles.signatureRemoveButtonContainer}>
                  <Text style={screenStyles.greenText}>
                    Uploaded
                    <AntDesign name="checkcircle" color={ColorPalette.green} />
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
              </View>
            )}
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
      )}
    </View>
  );
};

export default Form1Page4;
