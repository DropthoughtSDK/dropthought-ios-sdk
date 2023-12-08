import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../styles';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import { useTheme } from '../contexts/theme';
import { GlobalStyle } from '../styles';

const logoSource = require('../assets/ic_dtlogo.png');

const defaultIconSource = require('../assets/rating.png');

const defaultIconSize = {
  [DimensionWidthType.phone]: 65,
  [DimensionWidthType.tablet]: 72
};

const ClassicEndScreen = ({
  survey
}) => {
  const dimensionWidthType = useDimensionWidthType();
  const {
    fontColor,
    backgroundColor
  } = useTheme();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
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
    Image.getSize(image, (_, height) => {
      if (height < defaultIconSize[dimensionWidthType]) {
        setImageHeight(height);
      }
    }, _ => {}); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const iconSource = image === undefined ? defaultIconSource : {
    uri: image
  };
  const iconView = /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.row
  }, /*#__PURE__*/React.createElement(Image, {
    resizeMode: "contain",
    style: iconStyle,
    source: iconSource
  }));
  return /*#__PURE__*/React.createElement(View, {
    style: [shareStyles.container, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.main
  }, iconView, /*#__PURE__*/React.createElement(Text, {
    style: [styles.subtitle, {
      color: fontColor
    }]
  }, thankYouTextPlain)), /*#__PURE__*/React.createElement(View, {
    style: styles.vertical
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.horizontal
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.power_by
  }, "Powered by "), /*#__PURE__*/React.createElement(Image, {
    style: styles.dtLogo,
    source: logoSource
  })), /*#__PURE__*/React.createElement(Text, {
    style: [styles.power_by_bold, {
      color: fontColor
    }]
  }, "dropthought")));
};

export default ClassicEndScreen;
const shareStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center'
  }
});
const phoneStyles = StyleSheet.create({
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
    opacity: 0.9
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
    color: Colors.settingsGreyText,
    fontSize: 9
  },
  power_by_bold: {
    fontSize: 12,
    fontWeight: '500'
  },
  dtLogo: {
    height: 15,
    width: 15
  }
});
const tabletStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 70
  },
  icon: {
    height: 72,
    width: 72
  },
  title: {
    lineHeight: 38,
    marginTop: 44,
    fontSize: 31,
    opacity: 0.9
  },
  subtitle: {
    lineHeight: 25,
    marginTop: 17,
    fontSize: 21,
    textAlign: 'center',
    opacity: 0.72
  },
  vertical: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 67
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  power_by: {
    color: Colors.settingsGreyText,
    fontSize: 12
  },
  power_by_bold: {
    fontSize: 15,
    fontWeight: '500'
  },
  dtLogo: {
    height: 17,
    width: 17
  }
});
//# sourceMappingURL=ClassicEndScreen.js.map