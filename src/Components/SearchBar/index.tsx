import {View} from 'react-native';
import React from 'react';
import {Searchbar} from 'react-native-paper';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';
import {SetStateType} from '../../Types/Types';

type SearchBarPropsType = {
  searchText: string;
  setSearchText: SetStateType<string>;
};

const SearchBar: React.FC<SearchBarPropsType> = ({
  searchText,
  setSearchText,
}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  return (
    <View>
      <Searchbar
        onChangeText={e => setSearchText(e)}
        value={searchText}
        style={screenStyles.searchBar}
        placeholder="Search"
        iconColor={ColorPalette.green}
        elevation={2}
        rippleColor={ColorPalette.green}
        cursorColor={ColorPalette.green}
        placeholderTextColor={ColorPalette.green}
      />
    </View>
  );
};

export default SearchBar;
