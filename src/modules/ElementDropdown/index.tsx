import {View, Text, TouchableOpacity, LayoutAnimation} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style';
import axios, {Axios} from 'axios';
import StaticVariables from '../../Preferences/StaticVariables';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MenuDrawerButton from '../../Components/MenuDrawerButton';

const ElementDropdown = () => {
  const [countryList, setCountryList] = useState(StaticVariables.EMPTY_ARRAY);
  const [statesList, setStatesList] = useState(StaticVariables.EMPTY_ARRAY);
  const [CountryId, setCountryId] = useState<string | null>(null);
  const [stateId, setStateId] = useState<string | null>(null);
  const [selected, setSelected] = useState(StaticVariables.EMPTY_ARRAY);
  const fetchCountries = async () => {
    try {
      let response = await axios.get(
        'https://api.staging.bistrainer.com/v2/countries',
      );
      setCountryList(response.data.result.countries);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchStates = async (countryid: string) => {
    try {
      let response = await axios.post(
        `https://api.staging.bistrainer.com/v2/states/?countryid=${countryid}`,
      );
      setStatesList(response.data.result.states);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const renderStateDropdownItem = (item: any) => {
    return (
      <View style={screenStyles.stateDropdownItem}>
        <Text style={screenStyles.stateDropdowntextItem}>{item.name}</Text>
        {item.id === stateId && (
          <AntDesign color={ColorPalette.green} name="check" size={20} />
        )}
      </View>
    );
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.menuButton}>
        <MenuDrawerButton color={ColorPalette.green} />
      </View>
      <Text style={screenStyles.heading}>Element Dropdown</Text>
      <Text style={screenStyles.subheading}>Select Country</Text>
      <Dropdown
        style={screenStyles.dropdown}
        inputSearchStyle={screenStyles.inputSearchStyle}
        iconStyle={screenStyles.iconStyle}
        data={countryList}
        search
        maxHeight={screenContext.windowHeight * 0.5}
        labelField="name"
        valueField="id"
        placeholder={'Select Country'}
        searchPlaceholder="Search..."
        onChange={item => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setCountryId(item.id);
          fetchStates(item.id);
        }}
        renderLeftIcon={() => (
          <FontAwesome5
            style={screenStyles.icon}
            color={CountryId ? ColorPalette.green : ColorPalette.black}
            name="globe-americas"
            size={20}
          />
        )}
      />
      {CountryId && (
        <>
          <Text style={screenStyles.subheading}>Select State</Text>
          <Dropdown
            style={screenStyles.dropdown}
            inputSearchStyle={screenStyles.inputSearchStyle}
            iconStyle={screenStyles.iconStyle}
            data={statesList}
            search
            maxHeight={screenContext.windowHeight * 0.5}
            labelField="name"
            valueField="id"
            placeholder="Select State"
            searchPlaceholder="Search..."
            onChange={item => {
              setStateId(item.id);
            }}
            renderLeftIcon={() => (
              <FontAwesome6
                style={screenStyles.icon}
                color={stateId ? ColorPalette.green : ColorPalette.black}
                name="magnifying-glass-location"
                size={20}
              />
            )}
            renderItem={renderStateDropdownItem}
          />
        </>
      )}
      <Text style={screenStyles.subheading}>Multiselect example</Text>
      <MultiSelect
        style={screenStyles.dropdown}
        inputSearchStyle={screenStyles.inputSearchStyle}
        selectedTextStyle={screenStyles.selectedTextStyle}
        iconStyle={screenStyles.iconStyle}
        search
      activeColor={ColorPalette.green}
        data={countryList}
        labelField="name"
        valueField="id"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={selected}
        onChange={item => {
          setSelected(item);
        }}
        renderLeftIcon={() => (
          <AntDesign color="black" name="Safety" size={20} />
        )}
        selectedStyle={screenStyles.selectedStyle}
      />
    </View>
  );
};

export default ElementDropdown;
