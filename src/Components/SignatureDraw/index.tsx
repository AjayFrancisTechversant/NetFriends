import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useCallback, useRef} from 'react';
import {Canvas, Path, useCanvasRef} from '@shopify/react-native-skia';
import {runOnJS} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import StaticVariables from '../../Preferences/StaticVariables';
import {SetStateType} from '../../Types/Types';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import { updateDocumentsDetails } from '../../Redux/Slices/Form1DataSlice';
import styles from './style';

type SignatureDrawPropsType = {
  setIsSignatureDrawing: SetStateType<boolean>;
};

const SignatureDraw: React.FC<SignatureDrawPropsType> = ({
  setIsSignatureDrawing,
}) => {
  const documentsDetailsFromRedux = useAppSelector(
    state => state.Form1Data.documentsDetails,
  );
  const dispatch=useAppDispatch()
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const [paths, setPaths] = useState(StaticVariables.EMPTY_ARRAY);
  const pathsRef = useRef(paths);
  const canvasRef = useCanvasRef();

  const addNewPath = useCallback((x: number, y: number) => {
    setPaths(prevPaths => {
      const newPath = {segments: [`M ${x} ${y}`]};
      pathsRef.current = [...prevPaths, newPath];
      return pathsRef.current;
    });
  }, []);

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

  const handleClearDrawing = () => {
    setPaths(StaticVariables.EMPTY_ARRAY);
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
    if (canvasRef.current) {
      try {
        const imageSnapshot = canvasRef.current?.makeImageSnapshot();
        const base64FfSnapshot = imageSnapshot.encodeToBase64();
        const cacheDir = RNFS.CachesDirectoryPath;
        const filePath = `${cacheDir}/signature_drawn_${Date.now()}.png`;
        await RNFS.writeFile(filePath, base64FfSnapshot, 'base64');
        dispatch(updateDocumentsDetails({...documentsDetailsFromRedux,signature:`file://${filePath}`}))
        handleClearDrawing();
        setIsSignatureDrawing(false)
      } catch (error) {
        console.error('Failed to save the drawing:', error);
      }
    }
  };

  return (
    <View style={screenStyles.canvas}>
      <View style={screenStyles.headerContents}>
        <TouchableOpacity onPress={() => setIsSignatureDrawing(false)}>
          <AntDesign name="left" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <MaterialCommunityIcons
            name="check"
            size={30}
            color={ColorPalette.green}
          />
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
        <TouchableOpacity
          style={screenStyles.clearButton}
          onPress={handleClearDrawing}>
          <Text style={screenStyles.whiteText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignatureDraw;
