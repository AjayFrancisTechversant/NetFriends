import React from 'react';
import {WebView} from 'react-native-webview';
import {Modal, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text} from 'react-native-paper';
import {useAppSelector} from '../../hooks/hooks';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import {SetStateType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

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
                        color: #333;
                    }
                    h1 {
                        color: #4CAF50;
                    }
                    .section {
                        margin-bottom: 20px;
                    }
                    .section h2 {
                        color: #555;
                    }
                    .section p {
                        margin: 5px 0;
                    }
                </style>
            </head>
            <body>
                <h1>User Details</h1>
                
                <div class="section">
                    <h2>Personal Details</h2>
                    <p><strong>Name:</strong> ${
                      Form1DataFromRedux.personalDetails.name || 'N/A'
                    }</p>
                    <p><strong>Email:</strong> ${
                      Form1DataFromRedux.personalDetails.email || 'N/A'
                    }</p>
                    <p><strong>Phone:</strong> ${
                      Form1DataFromRedux.personalDetails.phone || 'N/A'
                    }</p>
                    <p><strong>Date of Birth:</strong> ${
                      Form1DataFromRedux.personalDetails.dob || 'N/A'
                    }</p>
                    <p><strong>Age:</strong> ${
                      Form1DataFromRedux.personalDetails.age || 'N/A'
                    }</p>
                </div>
                
                <div class="section">
                    <h2>Address Details</h2>
                    <p><strong>Current Address:</strong> ${
                      Form1DataFromRedux.addressDetails.currentAddress || 'N/A'
                    }</p>
                    <p><strong>Current City:</strong> ${
                      Form1DataFromRedux.addressDetails.currentCity || 'N/A'
                    }</p>
                    <p><strong>Current State:</strong> ${
                      Form1DataFromRedux.addressDetails.currentState || 'N/A'
                    }</p>
                    <p><strong>Current Country:</strong> ${
                      Form1DataFromRedux.addressDetails.currentCountry || 'N/A'
                    }</p>
                    <p><strong>Current Pincode:</strong> ${
                      Form1DataFromRedux.addressDetails.currentPincode || 'N/A'
                    }</p>
                    <p><strong>Permanent Address:</strong> ${
                      Form1DataFromRedux.addressDetails.permanentAddress ||
                      'N/A'
                    }</p>
                    <p><strong>Permanent City:</strong> ${
                      Form1DataFromRedux.addressDetails.permanentCity || 'N/A'
                    }</p>
                    <p><strong>Permanent State:</strong> ${
                      Form1DataFromRedux.addressDetails.permanentState || 'N/A'
                    }</p>
                    <p><strong>Permanent Country:</strong> ${
                      Form1DataFromRedux.addressDetails.permanentCountry ||
                      'N/A'
                    }</p>
                    <p><strong>Permanent Pincode:</strong> ${
                      Form1DataFromRedux.addressDetails.permanentPincode ||
                      'N/A'
                    }</p>
                </div>
                
                <div class="section">
                    <h2>Education Details</h2>
                    <ul>
                        ${Form1DataFromRedux.educationDetails
                          .map(
                            ed => `
                            <li>
                                <strong>Institution:</strong> ${
                                  ed.institution || 'N/A'
                                }<br>
                                <strong>Degree:</strong> ${
                                  ed.degree || 'N/A'
                                }<br>
                                <strong>Field of Study:</strong> ${
                                  ed.fieldOfStudy || 'N/A'
                                }<br>
                                <strong>Year of Completion:</strong> ${
                                  ed.yearOfCompletion || 'N/A'
                                }<br>
                                <strong>Extra:</strong> ${
                                  ed.isExtra ? 'Yes' : 'No'
                                }
                            </li>
                        `,
                          )
                          .join('')}
                    </ul>
                </div>
                
                <div class="section">
                    <h2>Documents Details</h2>
                    <p><strong>Resume:</strong> ${
                      Form1DataFromRedux.documentsDetails.resume
                        ? 'Uploaded'
                        : 'Not Uploaded'
                    }</p>
                    <p><strong>Profile Picture:</strong> ${
                      Form1DataFromRedux.documentsDetails.profilePic
                        ? 'Uploaded'
                        : 'Not Uploaded'
                    }</p>
                    <p><strong>Signature:</strong> ${
                      Form1DataFromRedux.documentsDetails.signature
                        ? 'Uploaded'
                        : 'Not Uploaded'
                    }</p>
                </div>
            </body>
            </html>
        `;
  };
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
        <TouchableOpacity
          style={screenStyles.downloadButton}
          onPress={() => {}}>
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
