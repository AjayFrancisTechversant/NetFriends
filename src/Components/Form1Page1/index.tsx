import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import MyTextInput from '../MyTextInput';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {SetStateType} from '../../Types/Types';
import {IconButton, TextInput} from 'react-native-paper';
import {validEmail} from '../../RegExp/RegExp';

type PersonalDetailsType = {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  dob?: Date;
  age?: number;
};
type Form1Page1PropsType = {
  setSegmentedButtonValue: SetStateType<string>;
};

const Form1Page1: React.FC<Form1Page1PropsType> = ({
  setSegmentedButtonValue,
}) => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsType>({
    name: undefined,
    email: undefined,
    phone: undefined,
    dob: undefined,
    age: undefined,
  });
  const [errors, setErrors] = useState<Partial<PersonalDetailsType>>({});
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handlePersonalDetailsChange = useCallback(
    (name: keyof PersonalDetailsType, value: string | Date | undefined) => {
      setPersonalDetails(prevDetails => {
        const updatedDetails = {...prevDetails, [name]: value};
        if (name === 'dob') {
          const age = moment().diff(value as Date, 'years');
          return {...updatedDetails, age};
        }
        return updatedDetails;
      });
    },
    [],
  );

  const handleSave = () => {
    if (validateForm()) {
      console.log(personalDetails);
      //save to redux logic
      setSegmentedButtonValue('2');
    }
  };

  const validateForm = () => {
    const newErrors: Partial<PersonalDetailsType> = {};
    if (!personalDetails.name) newErrors.name = 'Name is required';
    if (!personalDetails.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(personalDetails.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!personalDetails.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (personalDetails.phone.length < 10) {
      newErrors.phone = 'Enter Valid Phone Number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = (email: string | undefined): boolean => {
    return email ? validEmail.test(email) : false;
  };

  const renderTextInputLabel = (label: string, required: boolean) => (
    <Text>
      {label}
      {required && <Text style={screenStyles.errorText}> *</Text>}
    </Text>
  );
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  return (
    <View style={screenStyles.canvas}>
      <Text style={screenStyles.subHeading}>Personal Details:</Text>
      <View style={screenStyles.personalDetailsCard}>
        {renderTextInputLabel('Name', true)}
        <MyTextInput
          style={screenStyles.textInput}
          value={personalDetails.name}
          onChangeText={text => handlePersonalDetailsChange('name', text)}
        />
        {errors.name && (
          <Text style={screenStyles.errorText}>{errors.name}</Text>
        )}
        {renderTextInputLabel('Email', true)}
        <MyTextInput
          style={screenStyles.textInput}
          value={personalDetails.email}
          onChangeText={text => handlePersonalDetailsChange('email', text)}
          keyboardType="email-address"
        />
        {errors.email && (
          <Text style={screenStyles.errorText}>{errors.email}</Text>
        )}
        {renderTextInputLabel('Phone Number', true)}
        <MyTextInput
          style={screenStyles.textInput}
          value={personalDetails.phone}
          onChangeText={text => handlePersonalDetailsChange('phone', text)}
          keyboardType="numeric"
        />
        {errors.phone && (
          <Text style={screenStyles.errorText}>{errors.phone}</Text>
        )}
        {renderTextInputLabel('Date Of Birth', false)}
        <MyTextInput
          style={[screenStyles.textInput]}
          value={
            personalDetails.dob
              ? personalDetails.dob.toDateString()
              : 'Please Pick a date'
          }
          disabled
          right={
            !personalDetails.dob ? (
              <TextInput.Icon
                icon="calendar"
                color={ColorPalette.green}
                size={30}
                onPress={() => {
                  setIsDatePickerOpen(true);
                }}
              />
            ) : (
              <TextInput.Icon
                icon="close"
                color={ColorPalette.red}
                size={30}
                onPress={() => {
                  handlePersonalDetailsChange('dob', undefined);
                }}
              />
            )
          }
        />
        {personalDetails.dob && (
          <>
            {renderTextInputLabel('Age', false)}
            <MyTextInput
              style={screenStyles.textInput}
              value={personalDetails.age?.toString()}
              disabled
            />
          </>
        )}
      </View>
      <TouchableOpacity onPress={handleSave} style={screenStyles.saveButton}>
        <Text style={screenStyles.whiteText}>Save and Continue</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        maximumDate={new Date()}
        open={isDatePickerOpen}
        date={personalDetails.dob ? personalDetails.dob : new Date()}
        onConfirm={date => {
          setIsDatePickerOpen(false);
          handlePersonalDetailsChange('dob', date);
        }}
        onCancel={() => {
          setIsDatePickerOpen(false);
        }}
      />
    </View>
  );
};

export default Form1Page1;
