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
        name="homeDrawerStack"
        component={HomeDrawerStack}
        options={{title:'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" color={color} size={size} />
          ),
        }}
      />
      <HomeTabStack.Screen
        name="gallery"
        component={Gallery}
        options={{title:'Gallery',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="images" color={color} size={size} />
          ),
        }}
      />
      <HomeTabStack.Screen
        name="parallaxCarousel"
        component={ParallaxCarousel}
        options={{title:'Parallax',
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
        name="booking"
        component={Booking}
        options={{title:'Booking',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome6 name="book-bookmark" color={color} size={size} />
          ),
        }}
      />
      <HomeTabStack.Screen
        name="me"
        component={Me}
        options={{title:'Me',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </HomeTabStack.Navigator>
  );
};

export default HomeTabStack;
