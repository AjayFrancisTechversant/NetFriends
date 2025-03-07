/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect, ReactNode} from 'react';
import {Dimensions as dim, useWindowDimensions} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {ScreenContextType} from '../Types/Types';

const ScreenContext = React.createContext<ScreenContextType | undefined>(
  undefined,
);

export const useScreenContext = (): ScreenContextType => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error(
      'useScreenContext must be used within a ScreenContextProvider',
    );
  }
  return context;
};

type ScreenContextProviderProps = {
  children: ReactNode;
};
export const ScreenContextProvider: React.FC<ScreenContextProviderProps> = ({
  children,
}) => {
  const dimensions = useWindowDimensions();
  // Get device dimensions
  const initHeight = dim.get('window').height;
  const initWidth = dim.get('window').width;
  const initScale = dim.get('window').scale;
  const initFontScale = dim.get('window').fontScale;
  const portrait = initHeight > initWidth;
  const isTypeTablet = isTablet();
  const [windowHeight, setWindowHeight] = useState(initHeight);
  const [windowWidth, setWindowWidth] = useState(initWidth);
  const [windowScale, setWindowScale] = useState(initScale);
  const [windowFontScale, setWindowFontScale] = useState(initFontScale);
  const [isPortrait, setIsPortrait] = useState(portrait);

  useEffect(() => {
    setItem();
  }, [dimensions]);

  function setItem() {
    const {fontScale, height, scale, width} = dimensions;
    const modPortrait = height > width;
    setWindowHeight(height);
    setWindowWidth(width);
    setWindowScale(scale);
    setWindowFontScale(fontScale);
    setIsPortrait(modPortrait);
  }
  return (
    <ScreenContext.Provider
      value={{
        windowHeight,
        windowWidth,
        isPortrait,
        windowScale,
        windowFontScale,
        isTypeTablet,
      }}>
      {children}
    </ScreenContext.Provider>
  );
};
