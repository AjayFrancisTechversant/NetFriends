import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TextInput, Button as PaperButton } from 'react-native-paper';

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface EducationDetail {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  yearOfCompletion: string;
}

const Form1: React.FC = () => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [educationDetails, setEducationDetails] = useState<EducationDetail[]>([
    { id: 1, institution: '', degree: '', fieldOfStudy: '', yearOfCompletion: '' },
  ]);

  const handlePersonalDetailsChange = (name: keyof PersonalDetails, value: string) => {
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const handleEducationDetailsChange = (index: number, name: keyof EducationDetail, value: string) => {
    const newEducationDetails = [...educationDetails];
    newEducationDetails[index][name] = value;
    setEducationDetails(newEducationDetails);
  };

  const addEducationDetail = () => {
    setEducationDetails([
      ...educationDetails,
      { id: educationDetails.length + 1, institution: '', degree: '', fieldOfStudy: '', yearOfCompletion: '' },
    ]);
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Personal Details</Text>
        <TextInput
          label="First Name"
          value={personalDetails.firstName}
          onChangeText={(text) => handlePersonalDetailsChange('firstName', text)}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Last Name"
          value={personalDetails.lastName}
          onChangeText={(text) => handlePersonalDetailsChange('lastName', text)}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Email"
          value={personalDetails.email}
          onChangeText={(text) => handlePersonalDetailsChange('email', text)}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Phone"
          value={personalDetails.phone}
          onChangeText={(text) => handlePersonalDetailsChange('phone', text)}
          style={{ marginBottom: 10 }}
        />
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Educational Details</Text>
        {educationDetails.map((education, index) => (
          <View key={education.id} style={{ marginBottom: 20 }}>
            <TextInput
              label="Institution"
              value={education.institution}
              onChangeText={(text) => handleEducationDetailsChange(index, 'institution', text)}
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Degree"
              value={education.degree}
              onChangeText={(text) => handleEducationDetailsChange(index, 'degree', text)}
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Field of Study"
              value={education.fieldOfStudy}
              onChangeText={(text) => handleEducationDetailsChange(index, 'fieldOfStudy', text)}
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Year of Completion"
              value={education.yearOfCompletion}
              onChangeText={(text) => handleEducationDetailsChange(index, 'yearOfCompletion', text)}
              style={{ marginBottom: 10 }}
            />
          </View>
        ))}
        <PaperButton mode="contained" onPress={addEducationDetail} style={{ marginBottom: 20 }}>
          Add More Education
        </PaperButton>
        <PaperButton mode="contained" onPress={() => console.log(personalDetails, educationDetails)}>
          Submit
        </PaperButton>
      </View>
    </ScrollView>
  );
};

export default Form1;
