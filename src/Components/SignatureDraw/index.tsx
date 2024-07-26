import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useCallback, useRef} from 'react';
import {
  Canvas,
  Group,
  Image,
  Path,
  useCanvasRef,
} from '@shopify/react-native-skia';
import {runOnJS} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
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
import styles from './style';

type SignatureDrawPropsType = {
  setIsSignatureDrawing: SetStateType<boolean>;
};

const SignatureDraw: React.FC<SignatureDrawPropsType> = ({
  setIsSignatureDrawing,
}) => {
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
  const canvasRef = useCanvasRef();
  const [showColorPickerModal, setShowColorPickerModal] = useState(false);
  const [penColor, setPenColor] = useState(ColorPalette.black);
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

  const handleSave = async () => {
    //save to cache memory and save that url in redux
  };

  return (
    <View style={screenStyles.canvas}>
      <View style={screenStyles.headerContents}>
        <TouchableOpacity onPress={() => setIsSignatureDrawing(false)}>
          <AntDesign name="left" size={30} color={ColorPalette.green} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          {isUploadLoading ? (
            <ActivityIndicator color={ColorPalette.green} size={30} />
          ) : (
            <Entypo name="save" size={30} color={ColorPalette.green} />
          )}
        </TouchableOpacity>
      </View>
      <View style={screenStyles.canvasAndToolsContainer}>
        <View style={[screenStyles.canvasSkiaContainer]}>
          <GestureDetector gesture={gestureDraw}>
            <Canvas ref={canvasRef} style={screenStyles.canvasSkia}>
                {paths.map((p, index) => (
                  <Path
                    key={index}
                    path={p.segments.join(' ')}
                    strokeWidth={3}
                    style="stroke"
                    color={p.color}
                  />
                ))}
            </Canvas>
          </GestureDetector>
        </View>
        <View style={screenStyles.toolsContainer}>
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

export default SignatureDraw;
