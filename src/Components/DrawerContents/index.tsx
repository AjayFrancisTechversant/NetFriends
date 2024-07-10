import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './Style';

const DrawerContents:React.FC<DrawerContentComponentProps> = props => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const handleLogout = async () => {
    GoogleSignin.signOut();
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        style={screenStyles.drawerItemStyle}
        label="Logout"
        onPress={handleLogout}
        icon={() => (
          <MaterialIcons size={20} color={ColorPalette.green} name="logout" />
        )}
      />
    </>
  );
};

export default DrawerContents;
