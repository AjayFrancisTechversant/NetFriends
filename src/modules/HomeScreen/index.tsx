import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Text,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FAB} from 'react-native-paper';
import {fetchUsers} from '../../Redux/Slices/UsersSlice';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import SearchBar from '../../Components/SearchBar';
import HomeScreenCard from '../../Components/HomeScreenCard';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import StaticVariables from '../../Preferences/StaticVariables';
import NetFriends_logo_with_sidelabel from '../../Assets/Images/Logo/NetFriends_logo_with_sidelabel.png';
import {NativeEventType, UserType} from '../../Types/Types';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import styles from './style';

const HomeScreen: React.FC = () => {
  const [searchText, setSearchText] = useState(StaticVariables.EMPTY_STRING);
  const [searchResults, setSearchResults] = useState(
    StaticVariables.EMPTY_ARRAY,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const flatListRef = useRef<FlatList | null>(null);
  const [isFabVisible, setIsFabVisible] = useState(false);
  const dispatch = useAppDispatch();
  const {users, loading, error} = useAppSelector(state => state.Users);

  const search = useCallback(
    (text: string) => {
      setSearchResults(
        users.filter(i =>
          (i.name.first + ' ' + i.name.last)
            .toLowerCase()
            .includes(text.toLowerCase()),
        ),
      );
    },
    [users],
  );

  useEffect(() => {
    search(searchText);
  }, [searchText]);
  useEffect(() => {
    fetchInitialUsers();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Error Ocurred while Fetching');
    }
  }, [error, dispatch]);

  const fetchInitialUsers = useCallback(async () => {
    try {
      await dispatch(fetchUsers(currentPage));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [dispatch, currentPage]);

  const fetchMore = useCallback(async () => {
    if (loading) return; // Prevent fetching while already loading
    try {
      await dispatch(fetchUsers(currentPage + 1));
      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [dispatch, currentPage, loading]);

  const scrollToTop = () => {
    flatListRef.current?.scrollToIndex({animated: true, index: 0});
  };

  const onScroll = ({nativeEvent}: NativeEventType) => {
    const currentScrollPosition =
      nativeEvent.contentOffset?.y !== undefined
        ? Math.floor(nativeEvent.contentOffset.y)
        : 0;
    setIsFabVisible(currentScrollPosition > 50);
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  const renderItem = useCallback(
    ({item}: {item: UserType}) => {
      return (
        <View style={screenStyles.homeScreenCardContainer}>
          <HomeScreenCard item={item} />
        </View>
      );
    },
    [screenStyles],
  );

  const ListEmptyComponent = useCallback(
    () => <Text>Nothing to Display!!</Text>,
    [],
  );

  return (
    <View style={screenStyles.canvas}>
      <View style={screenStyles.container}>
        <FlatList
          onScroll={onScroll}
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => !loading && ListEmptyComponent()}
          ListHeaderComponent={
            <>
              <LinearGradient
                start={{x: 0, y: 0.4}}
                end={{x: 0, y: 1}}
                colors={[ColorPalette.green, ColorPalette.white]}
                style={screenStyles.headerContainer}>
                <View style={screenStyles.headerContents}>
                  <View style={screenStyles.menuDrawerButtonContainer}>
                    <MenuDrawerButton color={ColorPalette.white} />
                  </View>
                  <View style={screenStyles.logoContainer}>
                    <TouchableOpacity>
                      <Image
                        style={screenStyles.logo}
                        source={NetFriends_logo_with_sidelabel}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
              <View style={screenStyles.searchBarContainer}>
                <SearchBar
                  searchText={searchText}
                  setSearchText={setSearchText}
                />
              </View>
            </>
          }
          data={
            searchText === StaticVariables.EMPTY_STRING ? users : searchResults
          }
          keyExtractor={item => Math.random().toString(36).substring(2)}
          renderItem={renderItem}
          onEndReached={() => !searchText && fetchMore()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            loading && <ActivityIndicator size="large" />
          }
        />
      </View>
      <FAB
        visible={isFabVisible}
        icon="arrow-up-bold"
        style={screenStyles.fab}
        onPress={() => scrollToTop()}
        theme={{
          colors: {
            primaryContainer: ColorPalette.green,
            onPrimaryContainer: ColorPalette.white,
          },
        }}
      />
    </View>
  );
};

export default React.memo(HomeScreen);
