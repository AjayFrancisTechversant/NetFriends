import {View, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import React, {useState} from 'react';
import {
  useCameraDevice,
  Camera,
} from 'react-native-vision-camera';
import {Badge} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {SetStateType} from '../../Types/Types';
import { styles } from './style';

type CameraScreenPropsType = {
  takenPhotos: string[];
  setIsFlashOn: SetStateType<boolean>;
  isFlashOn: boolean;
  isShutterLoading: boolean;
  handleShutter: () => Promise<void>;
  camera: React.RefObject<Camera>;
  setIsCameraOpen: SetStateType<boolean>;
};

const CameraScreen: React.FC<CameraScreenPropsType> = ({
  takenPhotos,
  setIsFlashOn,
  isFlashOn,
  isShutterLoading,
  handleShutter,
  camera,
  setIsCameraOpen,
}) => {
  const [isTorchOn, setIsTorchOn] = useState(false);
  const device = useCameraDevice('back');
  if (!device) {
    Alert.alert('No camera device available');
    return null;
  }

  return (
    <View>
      <Camera
        torch={isTorchOn ? 'on' : 'off'}
        ref={camera}
        style={{height: '100%'}}
        device={device}
        isActive={true}
        photo={true}
      />
      <TouchableOpacity
        onPress={() => setIsCameraOpen(false)}
        style={styles.backButton}>
        <Entypo name="chevron-left" color={ColorPalette.white} size={40} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsCameraOpen(false)}
        style={styles.galleryIcon}>
        <Badge>{takenPhotos.length}</Badge>
        <Entypo name="images" color={ColorPalette.white} size={40} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsFlashOn(!isFlashOn)}
        style={styles.flashIcon}>
        <MaterialCommunityIcons
          name={!isFlashOn ? 'flash-off' : 'flash'}
          color={ColorPalette.white}
          size={40}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTorchOn(!isTorchOn)}
        style={styles.torchIcon}>
        <MaterialCommunityIcons
          name={!isTorchOn ? 'flashlight-off' : 'flashlight'}
          color={ColorPalette.white}
          size={40}
        />
      </TouchableOpacity>
      {isShutterLoading ? (
        <ActivityIndicator
          color={ColorPalette.white}
          size={70}
          style={styles.shutterButton}
        />
      ) : (
        <TouchableOpacity onPress={handleShutter} style={styles.shutterButton}>
          <Entypo name="circle" color={ColorPalette.white} size={70} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CameraScreen;
