import React from 'react';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type MenuDrawerButtonPropsType = {
  // navigation: any;
  color: string;
};

const MenuDrawerButton: React.FC<MenuDrawerButtonPropsType> = ({
  navigation,
  color,
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Feather name="menu" size={30} color={color} />
    </TouchableOpacity>
  );
};

export default MenuDrawerButton;
