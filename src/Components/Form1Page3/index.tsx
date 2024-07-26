import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {SetStateType} from '../../Types/Types';
import MyTextInput from '../MyTextInput';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {
  addEducationDetails,
  lockPagesFrom,
  removeEducationDetail,
  unlockPage,
  updateEducationDetails,
} from '../../Redux/Slices/Form1DataSlice';
import validate from '../../Validation/Validation';
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
  const dispatch = useAppDispatch();
  const educationDetailsFromRedux = useAppSelector(
    state => state.Form1Data.educationDetails,
  );
  const [errors, setErrors] = useState<{
    [id: string]: Partial<EducationDetailsType>;
  }>({});
  const handleEducationDetailsChange = useCallback(
    (index: number, name: keyof EducationDetailsType, value: string) => {
      const updatedDetails = [...educationDetailsFromRedux];
      updatedDetails[index] = {...updatedDetails[index], [name]: value};
      dispatch(updateEducationDetails(updatedDetails));
    },
    [dispatch, educationDetailsFromRedux],
  );

  const handleAddEducationDetail = useCallback(() => {
    dispatch(addEducationDetails());
  }, [dispatch]);

  const handleRemoveEducationDetail = useCallback(
    (id: string) => {
      dispatch(removeEducationDetail(id));
    },
    [dispatch],
  );
  const validateForm = () => {
    let isValid = true;
    const newErrors: {[id: string]: Partial<EducationDetailsType>} = {};

    educationDetailsFromRedux.forEach(detail => {
      const detailErrors: Partial<EducationDetailsType> = {};
      if (!validate(detail.institution))
        detailErrors.institution = 'Required!';
      if (!validate(detail.degree)) detailErrors.degree = 'Required!';
      if (!validate(detail.fieldOfStudy))
        detailErrors.fieldOfStudy = 'Required!';
      if (!validate(detail.yearOfCompletion))
        detailErrors.yearOfCompletion = 'Required!';
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
      dispatch(unlockPage(4));
      setSegmentedButtonValue('4');
    } else {
      dispatch(lockPagesFrom(4));
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
      {educationDetailsFromRedux.map((education, index) => (
        <View key={education.id} style={screenStyles.educationDetailsCard}>
          {education.isExtra && (
            <View style={screenStyles.AddiEduHeaderContainer}>
              <Text style={screenStyles.subHeading}>
                Additional Education {index}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveEducationDetail(education.id)}
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
        onPress={handleAddEducationDetail}
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
