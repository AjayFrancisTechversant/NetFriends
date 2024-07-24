import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SetStateType} from '../../Types/Types';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MyTextInput from '../MyTextInput';
import {Checkbox} from 'react-native-paper';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';

type AddressDetailsType = {
  currentAddress: string | undefined;
  currentCity: string | undefined;
  currentState: string | undefined;
  currentCountry: string | undefined;
  currentPincode?: string;
  permanentAddress: string | undefined;
  permanentCity: string | undefined;
  permanentState: string | undefined;
  permanentCountry: string | undefined;
  permanentPincode?: string;
};

type Form1Page2PropsType = {
  setSegmentedButtonValue: SetStateType<string>;
};
const Form1Page2: React.FC<Form1Page2PropsType> = ({
  setSegmentedButtonValue,
}) => {
  const [addressDetails, setAddressDetails] = useState<AddressDetailsType>({
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
  });
  const [errors, setErrors] = useState<Partial<AddressDetailsType>>({});
  const [SACAIsChecked, setSACAIsChecked] = useState(false);

  const handleGoBack = () => {
    setSegmentedButtonValue('1');
  };
  const handleSave = () => {
    if (validateForm()) {
      //save to redux logic
      console.log(addressDetails);
      setSegmentedButtonValue('3');
    }
  };
  const handleSACA = useCallback(() => {
    setSACAIsChecked(prevChecked => {
      const newChecked = !prevChecked;
      if (newChecked) {
        setAddressDetails(prevDetails => ({
          ...prevDetails,
          permanentAddress: prevDetails.currentAddress,
          permanentCity: prevDetails.currentCity,
          permanentCountry: prevDetails.currentCountry,
          permanentPincode: prevDetails.currentPincode,
          permanentState: prevDetails.currentState,
        }));
      } else {
        setAddressDetails(prevDetails => ({
          ...prevDetails,
          permanentAddress: undefined,
          permanentCity: undefined,
          permanentState: undefined,
          permanentCountry: undefined,
          permanentPincode: undefined,
        }));
      }
      return newChecked;
    });
  }, []);

  const handleAddressDetailsChange = useCallback(
    (name: keyof AddressDetailsType, value: string) => {
      setAddressDetails(prevDetails => {
        const newDetails = {...prevDetails, [name]: value};
        if (SACAIsChecked && name.startsWith('current')) {
          const permanentKey = name.replace(
            'current',
            'permanent',
          ) as keyof AddressDetailsType;
          newDetails[permanentKey] = value;
        }
        return newDetails;
      });
    },
    [SACAIsChecked],
  );

  const renderTextInputLabel = (label: string, required: boolean) => (
    <Text>
      {label}
      {required && <Text style={screenStyles.errorText}> *</Text>}
    </Text>
  );
  const validateForm = () => {
    const newErrors: Partial<AddressDetailsType> = {};
    if (!addressDetails.currentAddress)
      newErrors.currentAddress = 'Address is required';
    if (!addressDetails.currentCity) newErrors.currentCity = 'City is required';
    if (!addressDetails.currentState)
      newErrors.currentState = 'State is required';
    if (!addressDetails.currentCountry)
      newErrors.currentCountry = 'Country is required';
    if (!addressDetails.permanentAddress)
      newErrors.permanentAddress = 'Address is required';
    if (!addressDetails.permanentCity)
      newErrors.permanentCity = 'City is required';
    if (!addressDetails.permanentState)
      newErrors.permanentState = 'State is required';
    if (!addressDetails.permanentCountry)
      newErrors.permanentCountry = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  return (
    <View>
      <Text style={screenStyles.subHeading}>Current Address:</Text>
      <View style={screenStyles.commonAddressDetailsCard}>
        {renderTextInputLabel('Address', true)}
        <MyTextInput
          style={screenStyles.textInput}
          value={addressDetails.currentAddress}
          onChangeText={text =>
            handleAddressDetailsChange('currentAddress', text)
          }
          multiline
          numberOfLines={4}
        />
        {errors.currentAddress && (
          <Text style={screenStyles.errorText}>{errors.currentAddress}</Text>
        )}
        {renderTextInputLabel('City', true)}
        <MyTextInput
          style={screenStyles.textInput}
          value={addressDetails.currentCity}
          onChangeText={text => handleAddressDetailsChange('currentCity', text)}
        />
         {errors.currentCity && (
          <Text style={screenStyles.errorText}>{errors.currentCity}</Text>
        )}
        {renderTextInputLabel('State', true)}
        <MyTextInput
          style={screenStyles.textInput}
          value={addressDetails.currentState}
          onChangeText={text =>
            handleAddressDetailsChange('currentState', text)
          }
        />
         {errors.currentState && (
          <Text style={screenStyles.errorText}>{errors.currentState}</Text>
        )}
        {renderTextInputLabel('Country', true)}
        <MyTextInput
          style={screenStyles.textInput}
          value={addressDetails.currentCountry}
          onChangeText={text =>
            handleAddressDetailsChange('currentCountry', text)
          }
        />
         {errors.currentCountry && (
          <Text style={screenStyles.errorText}>{errors.currentCountry}</Text>
        )}
        {renderTextInputLabel('Pincode', false)}
        <MyTextInput
          style={screenStyles.textInput}
          keyboardType="numeric"
          value={addressDetails.currentPincode}
          onChangeText={text =>
            handleAddressDetailsChange('currentPincode', text)
          }
        />
      </View>
      <Text style={screenStyles.subHeading}>Permanent Address:</Text>
      <View style={screenStyles.commonAddressDetailsCard}>
        <View style={screenStyles.SACAContainer}>
          <Checkbox
            color={ColorPalette.green}
            uncheckedColor={ColorPalette.green}
            status={SACAIsChecked ? 'checked' : 'unchecked'}
            onPress={handleSACA}
          />
          <Text>Same as Current Address</Text>
        </View>
        {renderTextInputLabel('Address', true)}
        <MyTextInput
          style={screenStyles.textInput}
          disabled={SACAIsChecked}
          value={addressDetails.permanentAddress}
          onChangeText={text =>
            handleAddressDetailsChange('permanentAddress', text)
          }
          multiline
          numberOfLines={4}
        />
         {errors.permanentAddress && (
          <Text style={screenStyles.errorText}>{errors.permanentAddress}</Text>
        )}
        {renderTextInputLabel('City', true)}
        <MyTextInput
          style={screenStyles.textInput}
          disabled={SACAIsChecked}
          value={addressDetails.permanentCity}
          onChangeText={text =>
            handleAddressDetailsChange('permanentCity', text)
          }
        />
         {errors.permanentCity && (
          <Text style={screenStyles.errorText}>{errors.permanentCity}</Text>
        )}
        {renderTextInputLabel('State', true)}
        <MyTextInput
          style={screenStyles.textInput}
          disabled={SACAIsChecked}
          value={addressDetails.permanentState}
          onChangeText={text =>
            handleAddressDetailsChange('permanentState', text)
          }
        />
         {errors.permanentState && (
          <Text style={screenStyles.errorText}>{errors.permanentState}</Text>
        )}
        {renderTextInputLabel('Country', true)}
        <MyTextInput
          style={screenStyles.textInput}
          disabled={SACAIsChecked}
          value={addressDetails.permanentCountry}
          onChangeText={text =>
            handleAddressDetailsChange('permanentCountry', text)
          }
        />
         {errors.permanentCountry && (
          <Text style={screenStyles.errorText}>{errors.permanentCountry}</Text>
        )}
        {renderTextInputLabel('Pincode', false)}
        <MyTextInput
          style={screenStyles.textInput}
          disabled={SACAIsChecked}
          keyboardType="numeric"
          value={addressDetails.permanentPincode}
          onChangeText={text =>
            handleAddressDetailsChange('permanentPincode', text)
          }
        />
      </View>
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

export default Form1Page2;
