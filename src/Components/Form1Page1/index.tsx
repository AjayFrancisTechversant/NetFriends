import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import MyTextInput from '../MyTextInput';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';

type PersonalDetailsType = {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  dob: Date;
  age: number | null;
};

const Form1Page1 = () => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsType>({
    name: undefined,
    email: undefined,
    phone: undefined,
    dob: new Date(),
    age: null,
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handlePersonalDetailsChange = useCallback(
    (name: keyof PersonalDetailsType, value: string | Date) => {
      setPersonalDetails({...personalDetails, [name]: value});
      if (name === 'dob') {
        const age = moment().diff(value as Date, 'years');
        setPersonalDetails(prevDetails => ({
          ...prevDetails,
          dob: value as Date,
          age,
        }));
      }
    },
    [],
  );

  const handleSave = () => {
    console.log(personalDetails);
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
        <View style={screenStyles.DOBButtonsContainer}>
          <MyTextInput
            style={[screenStyles.dobTextInput, screenStyles.textInput]}
            value={personalDetails.dob.toDateString()}
            disabled
          />
          <TouchableOpacity
            onPress={() => {
              setIsDatePickerOpen(true);
            }}
            style={screenStyles.calenderButton}>
            <EvilIcons name="calendar" color={ColorPalette.green} size={45} />
          </TouchableOpacity>
        </View>
        <Text>Age:</Text>
        <MyTextInput
          style={screenStyles.textInput}
          value={personalDetails.age ? personalDetails.age.toString() : ''}
          disabled
        />
      </View>
      <TouchableOpacity onPress={handleSave} style={screenStyles.saveButton}>
        <Text style={screenStyles.whiteText}>Save and Continue</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={isDatePickerOpen}
        date={personalDetails.dob}
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
