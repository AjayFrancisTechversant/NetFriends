import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {SetStateType} from '../../Types/Types';
import MyTextInput from '../MyTextInput';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';

export type EducationDetailsType = {
  id: string;
  institution: string | undefined;
  degree: string | undefined;
  fieldOfStudy: string | undefined;
  yearOfCompletion: string | undefined;
  isExtra: boolean;
};

type Form1Page3PropsType = {
  setSegmentedButtonValue: SetStateType<string>;
};

const Form1Page3: React.FC<Form1Page3PropsType> = ({
  setSegmentedButtonValue,
}) => {
  const [educationDetails, setEducationDetails] = useState<
  EducationDetailsType[]
  >([
    {
      id: uuid.v4() as string,
      institution: undefined,
      degree: undefined,
      fieldOfStudy: undefined,
      yearOfCompletion: undefined,
      isExtra: false,
    },
  ]);
  const [errors, setErrors] = useState<{
    [id: string]: Partial<EducationDetailsType>;
  }>({});

  const handleEducationDetailsChange = useCallback(
    (index: number, name: keyof EducationDetailsType, value: string) => {
      setEducationDetails(prevDetails => {
        const newDetails: any = [...prevDetails];
        newDetails[index][name] = value;
        // Clear the specific field's error for this index
        setErrors(prevErrors => ({
          ...prevErrors,
          [newDetails[index].id]: {
            ...(prevErrors[newDetails[index].id] || {}),
            [name]: undefined,
          },
        }));
        return newDetails;
      });
    },
    [],
  );

  const addEducationDetail = useCallback(() => {
    setEducationDetails(prevDetails => [
      ...prevDetails,
      {
        id: uuid.v4() as string,
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
    setErrors(prevErrors => {
      const newErrors = {...prevErrors};
      delete newErrors[id];
      return newErrors;
    });
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors: {[id: string]: Partial<EducationDetailsType>} = {};

    educationDetails.forEach(detail => {
      const detailErrors: Partial<EducationDetailsType> = {};
      if (!detail.institution)
        detailErrors.institution = 'Institution is required';
      if (!detail.degree) detailErrors.degree = 'Degree is required';
      if (!detail.fieldOfStudy)
        detailErrors.fieldOfStudy = 'Field of study is required';
      if (!detail.yearOfCompletion)
        detailErrors.yearOfCompletion = 'Year of completion is required';

      if (Object.keys(detailErrors).length) {
        isValid = false;
        newErrors[detail.id] = detailErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleGoBack = () => {
    setSegmentedButtonValue('2');
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log(educationDetails);
      setSegmentedButtonValue('4');
    }
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  const renderLabel = (label: string, required: boolean) => (
    <Text>
      {label}
      {required && <Text style={screenStyles.errorText}> *</Text>}
    </Text>
  );

  return (
    <View>
      <Text style={screenStyles.subHeading}>Educational Details:</Text>
      {educationDetails.map((education, index) => (
        <View key={education.id} style={screenStyles.educationDetailsCard}>
          {education.isExtra && (
            <View style={screenStyles.AddiEduHeaderContainer}>
              <Text style={screenStyles.subHeading}>
                Additional Education {index}
              </Text>
              <TouchableOpacity
                onPress={() => removeEducationDetail(education.id)}
                style={screenStyles.removeEducationButton}>
                <Ionicons name="close" size={20} color={ColorPalette.red} />
              </TouchableOpacity>
            </View>
          )}
          {renderLabel('Institution', true)}
          <MyTextInput
            style={screenStyles.textInput}
            value={education.institution}
            onChangeText={text =>
              handleEducationDetailsChange(index, 'institution', text)
            }
          />
          {errors[education.id]?.institution && (
            <Text style={screenStyles.errorText}>
              {errors[education.id]?.institution}
            </Text>
          )}

          {renderLabel('Degree', true)}
          <MyTextInput
            style={screenStyles.textInput}
            value={education.degree}
            onChangeText={text =>
              handleEducationDetailsChange(index, 'degree', text)
            }
          />
          {errors[education.id]?.degree && (
            <Text style={screenStyles.errorText}>
              {errors[education.id]?.degree}
            </Text>
          )}

          {renderLabel('Field of Study', true)}
          <MyTextInput
            style={screenStyles.textInput}
            value={education.fieldOfStudy}
            onChangeText={text =>
              handleEducationDetailsChange(index, 'fieldOfStudy', text)
            }
          />
          {errors[education.id]?.fieldOfStudy && (
            <Text style={screenStyles.errorText}>
              {errors[education.id]?.fieldOfStudy}
            </Text>
          )}

          {renderLabel('Year of Completion', true)}
          <MyTextInput
            style={screenStyles.textInput}
            value={education.yearOfCompletion}
            onChangeText={text =>
              handleEducationDetailsChange(index, 'yearOfCompletion', text)
            }
          />
          {errors[education.id]?.yearOfCompletion && (
            <Text style={screenStyles.errorText}>
              {errors[education.id]?.yearOfCompletion}
            </Text>
          )}
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
