import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './Style';

type CardPropsType = {
  item: any;
  handleDeleteNote: (id: any) => Promise<void>;
  handleEditButton: (id: any) => Promise<void>;
  isDeleteLoading: boolean;
};

const Card:React.FC<CardPropsType> = React.memo(
  ({item, handleDeleteNote, handleEditButton, isDeleteLoading}) => {
    const screenContext = useScreenContext();
    const screenStyles = styles(
      screenContext,
      screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
      screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
    );

    return (
      <View style={screenStyles.card}>
        <View>
          <Text style={screenStyles.title}>{item.title}</Text>
          <Text>{item.desc}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={screenStyles.button}
            onPress={() => handleDeleteNote(item.id)}>
            {isDeleteLoading ? (
              <ActivityIndicator />
            ) : (
              <MaterialIcons name="delete" size={30} color={ColorPalette.red} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={screenStyles.button}>
            <MaterialIcons
              name="edit"
              size={30}
              color={ColorPalette.yellow}
              onPress={() => handleEditButton(item.id)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

export default Card;
