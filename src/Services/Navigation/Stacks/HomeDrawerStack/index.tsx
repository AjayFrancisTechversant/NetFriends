import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
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

const HomeDrawerStack = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
        drawerActiveTintColor: ColorPalette.green,
      }}
      drawerContent={props => <DrawerContents {...props} />}>
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Entypo name="home" color={ColorPalette.green} size={20} />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Entypo name="video" color={ColorPalette.green} size={20} />
          ),
        }}
        name="Video Player"
        component={VideoPlayerScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <FontAwesome name="comment" color={ColorPalette.green} size={20} />
          ),
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Entypo name="spotify" color={ColorPalette.green} size={20} />
          ),
        }}
        name="Spotify"
        component={Spotify}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Ionicons name="newspaper" color={ColorPalette.green} size={20} />
          ),
        }}
        name="RN Paper"
        component={RNPaper}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Entypo name="clipboard" color={ColorPalette.green} size={20} />
          ),
        }}
        name="ClipBoard"
        component={ClipBoard}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <EvilIcons name="calendar" color={ColorPalette.green} size={20} />
          ),
        }}
        name="DatePicker"
        component={DatePicker}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <EvilIcons name="calendar" color={ColorPalette.green} size={20} />
          ),
        }}
        name="Calender"
        component={Calender}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Ionicons name="language" color={ColorPalette.green} size={20} />
          ),
        }}
        name="i18n-js"
        component={i18njs}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Ionicons name="logo-react" color={ColorPalette.green} size={20} />
          ),
        }}
        name="Skia"
        component={Skia}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Ionicons name="logo-react" color={ColorPalette.green} size={20} />
          ),
        }}
        name="SkiaDrag"
        component={SkiaDrag}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <FontAwesome6
              name="note-sticky"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="Notes (Watermelon DB)"
        component={Notes}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="fruit-watermelon"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="OfflineDBFetch"
        component={OfflineDBFetch}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="web"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="WebView"
        component={WebViewScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <FontAwesome6
              name="file-pdf"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="PDF Reader"
        component={PDFReader}
      />
      <Drawer.Screen
        options={{
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
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="chart-arc"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="Gifted-Charts"
        component={GiftedCharts}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Ionicons
              name="logo-firebase"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="BooksFirestore"
        component={BooksFirestore}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Ionicons
              name="logo-firebase"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="BooksRealtimeDatabase"
        component={BooksRealtimeDatabase}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <AntDesign
              name="cloudupload"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="Image Upload"
        component={ImageUploader}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Ionicons name="logo-react" color={ColorPalette.green} size={20} />
          ),
        }}
        name="RN Elements"
        component={RNElements}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Entypo name="location-pin" color={ColorPalette.green} size={20} />
          ),
        }}
        name="Locator"
        component={Locator}
      />

      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="view-carousel"
              color={ColorPalette.green}
              size={20}
            />
          ),
        }}
        name="ReanimatedCarousel"
        component={ReanimatedCarousel}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawerStack;
