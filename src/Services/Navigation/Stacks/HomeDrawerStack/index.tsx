import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import OfflineDBFetch from '../../../../modules/OfflineDBFetch';
import BooksFirestore from '../../../../modules/BooksFirestore';
import BooksRealtimeDatabase from '../../../../modules/BooksRealtimeDatabase';
import Notes from '../../../../modules/Notes';
import ImageUploader from '../../../../modules/ImageUploader';
import RNElements from '../../../../modules/RNElements';
import Locator from '../../../../modules/Locator';
import DatePicker from '../../../../modules/DatePickerScreen';
import Calender from '../../../../modules/Calender';
import i18njs from '../../../../modules/I18njs';
import RNPaper from '../../../../modules/RNPaper';
import HomeScreen from '../../../../modules/HomeScreen';
import ColorPalette from '../../../../Assets/Themes/ColorPalette';
import DrawerContents from '../../../../Components/DrawerContents';
import ReanimatedCarousel from '../../../../modules/ReanimatedCarousel';
import SkiaDrag from '../../../../modules/SkiaDrag';
import Skia from '../../../../modules/SkiaScreen';
import Spotify from '../../../../modules/Spotify';
import GiftedCharts from '../../../../modules/GiftedCharts';
import Echarts from '../../../../modules/ECharts';
import WebViewScreen from '../../../../modules/WebViewScreen';
import PDFReader from '../../../../modules/PDFReader';
import VideoPlayerScreen from '../../../../modules/VideoPlayerScreen';
import ClipBoard from '../../../../modules/ClipBoard';
import CommentsScreen from '../../../../modules/CommentsScreen';
import Crashlytics from '../../../../modules/Crashlytics';
import LineSlider from '../../../../Components/LineSlider';
import LoadersScreen from '../../../../modules/LoadersScreen';
import Form1Screen from '../../../../modules/Form1Screen';
import ElementDropdown from '../../../../modules/ElementDropdown';
import RNLocalize from '../../../../modules/RNLocalize';
import RNAnimatable from '../../../../modules/RNAnimatable';

const Drawer = createDrawerNavigator();

const HomeDrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
        drawerActiveTintColor: ColorPalette.green,
      }}
      drawerContent={props => <DrawerContents {...props} />}>
      <Drawer.Screen
        options={{title:"Home Screen",
          drawerIcon: () => (
            <Entypo name="home" color={ColorPalette.green} size={20} />
          ),
        }}
        name="homeScreen"
        component={HomeScreen}
      />
      <Drawer.Screen
        options={{title:"Form 1",
          drawerIcon: () => (
            <AntDesign name="form" color={ColorPalette.green} size={20} />
          ),
        }}
        name="form1"
        component={Form1Screen}
      />
      <Drawer.Screen
        options={{title:"Video Player",
          drawerIcon: () => (
            <Entypo name="video" color={ColorPalette.green} size={20} />
          ),
        }}
        name="videoPlayer"
        component={VideoPlayerScreen}
      />
      <Drawer.Screen
        options={{title:"Comments",
          drawerIcon: () => (
            <FontAwesome name="comment" color={ColorPalette.green} size={20} />
          ),
        }}
        name="comments"
        component={CommentsScreen}
      />
      <Drawer.Screen
        options={{title:"Spotify",
          drawerIcon: () => (
            <Entypo name="spotify" color={ColorPalette.green} size={20} />
          ),
        }}
        name="spotify"
        component={Spotify}
      />
      <Drawer.Screen
        options={{title:"RN Paper",
          drawerIcon: () => (
            <Ionicons name="newspaper" color={ColorPalette.green} size={20} />
          ),
        }}
        name="RNPaper"
        component={RNPaper}
      />
      <Drawer.Screen
        options={{title:"RN Localize",
          drawerIcon: () => (
            <FontAwesome name="globe" color={ColorPalette.green} size={20} />
          ),
        }}
        name="RNLocalize"
        component={RNLocalize}
      />
      <Drawer.Screen
        options={{title:"RN Animatable",
          drawerIcon: () => (
            <MaterialIcons name="animation" color={ColorPalette.green} size={20} />
          ),
        }}
        name="RNAnimatable"
        component={RNAnimatable}
      />
      <Drawer.Screen
        options={{title:"Country/States API",
          drawerIcon: () => (
            <MaterialCommunityIcons name="form-dropdown" color={ColorPalette.green} size={20} />
          ),
        }}
        name="elementDropdown"
        component={ElementDropdown}
      />
      <Drawer.Screen
        options={{title:"ClipBoard",
          drawerIcon: () => (
            <Entypo name="clipboard" color={ColorPalette.green} size={20} />
          ),
        }}
        name="clipBoard"
        component={ClipBoard}
      />
       <Drawer.Screen
        options={{title:"Custom Line Slider",
          drawerIcon: () => (
            <FontAwesome6 name="sliders" color={ColorPalette.green} size={20} />
          ),
        }}
        name="customLineSlider"
        component={LineSlider}
      />
         <Drawer.Screen
        options={{title:"Custom Loaders",
          drawerIcon: () => (
            <AntDesign name="loading1" color={ColorPalette.green} size={20} />
          ),
        }}
        name="loadersScreen"
        component={LoadersScreen}
      />
      <Drawer.Screen
        options={{title:"Date Picker",
          drawerIcon: () => (
            <EvilIcons name="calendar" color={ColorPalette.green} size={20} />
          ),
        }}
        name="datePicker"
        component={DatePicker}
      />
      <Drawer.Screen
        options={{title:"Calender",
          drawerIcon: () => (
            <EvilIcons name="calendar" color={ColorPalette.green} size={20} />
          ),
        }}
        name="calender"
        component={Calender}
      />
      <Drawer.Screen
        options={{title:"i18njs",
          drawerIcon: () => (
            <Ionicons name="language" color={ColorPalette.green} size={20} />
          ),
        }}
        name="i18njs"
        component={i18njs}
      />
      <Drawer.Screen
        options={{title:"Skia",
          drawerIcon: () => (
            <Ionicons name="logo-react" color={ColorPalette.green} size={20} />
          ),
        }}
        name="skia"
        component={Skia}
      />
      <Drawer.Screen
        options={{title:"Skia Drag",
          drawerIcon: () => (
            <Ionicons name="logo-react" color={ColorPalette.green} size={20} />
          ),
        }}
        name="skiaDrag"
        component={SkiaDrag}
      />
      <Drawer.Screen
        options={{title:"Notes (Watermelon DB)",
          drawerIcon: () => (
            <FontAwesome6
              name="note-sticky"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="notes"
        component={Notes}
      />
      <Drawer.Screen
        options={{title:"Offline DB Fetch",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="fruit-watermelon"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="offlineDBFetch"
        component={OfflineDBFetch}
      />
      <Drawer.Screen
        options={{title:"WebView",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="web"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="webView"
        component={WebViewScreen}
      />
      <Drawer.Screen
        options={{title:"PDF Reader",
          drawerIcon: () => (
            <FontAwesome6
              name="file-pdf"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="PDFReader"
        component={PDFReader}
      />
      <Drawer.Screen
        options={{title:"E Charts",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="chart-arc"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="ECharts"
        component={Echarts}
      />
      <Drawer.Screen
        options={{title:"Gifted Charts",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="chart-arc"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="giftedCharts"
        component={GiftedCharts}
        
      />
      <Drawer.Screen
        options={{title:"Books FireStore",
          drawerIcon: () => (
            <Ionicons
              name="logo-firebase"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="booksFirestore"
        component={BooksFirestore}
      />
      <Drawer.Screen
        options={{title:"Books Realtime DB",
          drawerIcon: () => (
            <Ionicons
              name="logo-firebase"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="booksRealtimeDatabase"
        component={BooksRealtimeDatabase}
      />
      <Drawer.Screen
        options={{title:"Image Uploader",
          drawerIcon: () => (
            <AntDesign
              name="cloudupload"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="imageUploader"
        component={ImageUploader}
      />
      <Drawer.Screen
        options={{title:"RN Elements",
          drawerIcon: () => (
            <Ionicons name="logo-react" color={ColorPalette.green} size={20} />
          ),
        }}
        name="RNElements"
        component={RNElements}
      />
      <Drawer.Screen
        options={{title:"Locator",
          drawerIcon: () => (
            <Entypo name="location-pin" color={ColorPalette.green} size={20} />
          ),
        }}
        name="locator"
        component={Locator}
      />
      <Drawer.Screen
        options={{title:"Crash(lytics)",
          drawerIcon: () => (
            <FontAwesome6
              name="explosion"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="crashlytics"
        component={Crashlytics}
      />

      <Drawer.Screen
        options={{title:"Reanimated Carousel",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="view-carousel"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="reanimatedCarousel"
        component={ReanimatedCarousel}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawerStack;
