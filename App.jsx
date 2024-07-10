import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {PaperProvider} from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import AuthNativeStack from './src/Services/Navigation/Stacks/AuthNativeStack';
import {persistor, store} from './src/Redux/Store/Store';
import HomeTabStack from './src/Services/Navigation/Stacks/HomeTabStack';
import {ScreenContextProvider} from './src/Contexts/ScreenContext';
import CommentsScreen from './src/modules/CommentsScreen';


PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const Stack = createNativeStackNavigator();

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const linking = {
    prefixes: ['myapp://'],
    config: {
      screens: {
        HomeTabStack: {
          screens: {
            Me: {
              path: 'Me',
            },
            Listing: {
              path: 'Listing',
            },
          },
        },
      },
    },
  };

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const handleGetFCMToken = async () => {
    const FCMToken = await messaging().getToken();
    console.log('FCMToken:', FCMToken);
  };

  useEffect(() => {
    // handleGetFCMToken()
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer linking={linking}>
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="AuthNativeStack"
            component={AuthNativeStack}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="HomeTabStack"
            component={HomeTabStack}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default function Main() {
  return (
    <ScreenContextProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView>
            <PaperProvider>
              <App />
            </PaperProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </ScreenContextProvider>
  );
}

const styles = StyleSheet.create({});
