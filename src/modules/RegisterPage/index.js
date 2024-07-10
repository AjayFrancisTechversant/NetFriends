import {View, Text, Alert, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './Style';

const RegisterPage = ({navigation}) => {
  const [userData, setUserData] = useState({email: StaticVariables.EMPTY_STRING, password: StaticVariables.EMPTY_STRING});

  const handleRegister = async () => {
    if (!userData.email || !userData.password) {
      Alert.alert('Please fill the form completeley!!!');
    } else {
      auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }
          if (error.code === 'auth/weak-password') {
            Alert.alert('Password is weak');
          }
          console.error(error);
        });
    }
  };
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  return (
    <KeyboardAwareScrollView extraHeight={250} style={screenStyles.canvas}>
      <View style={screenStyles.container}>
        <Text style={screenStyles.heading}>Register</Text>
        <TextInput
          style={screenStyles.textInput}
          onChangeText={e => setUserData({...userData, email: e})}
          mode="outlined"
          label="Email"
          selectionColor={ColorPalette.green}
          underlineColor={ColorPalette.green}
          activeUnderlineColor={ColorPalette.green}
          outlineColor={ColorPalette.green}
          activeOutlineColor={ColorPalette.green}
        />
        <TextInput
          style={screenStyles.textInput}
          secureTextEntry
          onChangeText={e => setUserData({...userData, password: e})}
          mode="outlined"
          label="Password"
          selectionColor={ColorPalette.green}
          underlineColor={ColorPalette.green}
          activeUnderlineColor={ColorPalette.green}
          outlineColor={ColorPalette.green}
          activeOutlineColor={ColorPalette.green}
        />
        <TouchableOpacity onPress={handleRegister}>
          <View style={screenStyles.button}>
            <Text style={screenStyles.buttonText}>Register</Text>
          </View>
        </TouchableOpacity>
        <View style={screenStyles.lastViewContainer}>
          <Text>Already Registered? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <Text style={screenStyles.greenUnderlinetext}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterPage;
