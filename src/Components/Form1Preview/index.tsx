import React from 'react';
import RNFS from 'react-native-fs'
import {WebView} from 'react-native-webview';
import {Alert, Modal, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text} from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {useAppSelector} from '../../hooks/hooks';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {SetStateType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import moment from 'moment';
import styles from './style';

type Form1PreviewPropsType = {
  setIsPreviewing: SetStateType<boolean>;
};

const Form1Preview: React.FC<Form1PreviewPropsType> = ({setIsPreviewing}) => {
  const Form1DataFromRedux = useAppSelector(state => state.Form1Data);

  const generateHtmlContent = () => {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>User Details</title>
                  <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        color: ${ColorPalette.gray};
      }
      h1 {
        text-align: center;
      }
      .section {
        margin-bottom: 20px;
      }
      .section h2 {
        color: #555;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      .table th,
      .table td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      .table th {
        background-color: #f4f4f4;
        text-align: left;
      }
      .table td {
        text-align: left;
      }
      #profilePicContainer {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        overflow: hidden;
        border: 2px solid #ddd;
        margin-bottom: 20px;
        /* Space between heading and profile picture */
      }
      #profilePic {
        width: 100%;
        height: auto;
      }
    </style>
            </head>
            <body>
                <h1>Form 1</h1>
                
                <div class="section">
                    <h2>
                       Personal Details
                      <div id="profilePicContainer">
                          <img id="profilePic" src=${
                            Form1DataFromRedux.documentsDetails.profilePic ||
                            'not uploaded'
                          } alt="Profile Picture" />
                      </div>
                     </h2>
                      <table class="table">
        <tr>
          <th>Name</th>
          <td id="personalName">${
            Form1DataFromRedux.personalDetails.name || 'N/A'
          }</td>
        </tr>
        <tr>
          <th>Email</th>
          <td id="personalEmail">${
            Form1DataFromRedux.personalDetails.email || 'N/A'
          }</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td id="personalPhone">${
            Form1DataFromRedux.personalDetails.phone || 'N/A'
          }</td>
        </tr>
        <tr>
          <th>Date of Birth</th>
          <td id="personalDob">${Form1DataFromRedux.personalDetails.dob?
            moment(Form1DataFromRedux.personalDetails.dob).format('DD/MM/YY') : 'N/A'
          }</td>
        </tr>
        <tr>
          <th>Age</th>
          <td id="personalAge">${Form1DataFromRedux.personalDetails.age?
            Form1DataFromRedux.personalDetails.age : 'N/A'
          }</td>
        </tr>
      </table>
                </div>
                <div class="section">
      <h2>Address Details</h2>
      <h4>Current</h4>
      <table class="table">
        <tr>
          <th>Address</th>
          <td id="addressCurrentAddress">${
            Form1DataFromRedux.addressDetails.currentAddress || 'N/A'
          }</td>
        </tr>
        <tr>
          <th>City</th>
          <td id="addressCurrentCity">${
            Form1DataFromRedux.addressDetails.currentCity || 'N/A'
          }</td>
        </tr>
        <tr>
          <th>State</th>
          <td id="addressCurrentState">${
            Form1DataFromRedux.addressDetails.currentState || 'N/A'
          }</td>
        </tr>
        <tr>
          <th>Country</th>
          <td id="addressCurrentCountry">${
            Form1DataFromRedux.addressDetails.currentCountry || 'N/A'
          }</td>
        </tr>
        <tr>
          <th>Pincode</th>
          <td id="addressCurrentPincode">${
            Form1DataFromRedux.addressDetails.currentPincode || 'N/A'
          }</td>
        </tr>
      </table>
      <h4>Permanent</h4>
      <table class="table">
        <tr>
          <th>Address</th>
          <td id="addressPermanentAddress">${
            Form1DataFromRedux.addressDetails.permanentAddress || 'N/A'
          }</td>
        </tr>
        <tr>
          <th>City</th>
          <td id="addressPermanentCity">${
            Form1DataFromRedux.addressDetails.permanentCity || 'N/A'
          }</td>
        </tr>
        <tr>
          <th>State</th>
          <td id="addressPermanentState">${
            Form1DataFromRedux.addressDetails.permanentState || 'N/A'
          }</td>
        </tr>
        <tr>
          <th>Country</th>
          <td id="addressPermanentCountry">${
            Form1DataFromRedux.addressDetails.permanentCountry || 'N/A'
          }</td>
        </tr>
        <tr>
          <th>Pincode</th>
          <td id="addressPermanentPincode">${
            Form1DataFromRedux.addressDetails.permanentPincode || 'N/A'
          }</td>
        </tr>
      </table>
    </div>
     <div class="section">
      <h2>Education Details</h2>
      <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Institution</th>
        <th>Degree</th>
        <th>Field of Study</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
    ${Form1DataFromRedux.educationDetails.map(
      (ed, index) =>
        `<tr>
        <td>${index + 1}</td>
        <td>${ed.institution || 'N/A'}</td>
        <td>${ed.degree || 'N/A'}</td>
        <td>${ed.fieldOfStudy || 'N/A'}</td>
        <td>${ed.yearOfCompletion || 'N/A'}</td>
      </tr>`,
    )}
    </tbody>
  </table>
    </div>

 <div class="section">
      <h2>Documents Details</h2>
      <table class="table">
        <tr>
          <th>Resume</th>
          <td id="documentsResume">
          ${
            Form1DataFromRedux.documentsDetails.resume
              ? 'Uploaded'
              : 'Not Uploaded'
          }
          </td>
        </tr>
        <tr>
          <th>Signature</th>
          <td><img src="${
            Form1DataFromRedux.documentsDetails.signature || ''
          }" alt="Signature" style="max-width: 150px;" /></td>
        </tr>
      </table>
    </div>
            </body>
            </html>
        `;
  };
  const handleDownloadPDF=async()=>{
    let options = {
      html: generateHtmlContent(),
      fileName: 'form1',
      directory: RNFS.DownloadDirectoryPath,
    };

    let file = await RNHTMLtoPDF.convert(options)
    console.log(file);
    Alert.alert(file.filePath);
  }


  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  return (
    <Modal style={screenStyles.canvas}>
      <View style={screenStyles.headerContents}>
        <TouchableOpacity onPress={() => setIsPreviewing(false)}>
          <AntDesign name="left" size={30} />
        </TouchableOpacity>
        <Text style={screenStyles.heading}>Preview</Text>
        <TouchableOpacity
          style={screenStyles.downloadButton}
          onPress={handleDownloadPDF}>
          <AntDesign name="download" size={20} color={ColorPalette.white} />
        </TouchableOpacity>
      </View>
      <View style={screenStyles.webViewContainer}>
        <WebView
          originWhitelist={['*']}
          source={{html: generateHtmlContent()}}
        />
      </View>
    </Modal>
  );
};

export default Form1Preview;
