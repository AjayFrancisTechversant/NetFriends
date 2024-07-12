import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './Style';

type BookType = {
  key: string;
  title: string;
  desc: string;
};

const BooksRealtimeDatabase: React.FC = () => {
  const [title, setTitle] = useState<string>(StaticVariables.EMPTY_STRING);
  const [desc, setDesc] = useState<string>(StaticVariables.EMPTY_STRING);
  const [books, setBooks] = useState<BookType[]>(StaticVariables.EMPTY_ARRAY);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  // Read data from Firebase
  useEffect(() => {
    const onValueChange = database()
      .ref('/todo')
      .on('value', snapshot => {
        const data = snapshot.val();
        const booksList = data
          ? Object.keys(data).map(key => ({...data[key], key}))
          : StaticVariables.EMPTY_ARRAY;
        setBooks(booksList);
      });
    return () => database().ref('/todo').off('value', onValueChange);
  }, []);

  const handleAdd = async () => {
    if (title) {
      try {
        await database()
          .ref('/todo/' + title)
          .set({title, desc});
        setTitle(StaticVariables.EMPTY_STRING);
        setDesc(StaticVariables.EMPTY_STRING);
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Validation Error', 'Please provide a title');
    }
  };

  const handleDelete = async (key: string) => {
    try {
      await database()
        .ref('/todo/' + key)
        .remove();
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (book: BookType) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const handleEdit = async () => {
    if (selectedBook?.title) {
      try {
        await database()
          .ref('/todo/' + selectedBook.key)
          .update({title: selectedBook.title, desc: selectedBook.desc});
        setModalVisible(false);
        setSelectedBook(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Validation Error', 'Please provide a title');
    }
  };

  return (
    <View style={screenStyles.canvas}>
      <View style={screenStyles.container}>
        <FlatList
          data={books}
          ListEmptyComponent={
            <Text style={screenStyles.noItemsToDisplay}>
              No Items to Display!!
            </Text>
          }
          ListHeaderComponent={
            <View>
              <Text style={screenStyles.title}>Realtime Database</Text>
              <View style={screenStyles.addContainer}>
                <TextInput
                  value={title}
                  selectionColor={ColorPalette.green}
                  underlineColor={ColorPalette.green}
                  activeUnderlineColor={ColorPalette.green}
                  outlineColor={ColorPalette.green}
                  activeOutlineColor={ColorPalette.green}
                  onChangeText={e => setTitle(e)}
                  mode="outlined"
                  label="Title"
                />
                <TextInput
                  value={desc}
                  selectionColor={ColorPalette.green}
                  underlineColor={ColorPalette.green}
                  activeUnderlineColor={ColorPalette.green}
                  outlineColor={ColorPalette.green}
                  activeOutlineColor={ColorPalette.green}
                  onChangeText={e => setDesc(e)}
                  mode="outlined"
                  label="Description"
                />
                <TouchableOpacity onPress={handleAdd}>
                  <View style={screenStyles.button}>
                    <Text style={screenStyles.buttonText}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={screenStyles.title}>Books:</Text>
            </View>
          }
          renderItem={({item}) => (
            <View style={screenStyles.card}>
              <View>
                <Text>{item.title}</Text>
                <Text>{item.desc}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleDelete(item.key)}>
                  <MaterialIcons
                    name="delete"
                    size={30}
                    color={ColorPalette.red}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openEditModal(item)}>
                  <MaterialIcons
                    name="edit"
                    size={30}
                    color={ColorPalette.yellow}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {selectedBook && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
              setSelectedBook(null);
            }}>
            <View style={screenStyles.modalContainer}>
              <View style={screenStyles.modal}>
                <Text style={screenStyles.modalTitle}>Edit Book</Text>
                <TextInput
                  value={selectedBook.title}
                  selectionColor={ColorPalette.green}
                  underlineColor={ColorPalette.green}
                  activeUnderlineColor={ColorPalette.green}
                  outlineColor={ColorPalette.green}
                  activeOutlineColor={ColorPalette.green}
                  onChangeText={text =>
                    setSelectedBook({...selectedBook, title: text})
                  }
                  mode="outlined"
                  label="Title"
                />
                <TextInput
                  value={selectedBook.desc}
                  selectionColor={ColorPalette.green}
                  underlineColor={ColorPalette.green}
                  activeUnderlineColor={ColorPalette.green}
                  outlineColor={ColorPalette.green}
                  activeOutlineColor={ColorPalette.green}
                  onChangeText={text =>
                    setSelectedBook({...selectedBook, desc: text})
                  }
                  mode="outlined"
                  label="Description"
                />
                <View style={screenStyles.flexRow}>
                  <TouchableOpacity onPress={handleEdit}>
                    <AntDesign
                      size={30}
                      color={ColorPalette.green}
                      name="check"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <AntDesign
                      size={30}
                      color={ColorPalette.red}
                      name="close"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

export default BooksRealtimeDatabase;
