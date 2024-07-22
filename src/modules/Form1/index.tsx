import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MyTextInput from '../../Components/MyTextInput';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';
import {Checkbox} from 'react-native-paper';
import ColorPalette from '../../Assets/Themes/ColorPalette';

type PersonalDetailsType = {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  dob: Date | null;
  age: number | null;
  currentAddress: string | undefined;
  currentCity: string | undefined;
  currentState: string | undefined;
  currentCountry: string | undefined;
  currentPincode: string | undefined;
  permanentAddress: string | undefined;
  permanentCity: string | undefined;
  permanentState: string | undefined;
  permanentCountry: string | undefined;
  permanentPincode: string | undefined;
  cv: string | null;
  profilePic?: string;
  signature: string | null;
  skills?: string;
};

type EducationDetailType = {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  yearOfCompletion: string;
};

const Form1: React.FC = () => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsType>({
    name: undefined,
    email: undefined,
    phone: undefined,
    dob: null,
    age: null,
    temporaryAddress: undefined,
    temporaryCity: undefined,
    temporaryState: undefined,
    temporaryCountry: undefined,
    temporaryPincode: undefined,
    permanentAddress: undefined,
    permanentCity: undefined,
    permanentState: undefined,
    permanentCountry: undefined,
    permanentPincode: undefined,
    cv: null,
    profilePic: undefined,
    signature: null,
    skills: undefined,
  });

  const [educationDetails, setEducationDetails] = useState<
    EducationDetailType[]
  >([
    {
      id: 1,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      yearOfCompletion: '',
    },
  ]);
  const [
    SACAIsChecked,
    setSACAIsChecked,
  ] = React.useState(false);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const handlePersonalDetailsChange = (
    name: keyof PersonalDetailsType,
    value: string,
  ) => {
    setPersonalDetails({...personalDetails, [name]: value});
  };

  const handleEducationDetailsChange = (
    index: number,
    name: keyof EducationDetailType,
    value: string,
  ) => {
    const newEducationDetails = [...educationDetails];
    newEducationDetails[index][name] = value;
    setEducationDetails(newEducationDetails);
  };

  const addEducationDetail = () => {
    setEducationDetails([
      ...educationDetails,
      {
        id: educationDetails.length + 1,
        institution: '',
        degree: '',
        fieldOfStudy: '',
        yearOfCompletion: '',
      },
    ]);
  };

  return (
    <ScrollView>
      <View style={screenStyles.canvas}>
        <Text style={[screenStyles.heading, screenStyles.bigBoldText]}>
          Form A
        </Text>
        <Text style={[screenStyles.subHeading]}>Personal Details:</Text>
        <MyTextInput
          label="Name"
          value={personalDetails.name}
          onChangeText={text => handlePersonalDetailsChange('name', text)}
        />
        <MyTextInput
          label="Email"
          value={personalDetails.email}
          onChangeText={text => handlePersonalDetailsChange('email', text)}
          keyboardType="email-address"
        />
        <MyTextInput
          label="Phone"
          value={personalDetails.phone}
          onChangeText={text => handlePersonalDetailsChange('phone', text)}
          keyboardType="numeric"
        />

        <Text style={screenStyles.subHeading}>Current Address:</Text>
        <MyTextInput
          label="Address"
          value={personalDetails.currentAddress}
          // onChangeText={}
          multiline
          numberOfLines={4}
        />
        <MyTextInput
          label="City"
          value={personalDetails.currentCity}
          // onChangeText={}
        />
        <MyTextInput
          label="State"
          value={personalDetails.currentState}
          // onChangeText={}
        />
        <MyTextInput
          label="Country"
          value={personalDetails.currentCountry}
          // onChangeText={}
        />
        <MyTextInput
          label="Pincode"
          keyboardType="numeric"
          value={personalDetails.currentPincode}
          // onChangeText={}
        />

        <Text style={screenStyles.subHeading}> Permanent Address:</Text>
      <View style={screenStyles.SACAContainer}>
          <Checkbox
            color={ColorPalette.green}
            uncheckedColor={ColorPalette.green}
            status={
              SACAIsChecked ? 'checked' : 'unchecked'
            }
            onPress={() => {
              setSACAIsChecked(
                !SACAIsChecked,
              );
            }}
          />
          <Text>Same as Current Address</Text>
      </View>
        <MyTextInput
          label="Address"
          value={personalDetails.permanentAddress}
          // onChangeText={}
          multiline
          numberOfLines={4}
        />
        <MyTextInput
          label="City"
          value={personalDetails.permanentCity}
          // onChangeText={}
        />
        <MyTextInput
          label="State"
          value={personalDetails.permanentState}
          // onChangeText={}
        />
        <MyTextInput
          label="Country"
          value={personalDetails.permanentCountry}
          // onChangeText={}
        />
        <MyTextInput
          label="Pincode"
          keyboardType="numeric"
          value={personalDetails.permanentPincode}
          // onChangeText={}
        />
        <Text style={screenStyles.subHeading}>Educational Details:</Text>
        {educationDetails.map((education, index) => (
          <View key={education.id} style={{marginBottom: 20}}>
            <MyTextInput
              label="Institution"
              value={education.institution}
              onChangeText={text =>
                handleEducationDetailsChange(index, 'institution', text)
              }
            />
            <MyTextInput
              label="Degree"
              value={education.degree}
              onChangeText={text =>
                handleEducationDetailsChange(index, 'degree', text)
              }
            />
            <MyTextInput
              label="Field of Study"
              value={education.fieldOfStudy}
              onChangeText={text =>
                handleEducationDetailsChange(index, 'fieldOfStudy', text)
              }
            />
            <MyTextInput
              label="Year of Completion"
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
          <Text style={screenStyles.whiteText}>Add More Education</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={screenStyles.submitButton}
          onPress={() => console.log(personalDetails, educationDetails)}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Form1;
