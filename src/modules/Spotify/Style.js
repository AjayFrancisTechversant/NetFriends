import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) => StyleSheet.create({canvas:{flex:1,backgroundColor:ColorPalette.white},
    openPlayerButton:{backgroundColor:ColorPalette.green,justifyContent:'center',alignItems:'center',width:width*0.2,elevation:10,borderRadius:10}
});
export default styles;
