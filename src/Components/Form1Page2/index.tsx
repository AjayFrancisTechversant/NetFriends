import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SetStateType} from '../../Types/Types';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MyTextInput from '../MyTextInput';
import {Checkbox} from 'react-native-paper';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {
  lockPagesFrom,
  unlockPage,
  updateAddressDetails,
} from '../../Redux/Slices/Form1DataSlice';
import validate from '../../Validation/Validation';
import styles from './style';

export type AddressDetailsType = {
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
  const dispatch = useAppDispatch();
  const addressDetailsFromRedux = useAppSelector(
    state => state.Form1Data.addressDetails,
  );
  const [errors, setErrors] = useState<Partial<AddressDetailsType>>({});
  const [SACAIsChecked, setSACAIsChecked] = useState(false);

  const handleGoBack = () => {
    setSegmentedButtonValue('1');
  };
  const handleSave = () => {
    if (validateForm()) {
      dispatch(unlockPage(3));
      setSegmentedButtonValue('3');
    } else {
      dispatch(lockPagesFrom(3));
    }
  };
  const handleSACA = useCallback(() => {
    setSACAIsChecked(prevChecked => {
      const newChecked = !prevChecked;
      if (newChecked) {
        dispatch(
          updateAddressDetails({
            ...addressDetailsFromRedux,
            permanentAddress: addressDetailsFromRedux.currentAddress,
            permanentCity: addressDetailsFromRedux.currentCity,
            permanentCountry: addressDetailsFromRedux.currentCountry,
            permanentPincode: addressDetailsFromRedux.currentPincode,
            permanentState: addressDetailsFromRedux.currentState,
          }),
        );
      } 
      return newChecked;
    });
  }, [addressDetailsFromRedux, dispatch]);

  const handleAddressDetailsChange = useCallback(
    (name: keyof AddressDetailsType, value: string) => {
      setSACAIsChecked(false)
      dispatch(updateAddressDetails({...addressDetailsFromRedux, [name]: value }
      ));
    },
    [dispatch,addressDetailsFromRedux],
  );
  
  const renderTextInputLabel = (label: string, required: boolean) => (
    <Text>
      {label}
      {required && <Text style={screenStyles.errorText}> *</Text>}
    </Text>
  );
  const validateForm = () => {
    const newErrors: Partial<AddressDetailsType> = {};
    if (!validate(addressDetailsFromRedux.currentAddress))
      newErrors.currentAddress = 'Required!';
    if (!validate(addressDetailsFromRedux.currentCity))
      newErrors.currentCity = 'Required';
    if (!validate(addressDetailsFromRedux.currentState))
      newErrors.currentState = 'Required!';
    if (!validate(addressDetailsFromRedux.currentCountry))
      newErrors.currentCountry = 'Required!';
    if (!validate(addressDetailsFromRedux.permanentAddress))
      newErrors.permanentAddress = 'Required!';
    if (!validate(addressDetailsFromRedux.permanentCity))
      newErrors.permanentCity = 'Required!';
    if (!validate(addressDetailsFromRedux.permanentState))
      newErrors.permanentState = 'Required!';
    if (!validate(addressDetailsFromRedux.permanentCountry))
      newErrors.permanentCountry = 'Required!';
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
          value={addressDetailsFromRedux.currentAddress}
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
          value={addressDetailsFromRedux.currentCity}
          onChangeText={text => handleAddressDetailsChange('currentCity', text)}
        />
        {errors.currentCity && (
          <Text style={screenStyles.errorText}>{errors.currentCity}</Text>
        )}
        {renderTextInputLabel('State', true)}
        <MyTextInput
          style={screenStyles.textInput}
          value={addressDetailsFromRedux.currentState}
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
          value={addressDetailsFromRedux.currentCountry}
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
          value={addressDetailsFromRedux.currentPincode}
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
          value={addressDetailsFromRedux.permanentAddress}
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
          value={addressDetailsFromRedux.permanentCity}
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
          value={addressDetailsFromRedux.permanentState}
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
          value={addressDetailsFromRedux.permanentCountry}
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
          value={addressDetailsFromRedux.permanentPincode}
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
