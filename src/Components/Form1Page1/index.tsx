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

type PersonalDetailsType = {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  dob: Date | undefined;
  age: number | null;
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
    age: null,
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handlePersonalDetailsChange = useCallback(
    (name: keyof PersonalDetailsType, value: string | Date) => {
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
    console.log(personalDetails);
    //save to redux logic
    setSegmentedButtonValue('2');
  };

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
        <Text>Name</Text>
        <MyTextInput
          style={screenStyles.textInput}
          value={personalDetails.name}
          onChangeText={text => handlePersonalDetailsChange('name', text)}
        />
        <Text>Email</Text>
        <MyTextInput
          style={screenStyles.textInput}
          value={personalDetails.email}
          onChangeText={text => handlePersonalDetailsChange('email', text)}
          keyboardType="email-address"
        />
        <Text>Phone Number</Text>
        <MyTextInput
          style={screenStyles.textInput}
          value={personalDetails.phone}
          onChangeText={text => handlePersonalDetailsChange('phone', text)}
          keyboardType="numeric"
        />
        <Text>DOB</Text>

        <MyTextInput
          style={[screenStyles.textInput]}
          value={
            personalDetails.dob
              ? personalDetails.dob.toDateString()
              : 'Please Pick a date'
          }
          disabled
          right={
            <TextInput.Icon
              icon="calendar"
              color={ColorPalette.green}
              size={30}
              onPress={() => {
                setIsDatePickerOpen(true);
              }}
            />
          }
        />
        <Text>Age</Text>
        <MyTextInput
          style={screenStyles.textInput}
          value={
            personalDetails.age
              ? personalDetails.age.toString()
              : 'Please Pick a valid Date'
          }
          disabled
        />
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
