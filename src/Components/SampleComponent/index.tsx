import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackgroundService from 'react-native-background-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sam = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(0);

  useEffect(() => {
    const checkBackgroundService = async () => {
      const isRunning = await BackgroundService.isRunning();
      if (isRunning) {
        resumeTimer();
      }
    };
    checkBackgroundService();
  }, []);

  const sleep = (time: number) =>
    new Promise<void>(resolve => setTimeout(() => resolve(), time));

  const veryIntensiveTask = async (taskDataArguments: any) => {
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 120; i >= 0; i--) {
        setTimeLeft(prev => (prev !== null ? i : 0));
        saveToAsyncStorage(i);
        await BackgroundService.updateNotification({taskDesc: `${i}`});
        await sleep(delay);
      }
      await BackgroundService.stop();
      await sleep(delay);
    });
  };

  const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'myapp://loadersscreen', // See Deep Linking for more info
    parameters: {
      delay: 1000,
    },
  };
  // const resumeForegroundTimer = async () => {
  //  setInterval(()=>{
  //   setTimeLeft(prev=>prev-1)
  //  }
  //   ,1000)
  // };

  const handlePress = async () => {
    await BackgroundService.stop();
    await BackgroundService.start(veryIntensiveTask, options);
  };

  const resumeTimer = async () => {
    // console.log('Resuming date', Date.now().toString());

    setInterval(async()=>{
      await loadFromAsyncStorage();
    },100)

    // resumeForegroundTimer();
  };

  const saveToAsyncStorage = async (timeLeft: number) => {
    try {
      await AsyncStorage.setItem('RunTimeBeforeKilling', timeLeft.toString());
    } catch (error) {
      console.error('Error saving data into Async:', error);
    }
  };

  const loadFromAsyncStorage = async () => {
    try {
      const stringValue = await AsyncStorage.getItem('RunTimeBeforeKilling');
      if (stringValue !== null) {
        const remainingTime = parseInt(stringValue, 10);
        setTimeLeft(remainingTime);
      }
    } catch (error) {
      console.error('Error loading data from Async:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{margin: 20, backgroundColor: 'yellow'}}
        onPress={handlePress}>
        <Text>Start Background action</Text>
      </TouchableOpacity>
      <Text>{timeLeft !== null ? timeLeft : 'Loading...'}</Text>
    </View>
  );
};

export default Sam;
