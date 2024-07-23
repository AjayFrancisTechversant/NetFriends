import React, {useState, useCallback} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MyTextInput from '../../Components/MyTextInput';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';

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
  resume: string | null;
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
  isExtra?: boolean;
};

const Form1: React.FC = () => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsType>({
    name: undefined,
    email: undefined,
    phone: undefined,
    dob: null,
    age: null,
    currentAddress: undefined,
    currentCity: undefined,
    currentState: undefined,
    currentCountry: undefined,
    currentPincode: undefined,
    permanentAddress: undefined,
    permanentCity: undefined,
    permanentState: undefined,
    permanentCountry: undefined,
    permanentPincode: undefined,
    resume: null,
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

  const [SACAIsChecked, setSACAIsChecked] = useState(false);

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  const handlePersonalDetailsChange = useCallback(
    (name: keyof PersonalDetailsType, value: string) => {
      setPersonalDetails(prevDetails => {
        const newDetails = {...prevDetails, [name]: value};
        if (SACAIsChecked && name.startsWith('current')) {
          const permanentKey = name.replace(
            'current',
            'permanent',
          ) as keyof PersonalDetailsType;
          newDetails[permanentKey] = value;
        }
        return newDetails;
      });
    },
    [SACAIsChecked],
  );

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
        id: prevDetails.length + 1,
        institution: '',
        degree: '',
        fieldOfStudy: '',
        yearOfCompletion: '',
        isExtra: true,
      },
    ]);
  }, []);

  const removeEducationDetail = useCallback((id: number) => {
    setEducationDetails(prevDetails =>
      prevDetails.filter(detail => detail.id !== id),
    );
  }, []);

  const handleSACA = useCallback(() => {
    setSACAIsChecked(prevChecked => {
      const newChecked = !prevChecked;
      if (newChecked) {
        setPersonalDetails(prevDetails => ({
          ...prevDetails,
          permanentAddress: prevDetails.currentAddress,
          permanentCity: prevDetails.currentCity,
          permanentCountry: prevDetails.currentCountry,
          permanentPincode: prevDetails.currentPincode,
          permanentState: prevDetails.currentState,
        }));
      }
      return newChecked;
    });
  }, []);

  return (
    <ScrollView>
      <View style={screenStyles.canvas}>
        <Text style={[screenStyles.heading, screenStyles.bigBoldText]}>
          Form 1
        </Text>
        <Text style={[screenStyles.subHeading]}>Personal Details:</Text>
        <View style={screenStyles.personalDetailsCard}>
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
        </View>
        <Text style={screenStyles.subHeading}>Current Address:</Text>
        <View style={screenStyles.commonAddressDetailsCard}>
          <MyTextInput
            label="Address"
            value={personalDetails.currentAddress}
            onChangeText={text =>
              handlePersonalDetailsChange('currentAddress', text)
            }
            multiline
            numberOfLines={4}
          />
          <MyTextInput
            label="City"
            value={personalDetails.currentCity}
            onChangeText={text =>
              handlePersonalDetailsChange('currentCity', text)
            }
          />
          <MyTextInput
            label="State"
            value={personalDetails.currentState}
            onChangeText={text =>
              handlePersonalDetailsChange('currentState', text)
            }
          />
          <MyTextInput
            label="Country"
            value={personalDetails.currentCountry}
            onChangeText={text =>
              handlePersonalDetailsChange('currentCountry', text)
            }
          />
          <MyTextInput
            label="Pincode"
            keyboardType="numeric"
            value={personalDetails.currentPincode}
            onChangeText={text =>
              handlePersonalDetailsChange('currentPincode', text)
            }
          />
        </View>

        <Text style={screenStyles.subHeading}>Permanent Address:</Text>
        <View style={screenStyles.SACAContainer}>
          <Checkbox
            color={ColorPalette.green}
            uncheckedColor={ColorPalette.green}
            status={SACAIsChecked ? 'checked' : 'unchecked'}
            onPress={handleSACA}
          />
          <Text>Same as Current Address</Text>
        </View>
        <View style={screenStyles.commonAddressDetailsCard}>
          <MyTextInput
            label="Address"
            disabled={SACAIsChecked}
            value={personalDetails.permanentAddress}
            onChangeText={text =>
              handlePersonalDetailsChange('permanentAddress', text)
            }
            multiline
            numberOfLines={4}
          />
          <MyTextInput
            label="City"
            disabled={SACAIsChecked}
            value={personalDetails.permanentCity}
            onChangeText={text =>
              handlePersonalDetailsChange('permanentCity', text)
            }
          />
          <MyTextInput
            label="State"
            disabled={SACAIsChecked}
            value={personalDetails.permanentState}
            onChangeText={text =>
              handlePersonalDetailsChange('permanentState', text)
            }
          />
          <MyTextInput
            label="Country"
            disabled={SACAIsChecked}
            value={personalDetails.permanentCountry}
            onChangeText={text =>
              handlePersonalDetailsChange('permanentCountry', text)
            }
          />
          <MyTextInput
            label="Pincode"
            disabled={SACAIsChecked}
            keyboardType="numeric"
            value={personalDetails.permanentPincode}
            onChangeText={text =>
              handlePersonalDetailsChange('permanentPincode', text)
            }
          />
        </View>
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
