import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './Style';

const ClipBoard: React.FC = ({navigation}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const [inputText, setInputText] = useState('');
  const [clipBoardText, setClipBoardText] = useState('');

  const copyToClipboard = () => {
    Clipboard.setString(inputText);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    console.log(text);
    setClipBoardText(text);
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={screenStyles.menuButton}>
        <MenuDrawerButton navigation={navigation} color={ColorPalette.green} />
      </View>
      <View style={screenStyles.container}>
        <TextInput
          style={screenStyles.textInput}
          onChangeText={e => setInputText(e)}
          value={inputText}
          mode="outlined"
          label="title"
          selectionColor={ColorPalette.green}
          underlineColor={ColorPalette.green}
          activeUnderlineColor={ColorPalette.green}
          outlineColor={ColorPalette.green}
          activeOutlineColor={ColorPalette.green}
        />
        <TouchableOpacity style={screenStyles.button} onPress={copyToClipboard}>
          <Text>Click here to copy to Clipboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={screenStyles.button} onPress={fetchCopiedText}>
          <Text>View copied text</Text>
        </TouchableOpacity>
        <Text style={screenStyles.copiedText}>{clipBoardText}</Text>
      </View>
    </ScrollView>
  );
};

export default ClipBoard;
