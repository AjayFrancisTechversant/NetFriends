import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeDrawerStack from '../HomeDrawerStack';
import Booking from '../../../../modules/Booking';
import Gallery from '../../../../modules/Gallery';
import Me from '../../../../modules/Me';
import ParallaxCarousel from '../../../../modules/ParallaxCarousel';
import ColorPalette from '../../../../Assets/Themes/ColorPalette';

const HomeTabStack = () => {
  const HomeTabStack = createBottomTabNavigator();
  return (
    <HomeTabStack.Navigator
      screenOptions={{tabBarActiveTintColor: ColorPalette.green}}>
      <HomeTabStack.Screen
        name="Home"
        component={HomeDrawerStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" color={color} size={size} />
          ),
        }}
      />
      <HomeTabStack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="images" color={color} size={size} />
          ),
        }}
      />
          <HomeTabStack.Screen
        name="Parallax"
        component={ParallaxCarousel}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
            name="view-carousel"
            color={color}
            size={size}
          />
          ),
        }}
      />
      <HomeTabStack.Screen
        name="Booking"
        component={Booking}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome6 name="book-bookmark" color={color} size={size} />
          ),
        }}
      />
      <HomeTabStack.Screen
        name="Me"
        component={Me}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </HomeTabStack.Navigator>
  );
};

export default HomeTabStack;
