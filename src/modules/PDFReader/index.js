import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './Style';

const PDFReader = ({navigation}) => {
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadPercentage, setDownloadPercentage] = useState(0);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  
  const handleOpenPdf = async () => {
    const filePath = `${RNFS.DocumentDirectoryPath}/samplePdf.pdf`;
    const fileExists = await RNFS.exists(filePath);
    
    if (fileExists) {
      setIsPDFOpen(true);
    } else {
      try {
        await downloadPdf(filePath);
        setIsPDFOpen(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const downloadPdf = async (filePath) => {
    try {
      const options = {
        fromUrl: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
        toFile: filePath,
        progress: pro => {
          setDownloadPercentage(Math.ceil((pro.bytesWritten * 100) / pro.contentLength));
        },
      };
      setIsDownloading(true);
      await RNFS.downloadFile(options).promise;
      setIsDownloading(false);
      setDownloadPercentage(0)
    } catch (error) {
      Alert.alert('Download failed', error.message);
      console.log(error);
    }
  };
  return (
    <View style={screenStyles.canvas}>
      {!isPDFOpen ? (
        <View>
         <View style={screenStyles.menuButton}>
            <MenuDrawerButton
              navigation={navigation}
              color={ColorPalette.green}
            />
         </View>
          <TouchableOpacity
            style={screenStyles.OpenPdfButton}
            onPress={handleOpenPdf}>
            {isDownloading ? (
              <View>
                <ActivityIndicator color={ColorPalette.white} size={30} />
                <Text style={screenStyles.DownloadPDFText}>
                  {downloadPercentage} %
                </Text>
              </View>
            ) : (
              <Text style={screenStyles.DownloadPDFText}>DownloadPDF</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={screenStyles.canvas}>
          <TouchableOpacity
            style={screenStyles.backButton}
            onPress={() => setIsPDFOpen(false)}>
            <AntDesign name="left" size={30} color={ColorPalette.green} />
          </TouchableOpacity>
          <Pdf
            trustAllCerts={false}
            source={{
              uri: `file://${RNFS.DocumentDirectoryPath}/samplePdf.pdf`,
            }}
            onLoadProgress={percent => {
              // console.log('percent', percent)
            }}
            onLoadComplete={(numberOfPages, filePath) => {}}
            onPageChanged={(page, numberOfPages) => {}}
            onError={error => {
              Alert.alert(error);
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            enableDoubleTapZoom
            password="hi"
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={true}
            style={screenStyles.pdfView}
          />
        </View>
      )}
    </View>
  );
};

export default PDFReader;
