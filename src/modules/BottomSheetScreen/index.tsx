import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import BottomSheet, {BottomSheetScrollView, BottomSheetView} from '@gorhom/bottom-sheet';
import styles from './style';

const BottomSheetScreen = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={screenStyles.container}>
      <TouchableOpacity
        style={screenStyles.button}
        onPress={() => setIsBottomSheetVisible(true)}>
        <Text style={screenStyles.whiteText}>Bottom Sheet</Text>
      </TouchableOpacity>
      {isBottomSheetVisible && (
        <BottomSheet
          snapPoints={[ 200, 500]}
          //   detached={true}
          index={0}
          enablePanDownToClose={true}
          onClose={() => setIsBottomSheetVisible(false)}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}>
          <BottomSheetScrollView>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
          </BottomSheetScrollView>
   
        </BottomSheet>
      )}
    </View>
  );
};

export default BottomSheetScreen;
