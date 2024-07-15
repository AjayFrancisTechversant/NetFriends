import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const Crashlytics: React.FC = () => {
  const [enabled, setEnabled] = useState(
    crashlytics().isCrashlyticsCollectionEnabled,
  );
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const handleSetCrashAttributes = async () => {
    await crashlytics().setAttribute('uid', '11');
  };
  async function handleToggleCrashlytics() {
    await crashlytics()
      .setCrashlyticsCollectionEnabled(!enabled)
      .then(() => setEnabled(crashlytics().isCrashlyticsCollectionEnabled));
  }
  const handleCrash = () => {
    crashlytics().log('in crashlytics screen');
    crashlytics().crash();
  };

  return (
    <View style={screenStyles.canvas}>
      <View style={screenStyles.menuButton}>
        <MenuDrawerButton color={ColorPalette.green} />
      </View>
      <Text style={screenStyles.heading}>Crashlytics</Text>
      <TouchableOpacity
        style={screenStyles.toggleButton}
        onPress={() => handleSetCrashAttributes()}>
        <Text style={screenStyles.whiteText}>Set Crash Attributes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={screenStyles.toggleButton}
        onPress={handleToggleCrashlytics}>
        <Text style={screenStyles.whiteText}>Toggle Crashlytics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={screenStyles.crashButton} onPress={handleCrash}>
        <Text style={screenStyles.whiteText}>Crash</Text>
      </TouchableOpacity>
      <Text>Crashlytics is currently {enabled ? 'enabled' : 'disabled'}</Text>
    </View>
  );
};

export default Crashlytics;
