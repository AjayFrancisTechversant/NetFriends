import {
  ActivityIndicator,
  Alert,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  Canvas,
  Group,
  Image,
  Path,
  SkImage,
  useCanvasRef,
} from '@shopify/react-native-skia';
import {runOnJS} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import storage from '@react-native-firebase/storage';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import ColorPicker, {
  Preview,
  HueSlider,
  Swatches,
  returnedResults,
} from 'reanimated-color-picker';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import StaticVariables from '../../Preferences/StaticVariables';
import {SetStateType} from '../../Types/Types';
import CanvasWatermarkComponent from '../CanvasWatermarkComponent';
import styles from './style';
import GetLocation, {Location} from 'react-native-get-location';
import axios from 'axios';

type SkiaEditorPropsType = {
  setIsEditing: SetStateType<boolean>;
  image: SkImage | null;
};

const SkiaEditor: React.FC<SkiaEditorPropsType> = ({setIsEditing, image}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const [paths, setPaths] = useState(StaticVariables.EMPTY_ARRAY);
  const pathsRef = useRef(paths);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [isWatermarkEnabled, setIsWatermarkEnabled] = useState(false);
  const [region, setRegion] = useState(StaticVariables.EMPTY_STRING);
  const [isLocationFetchLoading, setIsLocationFetchedLoading] = useState(true);
  const canvasRef = useCanvasRef();
  const [showColorPickerModal, setShowColorPickerModal] = useState(false);
  const [penColor, setPenColor] = useState(ColorPalette.black);
  const [rotateValue, setRotateValue] = useState(0);
  const swatchColors = [
    ColorPalette.white,
    ColorPalette.black,
    ColorPalette.blue,
    ColorPalette.yellow,
    ColorPalette.orange,
    ColorPalette.green,
    ColorPalette.red,
    ColorPalette.gold,
    ColorPalette.gray,
  ];
  useEffect(() => {
    findCurrentRegion();
  }, []);

  const onSelectColor = ({hex}: returnedResults) => {
    setPenColor(hex);
  };

  const addNewPath = useCallback(
    (x: number, y: number) => {
      setPaths(prevPaths => {
        const newPath = {segments: [`M ${x} ${y}`], color: penColor};
        pathsRef.current = [...prevPaths, newPath];
        return pathsRef.current;
      });
    },
    [penColor],
  );

  const updatePath = useCallback((x: number, y: number) => {
    setPaths(prevPaths => {
      const newPaths = [...prevPaths];
      const index = newPaths.length - 1;
      if (newPaths[index]?.segments) {
        newPaths[index].segments.push(`L ${x} ${y}`);
      }
      pathsRef.current = newPaths;
      return newPaths;
    });
  }, []);

  const handlePenButton = () => {
    setIsDrawing(true);
  };
  const handleRotate = () => {
    setRotateValue(prevRotateValue => prevRotateValue + 90);
  };
  const clearLastPath = useCallback(() => {
    setPaths(prevPaths => {
      const newPaths = prevPaths.slice(0, -1);
      pathsRef.current = newPaths;
      return newPaths;
    });
  }, []);

  const handleCancelDrawing = () => {
    setPaths(StaticVariables.EMPTY_ARRAY);
    setIsDrawing(false);
  };
  const handleFinishDrawing = () => {
    setIsDrawing(false);
  };

  const gestureDraw = Gesture.Pan()
    .onStart(g => {
      runOnJS(addNewPath)(g.x, g.y);
    })
    .onUpdate(g => {
      runOnJS(updatePath)(g.x, g.y);
    })
    .minDistance(1);

  const uploadToCloud = async () => {
    try {
      setIsUploadLoading(true);
      const snapshot = canvasRef.current?.makeImageSnapshot();
      if (snapshot) {
        const base64String = snapshot.encodeToBase64();
        const uri = `data:image/png;base64,${base64String}`;
        const resizedImage = await ImageResizer.createResizedImage(
          uri,
          screenContext.windowWidth, // new width
          screenContext.windowHeight, // new height
          'PNG',
          50, // quality
        );
        const response = await fetch(resizedImage.uri);
        const blob = await response.blob();
        const storageRef = storage().ref(`images/snapshot_${Date.now()}.png`);
        await storageRef.put(blob);
        Alert.alert('File Uploaded');
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'File upload failed. Please try again.');
    } finally {
      setIsUploadLoading(false);
    }
  };

  const handleSave = async () => {
    await uploadToCloud();
  };
  const handleWatermarkButton = () => {
    setIsWatermarkEnabled(!isWatermarkEnabled);
  };
  const findCurrentRegion = async () => {
    const loc = await findCurrentLocation();
    if (loc) {
      fetchRegion(loc);
    }
  };

  const findCurrentLocation = async () => {
    try {
      const loc = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      return loc;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRegion = async (loc: Location) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${loc.latitude}%2C${loc.longitude}&key=dea3c45cdb0e4a4ea8c1ee183cbe55d6`,
      );
      setRegion(
        response.data.results[0].components.city +
          ', ' +
          response.data.results[0].components.state,
      );
      setIsLocationFetchedLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={screenStyles.canvas}>
      <View style={screenStyles.headerContents}>
        <TouchableOpacity onPress={() => setIsEditing(false)}>
          <AntDesign name="left" size={30} color={ColorPalette.green} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          {isDrawing?null
          :
          
          isUploadLoading ? (
            <ActivityIndicator color={ColorPalette.green} size={30} />
          ) : (
            <Entypo name="save" size={30} color={ColorPalette.green} />
          )}
        </TouchableOpacity>
      </View>
      <View style={screenStyles.canvasAndToolsContainer}>
        <View style={[screenStyles.canvasSkiaContainer]}>
          {isDrawing ? (
            <GestureDetector gesture={gestureDraw}>
              <Canvas
                ref={canvasRef}
                style={[
                  screenStyles.canvasSkia,
                  {transform: [{rotate: `${rotateValue}deg`}]},
                ]}>
                <Group>
                  {image && (
                    <Image
                      image={image}
                      fit="contain"
                      x={0}
                      y={0}
                      width={
                        screenContext.isPortrait
                          ? screenContext.windowWidth * 0.85
                          : screenContext.windowHeight * 0.85
                      }
                      height={
                        screenContext.isPortrait
                          ? screenContext.windowWidth * 0.85
                          : screenContext.windowHeight * 0.85
                      }
                    />
                  )}
                  {paths.map((p, index) => (
                    <Path
                      key={index}
                      path={p.segments.join(' ')}
                      strokeWidth={3}
                      style="stroke"
                      color={p.color}
                    />
                  ))}
                </Group>
              </Canvas>
            </GestureDetector>
          ) : (
            <Canvas ref={canvasRef} style={[screenStyles.canvasSkia]}>
              <Group
                origin={{
                  x: (screenContext.windowWidth * 0.85) / 2,
                  y: (screenContext.windowWidth * 0.85) / 2,
                }}
                transform={[{rotate: (rotateValue * Math.PI) / 180}]}>
                {image && (
                  <Image
                    image={image}
                    fit="contain"
                    x={0}
                    y={0}
                    width={
                      screenContext.isPortrait
                        ? screenContext.windowWidth * 0.85
                        : screenContext.windowHeight * 0.85
                    }
                    height={
                      screenContext.isPortrait
                        ? screenContext.windowWidth * 0.85
                        : screenContext.windowHeight * 0.85
                    }
                  />
                )}
                {paths.map((p, index) => (
                  <Path
                    key={index}
                    path={p.segments.join(' ')}
                    strokeWidth={3}
                    style="stroke"
                    color={p.color}
                  />
                ))}
              </Group>
                {isWatermarkEnabled && (
                  <CanvasWatermarkComponent
                    region={region}
                    canvasHeight={screenContext.windowWidth * 0.85}
                    canvasWidth={screenContext.windowWidth * 0.85}
                  />
                )}
            </Canvas>
          )}
        </View>
        <View style={screenStyles.toolsContainer}>
          {isDrawing ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  setShowColorPickerModal(true);
                }}>
                <MaterialCommunityIcons
                  name="format-color-fill"
                  size={30}
                  color={ColorPalette.green}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={clearLastPath}>
                <MaterialCommunityIcons
                  name="undo"
                  size={30}
                  color={ColorPalette.green}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancelDrawing}>
                <MaterialCommunityIcons
                  name="close"
                  size={30}
                  color={ColorPalette.green}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFinishDrawing}>
                <MaterialCommunityIcons
                  name="check"
                  size={30}
                  color={ColorPalette.green}
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={handlePenButton}>
                <FontAwesome5 name="pen" size={30} color={ColorPalette.green} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRotate}>
                <FontAwesome
                  name="rotate-right"
                  size={30}
                  color={ColorPalette.green}
                />
              </TouchableOpacity>
              {/* /////////////////////////////////// */}
              {!isLocationFetchLoading ? (
                <TouchableOpacity onPress={handleWatermarkButton}>
                  <MaterialCommunityIcons
                    name="watermark"
                    size={30}
                    color={
                      isWatermarkEnabled
                        ? ColorPalette.green
                        : ColorPalette.gray
                    }
                  />
                </TouchableOpacity>
              ) : (
                <ActivityIndicator />
              )}
            </>
          )}
        </View>
      </View>
      <Modal
        onRequestClose={() => setShowColorPickerModal(false)}
        transparent
        visible={showColorPickerModal}
        animationType="fade">
        <View style={screenStyles.modalFullScreenBackground}>
          <View style={screenStyles.modalView}>
            <ColorPicker value={penColor} onComplete={onSelectColor}>
              <Preview
                hideText
                hideInitialColor
                style={screenStyles.colorPreviewStyle}
              />
              <HueSlider style={screenStyles.colorSliderStyle} adaptSpectrum />
              <Swatches
                colors={swatchColors}
                swatchStyle={screenStyles.swatchStyle}
              />
            </ColorPicker>
            <TouchableOpacity
              style={screenStyles.ModalOKButton}
              onPress={() => setShowColorPickerModal(false)}>
              <Text style={screenStyles.OKText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(SkiaEditor);
