import {StyleSheet} from 'react-native';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    logoContainer: {
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    GithubLogo: {
      height: 30,
      width: 30,
      margin: height*0.0062,
    },
  });
export default styles;
