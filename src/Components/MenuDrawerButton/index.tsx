import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type MenuDrawerButtonPropsType = {
  color: string;
};

const MenuDrawerButton: React.FC<MenuDrawerButtonPropsType> = ({color}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Feather name="menu" size={30} color={color} />
    </TouchableOpacity>
  );
};

export default MenuDrawerButton;
