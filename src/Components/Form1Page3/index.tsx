import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import uuid from 'react-native-uuid'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {SetStateType} from '../../Types/Types';
import MyTextInput from '../MyTextInput';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';

type EducationDetailType = {
  id: string;
  institution: string | undefined;
  degree: string | undefined;
  fieldOfStudy: string | undefined;
  yearOfCompletion: string | undefined;
  isExtra?: boolean;
};

type Form1Page3PropsType = {
  setSegmentedButtonValue: SetStateType<string>;
};

const Form1Page3: React.FC<Form1Page3PropsType> = ({
  setSegmentedButtonValue,
}) => {
  const [educationDetails, setEducationDetails] = useState<
    EducationDetailType[]
  >([
    {
      id: uuid.v4() as string,
      institution: undefined,
      degree: undefined,
      fieldOfStudy:undefined,
      yearOfCompletion: undefined,
    },
  ]);

  const handleEducationDetailsChange = useCallback(
    (index: number, name: keyof EducationDetailType, value: string) => {
      setEducationDetails(prevDetails => {
        const newDetails = [...prevDetails];
        newDetails[index][name] = value;
        return newDetails;
      });
    },
    [],
  );

  const addEducationDetail = useCallback(() => {
    setEducationDetails(prevDetails => [
      ...prevDetails,
      {
        id:uuid.v4() as string,
        institution: undefined,
        degree: undefined,
        fieldOfStudy: undefined,
        yearOfCompletion: undefined,
        isExtra: true,
      },
    ]);
  }, []);

  const removeEducationDetail = useCallback((id: string) => {
    setEducationDetails(prevDetails =>
      prevDetails.filter(detail => detail.id !== id),
    );
  }, []);
  const handleGoBack = () => {
    setSegmentedButtonValue('2');
  };
  const handleSave = () => {
    //save to redux logic
    setSegmentedButtonValue('4');
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  return (
    <View>
      <Text style={screenStyles.subHeading}>Educational Details:</Text>
      {educationDetails.map((education, index) => (
        <View key={education.id} style={screenStyles.educationDetailsCard}>
          {education.isExtra && (
            <View style={screenStyles.AddiEduHeaderContainer}>
              <Text>Additional Education {index}</Text>
              <TouchableOpacity
                onPress={() => removeEducationDetail(education.id)}
                style={screenStyles.removeEducationButton}>
                <Ionicons name="close" size={20} color={ColorPalette.red} />
              </TouchableOpacity>
            </View>
          )}
          <Text>Institution</Text>
          <MyTextInput
            style={screenStyles.textInput}
            value={education.institution}
            onChangeText={text =>
              handleEducationDetailsChange(index, 'institution', text)
            }
          />
          <Text>Degree</Text>
          <MyTextInput
            style={screenStyles.textInput}
            value={education.degree}
            onChangeText={text =>
              handleEducationDetailsChange(index, 'degree', text)
            }
          />
          <Text>Field of Study</Text>
          <MyTextInput
            style={screenStyles.textInput}
            value={education.fieldOfStudy}
            onChangeText={text =>
              handleEducationDetailsChange(index, 'fieldOfStudy', text)
            }
          />
          <Text>Year of Completion</Text>
          <MyTextInput
            style={screenStyles.textInput}
            value={education.yearOfCompletion}
            onChangeText={text =>
              handleEducationDetailsChange(index, 'yearOfCompletion', text)
            }
          />
        </View>
      ))}
      <TouchableOpacity
        onPress={addEducationDetail}
        style={screenStyles.addEducationButton}>
        <Text style={screenStyles.whiteText}>+ Add More</Text>
      </TouchableOpacity>
      <View style={screenStyles.BackSaveButtonContainer}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={screenStyles.goBackButton}>
          <Text style={screenStyles.whiteText}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={screenStyles.saveButton}>
          <Text style={screenStyles.whiteText}>Save and Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form1Page3;
