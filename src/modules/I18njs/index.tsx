import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {I18n} from 'i18n-js';
import {Button, Divider, Menu} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {translations} from '../../Assets/Translations/Translations';
import styles from './style';

const I18njs:React.FC = () => {
  const i18n = new I18n(translations);
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);
  const openLanguageMenu = () => setLanguageMenuVisible(true);
  const closeLanguageMenu = () => setLanguageMenuVisible(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  i18n.locale =
    selectedLanguage === 'English'
      ? 'en'
      : selectedLanguage === 'French'
      ? 'fr'
      : selectedLanguage === 'German'
      ? 'de'
      : 'en';
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.canvas}>
      <View style={screenStyles.selectLanguageContainer}>
        <Text>{i18n.t('Language')} </Text>
        <Menu
          visible={languageMenuVisible}
          onDismiss={closeLanguageMenu}
          anchor={
            <Button
              mode="contained-tonal"
              theme={{colors: {secondaryContainer: ColorPalette.lightGreen}}}
              onPress={openLanguageMenu}>
              {selectedLanguage} <AntDesign name="caretdown" size={10} />
            </Button>
          }
          anchorPosition="bottom"
          theme={{colors: {elevation: {level2: ColorPalette.white}}}}>
          <Menu.Item
            onPress={() => {
              setSelectedLanguage('English');
              setLanguageMenuVisible(false);
            }}
            title="English"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setSelectedLanguage('French');
              setLanguageMenuVisible(false);
            }}
            title="French"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setSelectedLanguage('German');
              setLanguageMenuVisible(false);
            }}
            title="German"
          />
        </Menu>
      </View>
      <View style={screenStyles.bodyContainer}>
        <Text>{i18n.t('OK')}</Text>
        <Text>{i18n.t('Cancel')}</Text>
        <Text>{i18n.t('Alert')}</Text>
        <Text>{i18n.t('Caution')}</Text>
        <Text>{i18n.t('Happy')}</Text>
        <Text>{i18n.t('How_are_You')}</Text>
        <Text>{i18n.t('I_am_fine')}</Text>
      </View>
    </View>
  );
};

export default I18njs;
