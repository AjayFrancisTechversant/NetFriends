import {Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useScreenContext} from '../../Contexts/ScreenContext';
import Card from '../../Components/Card';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './Style';

const Listing = () => {
  const [newEntry, setNewEntry] = useState();
  const [items, setItems] = useState([
    {
      title: 'Red',
      uri: 'https://i.postimg.cc/Y2T7c9nd/red.jpg',
      desc: 'Red Colour',
    },
    {
      title: 'Blue',
      uri: 'https://i.postimg.cc/VkWPbFYh/Blue.png',
      desc: 'Blue Colour',
    },
    {
      title: 'Green',
      uri: 'https://i.postimg.cc/W4pLmJz1/green.png',
      desc: 'Green Colour',
    },
    {
      title: 'Yellow',
      uri: 'https://i.postimg.cc/6QHsM54L/yellow.webp',
      desc: 'Yellow Colour',
    },
  ]);
  const [refresh, setRefresh] = useState(false);

  const handleAdd = () => {
    newEntry && items.push(newEntry);
    setNewEntry(StaticVariables.EMPTY_STRING);
  };
  const handleDelete = i => {
    items.splice(i, 1);
    if (refresh == false) {
      setRefresh(true);
    } else {
      setRefresh(false);
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
      <View style={screenStyles.container}>
        <FlatList
          extraData={refresh}
          ListEmptyComponent={
            <Text style={screenStyles.noItemsToDisplay}>
              No Items to Display!!
            </Text>
          }
          ListHeaderComponent={
            <View>
              <Text style={screenStyles.title}>Listing</Text>
              <View style={screenStyles.addContainer}>
                <TextInput
                  value={newEntry}
                  style={screenStyles.textInput}
                  onChangeText={e => setNewEntry(e)}
                  mode="outlined"
                  label="New Entry"
                  selectionColor={ColorPalette.green}
                  underlineColor={ColorPalette.green}
                  activeUnderlineColor={ColorPalette.green}
                  outlineColor={ColorPalette.green}
                  activeOutlineColor={ColorPalette.green}
                />
                <TouchableOpacity onPress={handleAdd}>
                  <View style={screenStyles.button}>
                    <Text style={screenStyles.buttonText}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={screenStyles.title}>Items:</Text>
            </View>
          }
          data={items}
          renderItem={({index, item}) => (
            <Card index={index} item={item} onPressFn={handleDelete} />
          )}
        />
      </View>
    </View>
  );
};

export default Listing;
