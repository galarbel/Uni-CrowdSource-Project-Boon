import {cyan500, grey100, grey200, grey400, grey500, grey900, white, darkBlack, fullBlack} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
export default {
    spacing: {
        iconSize: 24,
        desktopGutter: 24,
        desktopGutterMore: 32,
        desktopGutterLess: 16,
        desktopGutterMini: 8,
        desktopKeylineIncrement: 64,
        desktopDropDownMenuItemHeight: 32,
        desktopDropDownMenuFontSize: 15,
        desktopDrawerMenuItemHeight: 48,
        desktopSubheaderHeight: 48,
        desktopToolbarHeight: 56
    },
    fontFamily: '"Alef Hebrew","Helvetica Neue", Helvetica , Arial , sans-serif',
    palette: {
        primary1Color: '#095115',
        primary2Color: '#095115',
        primary3Color: grey400,
        accent1Color: '#095115',
        accent2Color: grey200,
        accent3Color: grey500,
        accent4Color: grey900,
        textColor: darkBlack,
        alternateTextColor: grey100,
        canvasColor: white,
        borderColor: '#cccccc',
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack
    },
};
