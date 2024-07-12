import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import {Skia, SkImage} from '@shopify/react-native-skia';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SkiaEditor from '../../Components/SkiaEditor';
import MySkiaProjects from '../../Components/MySkiaProjects';
import styles from './style';

const SkiaScreen: React.FC = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isMyProjectsOpen, setIsMyProjectsOpen] = useState(false);
  const [image, setImage] = useState<SkImage | null>(null);

  const handleOpenButton = async () => {
    await openImageFromGallery();
  };
  const openImageFromGallery = async () => {
    try {
      const selectedimage: Image = await ImagePicker.openPicker({
        cropping: true,
        freeStyleCropEnabled: true,
        includeBase64: true,
      });
      if (selectedimage.data) {
        const imageData = Skia.Data.fromBase64(selectedimage.data);
        const decodedImage = Skia.Image.MakeImageFromEncoded(imageData);
        if (decodedImage) {
          setImage(decodedImage);
          setIsEditing(true);
        } else {
          Alert.alert('Error', 'Failed to decode image.');
        }
      } else {
        Alert.alert('Error', 'No image data found.');
      }
    } catch (error) {
      Alert.alert((error as Error).message);
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
            <MenuDrawerButton color={ColorPalette.green} />
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
