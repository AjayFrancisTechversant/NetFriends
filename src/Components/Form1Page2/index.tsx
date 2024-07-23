import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SetStateType} from '../../Types/Types';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import MyTextInput from '../MyTextInput';
import {Checkbox} from 'react-native-paper';
import ColorPalette from '../../Assets/Themes/ColorPalette';
type AddressDetailsType = {
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

  const [SACAIsChecked, setSACAIsChecked] = useState(false);

  const handleGoBack = () => {
    setSegmentedButtonValue('1');
  };
  const handleSave = () => {
    //save to redux logic
    console.log(addressDetails);
    setSegmentedButtonValue('3');
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
        <Text>Address</Text>
        <MyTextInput
          style={screenStyles.textInput}
          value={addressDetails.currentAddress}
          onChangeText={text =>
            handleAddressDetailsChange('currentAddress', text)
          }
          multiline
          numberOfLines={4}
        />
        <Text>City</Text>
        <MyTextInput
          style={screenStyles.textInput}
          value={addressDetails.currentCity}
          onChangeText={text => handleAddressDetailsChange('currentCity', text)}
        />
        <Text>State</Text>
        <MyTextInput
          style={screenStyles.textInput}
          value={addressDetails.currentState}
          onChangeText={text =>
            handleAddressDetailsChange('currentState', text)
          }
        />
        <Text>Country</Text>
        <MyTextInput
          style={screenStyles.textInput}
          value={addressDetails.currentCountry}
          onChangeText={text =>
            handleAddressDetailsChange('currentCountry', text)
          }
        />
        <Text>Pincode</Text>
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
        <Text>Address</Text>
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
        <Text>City</Text>
        <MyTextInput
          style={screenStyles.textInput}
          disabled={SACAIsChecked}
          value={addressDetails.permanentCity}
          onChangeText={text =>
            handleAddressDetailsChange('permanentCity', text)
          }
        />
        <Text>State</Text>
        <MyTextInput
          style={screenStyles.textInput}
          disabled={SACAIsChecked}
          value={addressDetails.permanentState}
          onChangeText={text =>
            handleAddressDetailsChange('permanentState', text)
          }
        />
        <Text>Country</Text>
        <MyTextInput
          style={screenStyles.textInput}
          disabled={SACAIsChecked}
          value={addressDetails.permanentCountry}
          onChangeText={text =>
            handleAddressDetailsChange('permanentCountry', text)
          }
        />
        <Text>Pincode</Text>
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
