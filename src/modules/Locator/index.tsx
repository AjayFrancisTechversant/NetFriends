import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Linking,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GetLocation, {Location} from 'react-native-get-location';
import {BlurView} from '@react-native-community/blur';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import StaticVariables from '../../Preferences/StaticVariables';
import map_bg1 from '../../Assets/Images/map-bg1.jpg';
import styles from './style';

const Locator: React.FC = ({navigation}) => {
  const [isLocationFetched, setIsLocationFetched] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [isLocationFetchingLoading, setIsLocationFetchingLoading] =
    useState(false);
  const [region, setRegion] = useState(StaticVariables.EMPTY_STRING);

  const handleCurrentLocationButton = async () => {
    setIsLocationFetchingLoading(true);
    try {
      const loc = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      setLocation(loc);
      await fetchRegion(loc);
      setIsLocationFetched(true);
    } catch (error) {
      Alert.alert((error as Error).message);
      console.log(error);
    } finally {
      setIsLocationFetchingLoading(false);
    }
  };

  const fetchRegion = async (loc: Location) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${loc.latitude}%2C${loc.longitude}&key=dea3c45cdb0e4a4ea8c1ee183cbe55d6`,
      );
      const data = await response.json();
      setRegion(data.results[0]?.formatted || 'Region not found');
    } catch (error) {
      console.error(error);
    }
  };

  const openInMaps = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
      Linking.openURL(url).catch(err =>
        console.error('Error opening Google Maps:', err),
      );
    } else {
      Alert.alert('Location not found');
    }
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  return (
    <View style={screenStyles.canvas}>
      <ImageBackground
        source={map_bg1}
        resizeMode="cover"
        style={screenStyles.bgImage}>
        <Text style={screenStyles.mainHeading}>Locator</Text>
        <View style={screenStyles.MenuDrawerButton}>
          <MenuDrawerButton
            navigation={navigation}
            color={ColorPalette.white}
          />
        </View>
        {isLocationFetched && location ? (
          <View style={[screenStyles.BlurViewContainer]}>
            <BlurView blurType="light">
              <ScrollView>
                <TouchableOpacity
                  onPress={() => setIsLocationFetched(false)}
                  style={screenStyles.closeButton}>
                  <AntDesign
                    name="closecircle"
                    color={ColorPalette.white}
                    size={30}
                  />
                </TouchableOpacity>
                <Text style={[screenStyles.subHeading, screenStyles.whiteText]}>
                  {region}
                </Text>
                <Text style={[screenStyles.text, screenStyles.whiteText]}>
                  Latitude: {location.latitude}
                </Text>
                <Text style={[screenStyles.text, screenStyles.whiteText]}>
                  Longitude: {location.longitude}
                </Text>
                <Text style={[screenStyles.text, screenStyles.whiteText]}>
                  Altitude: {location.altitude}
                </Text>
                <TouchableOpacity
                  style={screenStyles.openMapsButton}
                  onPress={openInMaps}>
                  <MaterialCommunityIcons
                    color={ColorPalette.white}
                    name="google-maps"
                    size={20}
                  />
                  <Text style={screenStyles.openMapsText}>Open in Maps</Text>
                </TouchableOpacity>
              </ScrollView>
            </BlurView>
          </View>
        ) : (
          <View style={screenStyles.currentLocationButtonContainer}>
            <BlurView blurType="light" blurRadius={10}>
              {isLocationFetchingLoading ? (
                <View style={screenStyles.currentLocationButton}>
                  <ActivityIndicator color={ColorPalette.white} size={30} />
                </View>
              ) : (
                <TouchableOpacity
                  style={screenStyles.currentLocationButton}
                  onPress={handleCurrentLocationButton}>
                  <FontAwesome6
                    name="location-crosshairs"
                    color={ColorPalette.white}
                    size={20}
                  />
                </TouchableOpacity>
              )}
            </BlurView>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Locator;
