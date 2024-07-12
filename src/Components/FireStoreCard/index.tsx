import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './Style';
import {Booktype} from '../../modules/BooksFirestore';
import {SetStateType} from '../../Types/Types';

interface FireStoreCardPropsType {
  item: {desc: string; key: string; title: string};
  handleDelete: (id: string) => void;
  handleEditButton: (book: Booktype) => void;
  setModalVisible: SetStateType<boolean>;
  modalVisible: boolean;
  handleUpdate: () => void;
  setTitle: SetStateType<string>;
  setDesc: SetStateType<string>;
  title: string;
  desc: string;
}

const FireStoreCard: React.FC<FireStoreCardPropsType> = ({
  item,
  handleDelete,
  handleEditButton,
  setModalVisible,
  modalVisible,
  handleUpdate,
  setTitle,
  setDesc,
  title,
  desc,
}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  const handleClose = () => {
    setModalVisible(false);
    setTitle(StaticVariables.EMPTY_STRING);
    setDesc(StaticVariables.EMPTY_STRING);
  };
  return (
    <View style={screenStyles.card}>
      <View>
        <Text style={screenStyles.cardTittle}>{item.title}</Text>
        <Text>{item.desc}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => handleDelete(item.key)}>
          <MaterialIcons name="delete" size={30} color={ColorPalette.red} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditButton(item)}>
          <MaterialIcons name="edit" size={30} color={ColorPalette.yellow} />
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={screenStyles.modalContainer}>
          <View style={screenStyles.modal}>
            <Text style={screenStyles.modalTitle}>Edit Book</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              mode="outlined"
              label="Title"
              selectionColor={ColorPalette.green}
              underlineColor={ColorPalette.green}
              activeUnderlineColor={ColorPalette.green}
              outlineColor={ColorPalette.green}
              activeOutlineColor={ColorPalette.green}
            />
            <TextInput
              value={desc}
              onChangeText={setDesc}
              mode="outlined"
              label="Description"
              selectionColor={ColorPalette.green}
              underlineColor={ColorPalette.green}
              activeUnderlineColor={ColorPalette.green}
              outlineColor={ColorPalette.green}
              activeOutlineColor={ColorPalette.green}
            />
            <View style={screenStyles.flexRow}>
              <TouchableOpacity onPress={() => handleUpdate()}>
                <AntDesign size={30} color={ColorPalette.green} name="check" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleClose()}>
                <AntDesign size={30} color={ColorPalette.red} name="close" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FireStoreCard;
