import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Camera,
  PhotoFile,
  useCameraPermission,
} from 'react-native-vision-camera';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import CameraScreen from '../../Components/CameraScreen';
import CardA from '../../Components/CardA';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import StaticVariables from '../../Preferences/StaticVariables';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './Style';

const ImageUploader: React.FC = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const [takenPhotos, setTakenPhotos] = useState<string[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  const [compressedPhotos, setCompressedPhotos] = useState<string[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  const [isShutterLoading, setIsShutterLoading] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  const [isFetchingImages, setIsFetchingImages] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const camera = useRef<Camera>(null);

  useEffect(() => {
    requestPermission();
    fetchUploadedImages();
  }, []);

  const handleShutter = async () => {
    setIsShutterLoading(true);
    try {
      const photo: PhotoFile = await camera.current!.takePhoto({
        flash: isFlashOn ? 'on' : 'off',
      });
      setTakenPhotos(prevPhotos => [...prevPhotos, photo.path]);
    } catch (error) {
      Alert.alert('Error taking photo', (error as Error).message);
    } finally {
      setIsShutterLoading(false);
    }
  };

  const handleCameraButton = () => {
    if (!hasPermission) {
      Alert.alert('No camera permission', 'Please grant camera permission', [
        {text: 'Open Settings', onPress: () => Linking.openSettings()},
        {text: 'Cancel'},
      ]);
    } else {
      setIsCameraOpen(true);
    }
  };

  const handleDeleteImage = (index: number) => {
    setTakenPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };

  const compressTakenPhotos = async () => {
    const compressed = await Promise.all(
      takenPhotos.map(async photo => {
        try {
          const response = await ImageResizer.createResizedImage(
            photo,
            300,
            500,
            'JPEG',
            50,
            90,
          );
          return response.uri;
        } catch (error) {
          Alert.alert('Error compressing image', (error as Error).message);
          return null;
        }
      }),
    );
    return compressed.filter(uri => uri !== null);
  };

  const fetchExistingFiles = async (): Promise<string[]> => {
    const reference = storage().ref('Pics');
    const result = await reference.listAll();
    return result.items.map(item => item.fullPath);
  };

  const deleteExtraFiles = async (
    existingFiles: string[],
    currentFiles: string[],
  ) => {
    const currentFileNames = currentFiles.map(
      (_, index) => `Pics/pic${index + 1}`,
    );
    const filesToDelete = existingFiles.filter(
      file => !currentFileNames.includes(file),
    );
    await Promise.all(
      filesToDelete.map(async file => {
        const fileRef = storage().ref(file);
        await fileRef.delete();
      }),
    );
  };

  const uploadFilesToCloud = async (currentFiles: string[]) => {
    try {
      const existingFiles = await fetchExistingFiles();
      await deleteExtraFiles(existingFiles, currentFiles);
      await Promise.all(
        currentFiles.map(async (photo, index) => {
          const reference = storage().ref(`Pics/pic${index + 1}`);
          await reference.putFile(photo);
        }),
      );
    } catch (error) {
      Alert.alert('Error uploading files', (error as Error).message);
    }
  };

  const deleteDownloadedFiles = async () => {
    try {
      const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
      const deletePromises = files.map(file => RNFS.unlink(file.path));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error deleting files', error);
    }
  };

  const handleUploadButton = async () => {
    setIsUploadLoading(true);
    await deleteDownloadedFiles();
    const compressed = await compressTakenPhotos();
    setCompressedPhotos(compressed);
    await uploadFilesToCloud(compressed);
    await fetchUploadedImages();
    setIsUploadLoading(false);
    setTakenPhotos(StaticVariables.EMPTY_ARRAY);
  };

  const fetchUploadedImages = async () => {
    setIsFetchingImages(true);
    setUploadedImageUrls(StaticVariables.EMPTY_ARRAY);
    try {
      const existingFiles = await fetchExistingFiles();
      const localPaths = await Promise.all(
        existingFiles.map(async filePath => {
          const uniqueFileName = `${filePath.split('/').pop()}_${Date.now()}`;
          const localFilePath = `${RNFS.DocumentDirectoryPath}/${uniqueFileName}`;
          const fileExists = await RNFS.exists(localFilePath);
          if (!fileExists) {
            const url = await storage().ref(filePath).getDownloadURL();
            await RNFS.downloadFile({fromUrl: url, toFile: localFilePath})
              .promise;
          }
          return localFilePath;
        }),
      );
      setUploadedImageUrls(localPaths);
    } catch (error) {
      Alert.alert('Error fetching uploaded images', (error as Error).message);
    } finally {
      setIsFetchingImages(false);
    }
  };

  const handleDeleteUploadedImage = async (index: number) => {
    try {
      const existingFiles = await fetchExistingFiles();
      try {
        setIsFetchingImages(true);
        const deleteFileRef = storage().ref(existingFiles[index]);
        await deleteFileRef.delete();
        fetchUploadedImages();
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
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
      {isCameraOpen ? (
        <CameraScreen
          takenPhotos={takenPhotos}
          isFlashOn={isFlashOn}
          setIsFlashOn={setIsFlashOn}
          isShutterLoading={isShutterLoading}
          handleShutter={handleShutter}
          camera={camera}
          setIsCameraOpen={setIsCameraOpen}
        />
      ) : (
        <ScrollView>
          <Text style={screenStyles.mainHeading}>Image Upload</Text>
          <View style={screenStyles.dashedBorder}>
            <TouchableOpacity
              style={screenStyles.cameraButton}
              onPress={handleCameraButton}>
              <MaterialCommunityIcons name="camera-plus" size={50} />
            </TouchableOpacity>
            <Text>Click to Capture Images</Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
              <View style={screenStyles.itemSeparatorComponent}></View>
            }
            ListFooterComponent={
              <View style={screenStyles.itemSeparatorComponent}></View>
            }
            ItemSeparatorComponent={() => (
              <View style={screenStyles.itemSeparatorComponent}></View>
            )}
            horizontal={true}
            data={takenPhotos}
            renderItem={({index, item}) => (
              <CardA
                item={item}
                index={index}
                onPressDeletefn={handleDeleteImage}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          {isUploadLoading ? (
            <ActivityIndicator size={40} style={screenStyles.uploadButton} />
          ) : takenPhotos.length > 0 && takenPhotos.length <= 6 ? (
            <TouchableOpacity
              onPress={handleUploadButton}
              style={screenStyles.uploadButton}>
              <AntDesign
                name="cloudupload"
                size={50}
                color={ColorPalette.green}
              />
            </TouchableOpacity>
          ) : takenPhotos.length > 6 ? (
            <View>
              <TouchableOpacity disabled style={screenStyles.uploadButton}>
                <AntDesign
                  name="cloudupload"
                  size={50}
                  color={ColorPalette.green}
                />
              </TouchableOpacity>
              <Text style={screenStyles.only6PicsText}>
                You can upload only 6 pictures
              </Text>
            </View>
          ) : null}
          <Text style={screenStyles.subHeading}>Uploaded Images:</Text>
          {isFetchingImages ? (
            <ActivityIndicator size={40} color={ColorPalette.gray} />
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={
                <View style={screenStyles.itemSeparatorComponent}></View>
              }
              ListFooterComponent={
                <View style={screenStyles.itemSeparatorComponent}></View>
              }
              ItemSeparatorComponent={() => (
                <View style={screenStyles.itemSeparatorComponent}></View>
              )}
              horizontal={true}
              ListEmptyComponent={
                <Text style={screenStyles.emptyComponentStyle}>
                  No Uploaded Images
                </Text>
              }
              data={uploadedImageUrls}
              renderItem={({item, index}) => (
                <CardA
                  item={item}
                  index={index}
                  onPressDeletefn={handleDeleteUploadedImage}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ImageUploader;
