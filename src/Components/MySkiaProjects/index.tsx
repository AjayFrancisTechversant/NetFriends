import {View, Text, FlatList, Image, ActivityIndicator} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import MySkiaProjectsCard from '../MySkiaProjectsCard';
import StaticVariables from '../../Preferences/StaticVariables';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {SetStateType} from '../../Types/Types';
import styles from './style';

type MySkiaProjectsPropsType = {
  setIsMyProjectsOpen: SetStateType<boolean>;
};
const MySkiaProjects: React.FC<MySkiaProjectsPropsType> = ({
  setIsMyProjectsOpen,
}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  const [imageUrls, setImageUrls] = useState<string[]>(
    StaticVariables.EMPTY_ARRAY as string[],
  );
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    try {
      const listResult = await storage().ref('images/').listAll();
      const urls = await Promise.all(
        listResult.items.map(itemRef => itemRef.getDownloadURL()),
      );
      setImageUrls(urls);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const renderItem = useCallback(
    ({item}: {item: string}) => {
      return <MySkiaProjectsCard item={item} />;
    },
    [screenStyles],
  );
  const numberOfColumns = screenContext.isPortrait ? 2 : 4;

  return (
    <View style={screenStyles.canvas}>
      <TouchableOpacity
        onPress={() => setIsMyProjectsOpen(false)}
        style={screenStyles.goBackButton}>
        <AntDesign name="left" size={30} color={ColorPalette.black} />
      </TouchableOpacity>
      <Text style={screenStyles.heading}>My Projects</Text>
      {loading ? (
        <ActivityIndicator size="large" color={ColorPalette.green} />
      ) : (
        <FlatList
          data={imageUrls}
          renderItem={renderItem}
          numColumns={numberOfColumns}
          key={screenContext.isPortrait ? 'portrait' : 'landscape'}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default MySkiaProjects;
