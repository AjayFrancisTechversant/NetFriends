import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import MyTextInput from '../MyTextInput';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {SetStateType} from '../../Types/Types';
import {TextInput} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {
  lockPagesFrom,
  unlockPage,
  updatePersonalDetails,
} from '../../Redux/Slices/Form1DataSlice';
import validate from '../../Validation/Validation';
import styles from './style';

export type PersonalDetailsType = {
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
  const dispatch = useAppDispatch();
  const personalDetailsFromRedux = useAppSelector(
    state => state.Form1Data.personalDetails,
  );

  const [errors, setErrors] = useState<Partial<PersonalDetailsType>>({});
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handlePersonalDetailsChange = useCallback(
    (
      name: keyof PersonalDetailsType,
      value: string | Date | number | undefined,
    ) => {
      const updatedDetails = {...personalDetailsFromRedux, [name]: value};
      if (name === 'dob') {
        const age = moment().diff(value as Date, 'years');
        dispatch(updatePersonalDetails({...updatedDetails, age}));
      } else {
        dispatch(updatePersonalDetails(updatedDetails));
      }
    },
    [dispatch, personalDetailsFromRedux],
  );

console.log(personalDetailsFromRedux);

  const handleSave = () => {
    if (validateForm()) {
      dispatch(unlockPage(2));
      setSegmentedButtonValue('2');
    } else {
      dispatch(lockPagesFrom(2));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<PersonalDetailsType> = {};
    if (!validate(personalDetailsFromRedux.name)) newErrors.name = 'Required!';
    if (!validate(personalDetailsFromRedux.email, 'email')) {
      newErrors.email = 'Invalid!';
    } 
    if (!validate(personalDetailsFromRedux.phone,'phone')) {
      newErrors.phone = 'Invalid!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
          value={personalDetailsFromRedux.name}
          onChangeText={text => handlePersonalDetailsChange('name', text)}
        />
        {errors.name && (
          <Text style={screenStyles.errorText}>{errors.name}</Text>
        )}
        {renderTextInputLabel('Email', true)}
        <MyTextInput
          style={screenStyles.textInput}
          value={personalDetailsFromRedux.email}
          onChangeText={text => handlePersonalDetailsChange('email', text)}
          keyboardType="email-address"
        />
        {errors.email && (
          <Text style={screenStyles.errorText}>{errors.email}</Text>
        )}
        {renderTextInputLabel('Phone Number', true)}
        <MyTextInput
          style={screenStyles.textInput}
          value={personalDetailsFromRedux.phone}
          onChangeText={text => handlePersonalDetailsChange('phone', text)}
          keyboardType="numeric"
        />
        {errors.phone && (
          <Text style={screenStyles.errorText}>{errors.phone}</Text>
        )}
        {renderTextInputLabel('Date Of Birth', false)}
        <MyTextInput
          style={[screenStyles.textInput]}
          label={
            personalDetailsFromRedux.dob
              ? moment(personalDetailsFromRedux.dob).format('DD/MM/YY')
              : 'Please Pick a date'
          }
          disabled
          right={
            !personalDetailsFromRedux.dob ? (
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
                  dispatch(
                    updatePersonalDetails({...personalDetailsFromRedux, dob: undefined,age:undefined}),
                  );
                }}
              />
            )
          }
        />
        {personalDetailsFromRedux.dob && (
          <>
            {renderTextInputLabel('Age', false)}
            <MyTextInput
              style={screenStyles.textInput}
              value={personalDetailsFromRedux.age?.toString()}
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
        date={new Date()}
        onConfirm={date => {
          setIsDatePickerOpen(false);
          const age = moment().diff(date, 'years');
          handlePersonalDetailsChange('dob', date);
          handlePersonalDetailsChange('age', age);
          dispatch(updatePersonalDetails({...personalDetailsFromRedux, dob: date, age}));
        }}
        onCancel={() => {
          setIsDatePickerOpen(false);
        }}
      />
    </View>
  );
};

export default Form1Page1;
