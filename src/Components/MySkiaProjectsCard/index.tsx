import {View, Image, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';

type MySkiaProjectsCardPropsType = {
  item: string;
};

const MySkiaProjectsCard: React.FC<MySkiaProjectsCardPropsType> = ({item}) => {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.card}>
      <TouchableOpacity onPress={() => setIsImageModalVisible(true)}>
        <Image
          source={{
            uri: item,
          }}
          style={screenStyles.imageThumbnail}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Modal
        onRequestClose={() => setIsImageModalVisible(false)}
        visible={isImageModalVisible}
        animationType="fade">
        <TouchableOpacity
          onPress={() => setIsImageModalVisible(false)}
          style={screenStyles.goBackButton}>
          <AntDesign name="left" size={30} color={ColorPalette.black} />
        </TouchableOpacity>
        <Image
          source={{uri: item}}
          style={screenStyles.fullScreenImage}
          resizeMode="contain"
        />
      </Modal>
    </View>
  );
};
export default React.memo(MySkiaProjectsCard);
