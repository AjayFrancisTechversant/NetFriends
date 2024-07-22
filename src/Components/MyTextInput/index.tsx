import React from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';
import {StyleProp, TextStyle} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {TextInputLabelProp} from 'react-native-paper/lib/typescript/components/TextInput/types';
import styles from './style';

type MyTextInputPropsType = {
  color?: string;
}& TextInputProps

const MyTextInput: React.FC<MyTextInputPropsType> = ({
  onChangeText,
  mode,
  color,
  style,
  ...props
}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <TextInput
      onChangeText={onChangeText}
      mode={mode ? mode : 'outlined'}
      selectionColor={color ? color : ColorPalette.green}
      underlineColor={color ? color : ColorPalette.green}
      activeUnderlineColor={color ? color : ColorPalette.green}
      outlineColor={color ? color : ColorPalette.green}
      activeOutlineColor={color ? color : ColorPalette.green}
      cursorColor={color ? color : ColorPalette.green}
      style={[screenStyles.textInput, style]}
      {...props}
    />
  );
};

export default MyTextInput;
