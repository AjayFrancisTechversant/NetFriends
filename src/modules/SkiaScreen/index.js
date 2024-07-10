import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import {Skia} from '@shopify/react-native-skia';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SkiaEditor from '../../Components/SkiaEditor';
import MySkiaProjects from '../../Components/MySkiaProjects';
import styles from './Style';

const SkiaScreen = ({navigation}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isMyProjectsOpen, setIsMyProjectsOpen] = useState(false);
  const [image, setImage] = useState(undefined);

  const handleOpenButton = async () => {
    await openImageFromGallery();
  };
  const openImageFromGallery = async () => {
    try {
      const selectedimage = await ImagePicker.openPicker({
        cropping:true,
        freeStyleCropEnabled:true,
        includeBase64: true,
      });
      const imageData = Skia.Data.fromBase64(selectedimage.data);
      const decodedImage = Skia.Image.MakeImageFromEncoded(imageData);
      setImage(decodedImage);
      setIsEditing(true);
    } catch (error) {
      Alert.alert(error.message)
    }
  };
  return (
    <View style={screenStyles.canvas}>
      {isEditing ? (
        <SkiaEditor image={image} setIsEditing={setIsEditing} />
      ) : isMyProjectsOpen ? (
        <MySkiaProjects setIsMyProjectsOpen={setIsMyProjectsOpen} />
      ) : (
        <View>
          <Text style={screenStyles.heading}>Skia Editor</Text>
          <View style={screenStyles.menuButton}>
            <MenuDrawerButton
              navigation={navigation}
              color={ColorPalette.green}
            />
          </View>
          <View style={screenStyles.plusButtonAndMyProjectsButtonContainer}>
            <View style={screenStyles.plusButtonImageContainer}>
              <TouchableOpacity onPress={handleOpenButton}>
                <AntDesign
                  name="pluscircleo"
                  size={150}
                  color={ColorPalette.gray}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setIsMyProjectsOpen(true)}
              style={screenStyles.myProjectsButton}>
              <Text style={screenStyles.myProjectsText}>My Projects</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default SkiaScreen;
