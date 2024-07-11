// Declaration for PNG files
declare module '*.png' {
  const value: any;
  export default value;
}

// Declaration for SVG files
declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
