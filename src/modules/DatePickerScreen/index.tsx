import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {TextInput} from 'react-native-paper';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './Style';

const DatePickerScreen: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'date' | 'time' | 'datetime' | undefined>();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <ScrollView style={screenStyles.canvas}>
      <Text style={screenStyles.heading}>Date Picker</Text>
      <View style={screenStyles.textInputAndButtonContainer}>
        <TextInput
          style={screenStyles.textInput}
          disabled
          mode="outlined"
          label={moment(date).format('DD/MM/YY')}
          selectionColor={ColorPalette.green}
          underlineColor={ColorPalette.green}
          activeUnderlineColor={ColorPalette.green}
          outlineColor={ColorPalette.green}
          activeOutlineColor={ColorPalette.green}
        />
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
            setMode('date');
          }}
          style={screenStyles.button}>
          <EvilIcons
            style={screenStyles.calenderIcon}
            name="calendar"
            color={ColorPalette.green}
            size={45}
          />
        </TouchableOpacity>
      </View>
      <View style={screenStyles.textInputAndButtonContainer}>
        <TextInput
          style={screenStyles.textInput}
          disabled
          mode="outlined"
          label={moment(date).format('h:mm:ss a')}
          selectionColor={ColorPalette.green}
          underlineColor={ColorPalette.green}
          activeUnderlineColor={ColorPalette.green}
          outlineColor={ColorPalette.green}
          activeOutlineColor={ColorPalette.green}
        />
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
            setMode('time');
          }}
          style={screenStyles.button}>
          <Feather name="clock" size={30} color={ColorPalette.green} />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal={true}
        open={open}
        date={date}
        mode={mode}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Text style={screenStyles.text}>Date: {date.toString()}</Text>
      <Text style={[screenStyles.heading]}>Formatted Dates:</Text>
      <Text style={screenStyles.text}>
        MM/DD/YY :{moment(date).format('MM/DD/YY')}
      </Text>
      <Text style={screenStyles.text}>
        DD/MM/YY :{moment(date).format('DD/MM/YY')}
      </Text>
      <Text style={screenStyles.text}>
        DD-MM-YY :{moment(date).format('DD-MM-YY')}
      </Text>
      <Text
        style={[screenStyles.text, {fontWeight: 'bold', alignSelf: 'center'}]}>
        {moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')}
      </Text>
    </ScrollView>
  );
};

export default DatePickerScreen;
