import React, {useEffect, useState} from 'react';
import {StyleSheet, PermissionsAndroid} from 'react-native';
import {NavigationContainer, LinkingOptions} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {PaperProvider} from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import AuthNativeStack from './src/Services/Navigation/Stacks/AuthNativeStack';
import {persistor, store} from './src/Redux/Store/Store';
import HomeTabStack from './src/Services/Navigation/Stacks/HomeTabStack';
import {ScreenContextProvider} from './src/Contexts/ScreenContext';
import Sam from './src/Components/SampleComponent'

// Request permissions for notifications
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

type RootStackParamList = {
  AuthNativeStack: undefined;
  HomeTabStack: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['myapp://', 'https://myapp.com'],
    config: {
      screens: {
        AuthNativeStack: {
          screens: {
            login: 'login',
            register: 'register',
          },
        },
        HomeTabStack: {
          screens: {
            homeDrawerStack: {
              screens: {
                homeScreen: 'home',
                videoPlayer: 'videoplayer',
                comments: 'comments',
                spotify: 'spotify',
                RNPaper: 'rnpaper', 
                clipBoard: 'clipboard',
                customLineSlider: 'lineslider',
                loadersScreen: 'loadersscreen',
                datePicker: 'datepicker',
                calender: 'calender',
                i18njs: 'i18njs',
                skia: 'skia',
                skiaDrag: 'skiadrag',
                notes: 'notes',
                offlineDBFetch: 'offlinedbfetch',
                webView: 'webview',
                PDFReader: 'pdfreader',
                ECharts: 'echarts',
                giftedCharts: 'giftedcharts',//
                booksFirestore: 'booksfirestore',
                booksRealtimeDatabase: 'booksrealtimedatabase',
                imageUploader: 'imageuploader',//
                RNElements: 'rnelements',//
                locator: 'locator',
                crashlytics: 'crashlytics',
                reanimatedCarousel: 'reanimatedcarousel',
              },
            },
            gallery: 'gallery',
            parallaxCarousel: 'parallaxcarousel',
            booking: 'booking',
            me: 'me',
          },
        },
      },
    },
  };

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const handleGetFCMToken = async () => {
    try {
      const FCMToken = await messaging().getToken();
      console.log('FCMToken:', FCMToken);
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  useEffect(() => {
    // handleGetFCMToken();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // Unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer linking={linking}>
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="AuthNativeStack"
            component={AuthNativeStack}
            options={{headerShown: false} as NativeStackNavigationOptions}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="HomeTabStack"
            component={HomeTabStack}
            options={{headerShown: false} as NativeStackNavigationOptions}
          />
        </Stack.Navigator>
      )}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

const Main: React.FC = () => {
  return (
    <ScreenContextProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{flex: 1}}>
            <PaperProvider>
              {/* <Sam /> */}
              <App/>
              {/* <LoadersScreen/> */}
            </PaperProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </ScreenContextProvider>
  );
};

export default Main;

const styles = StyleSheet.create({
  // Add styles if needed
});
