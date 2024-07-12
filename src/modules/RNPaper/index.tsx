import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  SegmentedButtons,
  Card,
  Button,
  Menu,
  Divider,
  Switch,
  Snackbar,
  Tooltip,
  Dialog,
  Portal,
  ProgressBar,
  FAB,
  AnimatedFAB,
  DataTable,
  TextInput,
} from 'react-native-paper';
import {ToggleButton} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {NativeEventType} from '../../Types/Types';
import styles from './style';

const RNPaper: React.FC = () => {
  const [segmentedButtonValue, setSegmentedButtonValue] = useState('Walk'); //segmentedButton
  const [toggleButtonValue, setToggleButtonValue] = useState('left');
  //toggleButtons
  //for menu
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  //for switch
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    setSnackBarVisible(true);
  };
  //for snackbar
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const onDismissSnackBar = () => setSnackBarVisible(false);
  //for dialog
  const [dialogVisible, setDialogVisible] = useState(false);
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);
  //for FAB group
  const [state, setState] = useState({open: false});
  const onStateChange = (state: {open: boolean}) => setState(state);
  const {open} = state;
  //for animatedFab
  const [isExtended, setIsExtended] = useState(true);
  const onScroll = ({nativeEvent}: NativeEventType) => {
    const currentScrollPosition =
      nativeEvent.contentOffset?.y !== undefined
        ? Math.floor(nativeEvent.contentOffset.y)
        : 0;
    setIsExtended(currentScrollPosition <= 0);
  };
  //for Data Table
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const [items] = useState([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.canvas}>
      <KeyboardAvoidingView
        enabled={true}
        behavior="height"
        keyboardVerticalOffset={50}>
        <ScrollView onScroll={onScroll}>
          <View>
            <SegmentedButtons
              style={screenStyles.SegmentedButtons}
              value={segmentedButtonValue}
              onValueChange={setSegmentedButtonValue}
              buttons={[
                {
                  value: 'Walk',
                  label: 'Walking',
                },
                {
                  value: 'Train',
                  label: 'train',
                },
                {
                  value: 'Drive',
                  label: 'Driving',
                },
              ]}
              density="regular"
              theme={{colors: {secondaryContainer: ColorPalette.green}}}
            />
            <Card style={screenStyles.card}>
              <Card.Cover
                source={{
                  uri:
                    segmentedButtonValue == 'Walk'
                      ? 'https://images.pexels.com/photos/744912/pexels-photo-744912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                      : segmentedButtonValue == 'Train'
                      ? 'https://images.pexels.com/photos/2790396/pexels-photo-2790396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                      : segmentedButtonValue == 'Drive'
                      ? 'https://images.pexels.com/photos/799463/pexels-photo-799463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                      : undefined,
                }}
                style={screenStyles.cardImageStyle}
              />
              <Card.Title title={segmentedButtonValue} />
              <Card.Content>
                <Text>Card content</Text>
              </Card.Content>
              <Card.Actions>
                <Menu
                  visible={menuVisible}
                  onDismiss={closeMenu}
                  anchor={
                    <Button
                      style={screenStyles.showMenuButton}
                      onPress={openMenu}>
                      Menu <AntDesign name="caretdown" size={10} />
                    </Button>
                  }
                  anchorPosition="bottom">
                  <Menu.Item onPress={() => {}} title="Item 1" />
                  <Menu.Item onPress={() => {}} title="Item 2" />
                  <Divider horizontalInset={true} bold />
                  <Menu.Item onPress={() => {}} title="Item 3" />
                </Menu>
                <Tooltip title="Okay">
                  <Button mode="elevated">Ok</Button>
                </Tooltip>
              </Card.Actions>
            </Card>
          </View>
          <View style={screenStyles.toggleButttonsContainer}>
            <ToggleButton.Row
              onValueChange={value => setToggleButtonValue(value)}
              value={toggleButtonValue}>
              <ToggleButton icon="format-align-left" value="1" />
              <ToggleButton icon="format-align-right" value="2" />
              <ToggleButton icon="format-bold" value="3" />
            </ToggleButton.Row>
          </View>
          <View style={screenStyles.switchContainer}>
            <Text>Switch</Text>
            <Switch
              color={ColorPalette.green}
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                showDialog();
              }}
              style={screenStyles.downloadDataButton}>
              <Text style={screenStyles.downloadDataText}>Download data</Text>
            </TouchableOpacity>
            <Portal>
              <Dialog
                style={screenStyles.dialog}
                visible={dialogVisible}
                onDismiss={hideDialog}
                dismissable={false}>
                <Dialog.Icon icon="alert" size={50} />
                <Dialog.Title style={screenStyles.dialogTitle}>
                  Downloading
                </Dialog.Title>
                <ProgressBar
                  indeterminate
                  style={screenStyles.progressBar}
                  color={ColorPalette.green}
                />
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Cancel</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>

          <DataTable style={screenStyles.DataTable}>
            <DataTable.Header>
              <DataTable.Title>Dessert</DataTable.Title>
              <DataTable.Title numeric>Calories</DataTable.Title>
              <DataTable.Title numeric>Fat</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map(item => (
              <DataTable.Row key={item.key}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
              </DataTable.Row>
            ))}
            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={page => setPage(page)}
              label={`${from + 1}-${to} of ${items.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              dropdownItemRippleColor={ColorPalette.green}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={'Rows per page'}
            />
          </DataTable>
          <Text style={screenStyles.loremText}>
            Mauris mattis ante in sapien tristique, in iaculis leo euismod.
            Donec eu sem odio. Etiam cursus hendrerit risus vitae consequat.
            Duis et odio ultrices, aliquam magna a, pellentesque ex. Aliquam
            felis velit, aliquam et ante eu, condimentum commodo ex. Aliquam
            lorem nisi, ullamcorper sit amet diam tincidunt, pretium auctor
            orci. Aenean iaculis vel libero nec semper. Aenean lorem ante,
            cursus eu mattis eget, accumsan sed sapien. Morbi sollicitudin
            pretium ligula, a dignissim diam facilisis id. Cras et tempor lorem.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Vivamus porttitor ut orci id ullamcorper.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum laoreet varius nibh quis
            suscipit. Aliquam rutrum sapien id ante sodales, nec semper erat
            egestas. Maecenas ullamcorper varius dolor tempor pellentesque.
          </Text>

          <TextInput
            style={screenStyles.textInput}
            onChangeText={() => {}}
            mode="outlined"
            label="Name"
            selectionColor={ColorPalette.green}
            underlineColor={ColorPalette.green}
            activeUnderlineColor={ColorPalette.green}
            outlineColor={ColorPalette.green}
            activeOutlineColor={ColorPalette.green}
          />
          <Text style={screenStyles.loremText}>
            Mauris mattis ante in sapien tristique, in iaculis leo euismod.
            Donec eu sem odio. Etiam cursus hendrerit risus vitae consequat.
            Duis et odio ultrices, aliquam magna a, pellentesque ex. Aliquam
            felis velit, aliquam et ante eu, condimentum commodo ex. Aliquam
            lorem nisi, ullamcorper sit amet diam tincidunt, pretium auctor
            orci. Aenean iaculis vel libero nec semper. Aenean lorem ante,
            cursus eu mattis eget, accumsan sed sapien. Morbi sollicitudin
            pretium ligula, a dignissim diam facilisis id. Cras et tempor lorem.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Vivamus porttitor ut orci id ullamcorper.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum laoreet varius nibh quis
            suscipit. Aliquam rutrum sapien id ante sodales, nec semper erat
            egestas. Maecenas ullamcorper varius dolor tempor
            pellentesque.Mauris mattis ante in sapien tristique, in iaculis leo
            euismod. Donec eu sem odio. Etiam cursus hendrerit risus vitae
            consequat. Duis et odio ultrices, aliquam magna a, pellentesque ex.
            Aliquam felis velit, aliquam et ante eu, condimentum commodo ex.
            Aliquam lorem nisi, ullamcorper sit amet diam tincidunt, pretium
            auctor orci. Aenean iaculis vel libero nec semper. Aenean lorem
            ante, cursus eu mattis eget, accumsan sed sapien. Morbi sollicitudin
            pretium ligula, a dignissim diam facilisis id. Cras et tempor lorem.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Vivamus porttitor ut orci id ullamcorper.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum laoreet varius nibh quis
            suscipit. Aliquam rutrum sapien id ante sodales, nec semper erat
            egestas. Maecenas ullamcorper varius dolor tempor pellentesque.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
      <FAB.Group
        style={screenStyles.FABGroup}
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            style: {backgroundColor: ColorPalette.green},
            icon: 'star',
            label: 'Star',
            onPress: () => console.log('Pressed star'),
          },
          {
            style: {backgroundColor: ColorPalette.green},
            icon: 'email',
            label: 'Email',
            onPress: () => console.log('Pressed email'),
          },
          {
            style: {backgroundColor: ColorPalette.green},
            icon: 'bell',
            label: 'Remind',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
        variant="primary"
        theme={{
          colors: {
            primaryContainer: ColorPalette.green,
            onPrimaryContainer: ColorPalette.white,
          },
        }}
      />
      <AnimatedFAB
        icon={'whatsapp'}
        label={'New Message'}
        extended={isExtended}
        onPress={() => console.log('Pressed')}
        visible={true}
        animateFrom="right"
        iconMode={'dynamic'}
        style={screenStyles.animatedFabStyle}
        theme={{
          colors: {
            primaryContainer: ColorPalette.green,
            onPrimaryContainer: ColorPalette.white,
          },
        }}
      />
      <Snackbar
        duration={3000}
        visible={snackBarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            onToggleSwitch();
          },
        }}>
        <Text style={screenStyles.snackBarText}>
          Switch {isSwitchOn ? 'On' : 'Off'}
        </Text>
      </Snackbar>
    </View>
  );
};

export default RNPaper;
