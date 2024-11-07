import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, GlobalStyle } from '../styles';
import i18n from '../translation';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
// @ts-ignore
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
const logoSource = {
  [COLOR_SCHEMES.light]: require('../assets/ic_dtlogo.png'),
  [COLOR_SCHEMES.dark]: require('../assets/ic_dtlogo_dark.png')
};
const defaultIconSource = require('../assets/rating.png');
const defaultIconSize = {
  [DimensionWidthType.phone]: 65,
  [DimensionWidthType.tablet]: 72
};
const EndScreen = ({
  survey,
  onClose
}) => {
  const insets = useSafeAreaInsets();
  const {
    hexCode,
    colorScheme,
    fontColor,
    backgroundColor,
    autoClose,
    autoCloseCountdown
  } = useTheme();
  const rtl = i18n.dir() === 'rtl';
  const dimensionWidthType = useDimensionWidthType();
  const {
    surveyProperty,
    thankYouTextPlain
  } = survey;
  const {
    image
  } = surveyProperty;
  const [imageHeight, setImageHeight] = useState(65);
  const iconStyle = {
    width: '100%',
    height: imageHeight
  };
  useEffect(() => {
    let timer;
    if (autoClose) {
      timer = setTimeout(onClose, autoCloseCountdown);
    }
    Image.getSize(image, (_, height) => {
      if (height < defaultIconSize[dimensionWidthType]) {
        setImageHeight(height);
      }
    }, _ => {});
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const iconSource = image === undefined ? defaultIconSource : {
    uri: image
  };
  const iconView = /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.row
  }, /*#__PURE__*/React.createElement(Image, {
    resizeMode: "contain"
    // @ts-ignore
    ,
    style: iconStyle,
    source: iconSource
  }));
  const powerByStyle = [styles.power_by, {
    color: fontColor
  }];
  const powerByBoldStyle = [styles.power_by_bold, {
    color: fontColor
  }];
  const containerStyle = [styles.headerContainer, {
    paddingTop: insets.top
  }, rtl && GlobalStyle.flexRowReverse, {
    backgroundColor
  }];
  const headerStyle = [styles.headerTitle, {
    color: fontColor
  }];
  const subTitleStyle = [styles.subtitle, {
    color: fontColor
  }];
  const headerIconStyle = {
    tintColor: hexCode
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.headerRowContainer
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.closeButton,
    onPress: onClose
  }, /*#__PURE__*/React.createElement(Image, {
    testID: "test:id/icon_custom_close_preview",
    style: headerIconStyle,
    source: require('../assets/icClose24Px.png')
  })), /*#__PURE__*/React.createElement(Text, {
    style: headerStyle,
    numberOfLines: 1
  }, survey.surveyName))), /*#__PURE__*/React.createElement(View, {
    style: styles.main
  }, iconView, /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/take_survey_thankful_msg",
    style: subTitleStyle
  }, thankYouTextPlain)), /*#__PURE__*/React.createElement(View, {
    style: styles.vertical
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.horizontal
  }, /*#__PURE__*/React.createElement(Text, {
    style: powerByStyle
  }, "Powered by "), /*#__PURE__*/React.createElement(Image, {
    style: styles.dtLogo,
    source: logoSource[colorScheme]
  })), /*#__PURE__*/React.createElement(Text, {
    style: powerByBoldStyle
  }, "dropthought")));
};
export default EndScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center'
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 38
  },
  title: {
    lineHeight: 27,
    marginTop: 44,
    fontSize: 22,
    opacity: 0.8,
    fontWeight: '500'
  },
  subtitle: {
    marginTop: 17,
    fontSize: 19,
    textAlign: 'center',
    opacity: 0.72,
    paddingBottom: 10
  },
  vertical: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 83
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  power_by: {
    fontSize: 12
  },
  power_by_bold: {
    fontSize: 16,
    fontWeight: '600'
  },
  dtLogo: {
    height: 24,
    width: 24
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  headerRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    marginTop: 17
  },
  closeButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 30,
    textAlign: 'center',
    flexGrow: 1
  }
});
//# sourceMappingURL=EndScreen.js.map