"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ChooseIcon = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = _interopRequireWildcard(require("../styles"));

var _ActivityIndicatorMask = _interopRequireDefault(require("./ActivityIndicatorMask"));

var _theme = require("../contexts/theme");

var _translation = _interopRequireDefault(require("../translation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ChooseIcon = ({
  isMultipleChoice,
  selected,
  themeColor
}) => {
  const iconStyle = {
    tintColor: themeColor,
    height: 18,
    width: 18
  };
  const cubeStyle = isMultipleChoice ? [styles.nonSelectedSquare, {
    borderColor: themeColor
  }] : [styles.nonSelectedCirle, {
    borderColor: themeColor
  }];
  return selected ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: iconStyle,
    source: isMultipleChoice ? require('../assets/icCheckBox24Px.png') : require('../assets/ic_picture_select.png')
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: cubeStyle
  });
};

exports.ChooseIcon = ChooseIcon;

const PictureChoiceItem = ({
  title,
  uri,
  isMultipleChoice,
  selected,
  columnGap,
  onPress,
  index,
  themeColor
}) => {
  const {
    fontColor,
    colorScheme
  } = (0, _theme.useTheme)();
  const rtl = _translation.default.dir() === 'rtl';
  const itemGapStyle = (0, _react.useMemo)(() => {
    if (rtl) {
      return {
        marginLeft: index % 2 === 0 ? columnGap : 0
      };
    } else {
      return {
        marginRight: index % 2 === 0 ? columnGap : 0
      };
    }
  }, [columnGap, index, rtl]);

  const {
    width
  } = _reactNative.Dimensions.get('window');

  const questionMargin = 30;
  const itemWidth = (width - 2 * questionMargin - columnGap) / 2;
  const [loadingImage, setLoadingImage] = (0, _react.useState)(true);
  const [imageLoadError, setImageLoadError] = (0, _react.useState)(false);
  const photo = (0, _react.useMemo)(() => {
    const iconStyle = {
      tintColor: themeColor
    };
    const photoStyle = [styles.picture, {
      width: itemWidth
    }];
    const reloadTextStyle = [styles.reloadText, {
      color: fontColor
    }];

    if (imageLoadError) {
      const reloadStyle = [styles.pictureReloadContainer, {
        width: itemWidth,
        backgroundColor: (0, _styles.addOpacityToHex)(themeColor, 0.1),
        borderColor: themeColor,
        ...itemGapStyle
      }];
      const reloadPlacholderStyle = [styles.reloadPlaceholderImage, iconStyle];
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: reloadStyle
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        style: reloadPlacholderStyle,
        source: require('../assets/ic_image_placeholder.png')
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _styles.default.row
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        style: iconStyle,
        source: require('../assets/ic_reload.png')
      }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: reloadTextStyle
      }, `${_translation.default.t('picture-choice:reload')}`)));
    } else {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        style: photoStyle,
        source: {
          uri
        },
        onLoadStart: () => setLoadingImage(true),
        onLoadEnd: () => setLoadingImage(false),
        onError: _error => {
          setImageLoadError(true);
          setLoadingImage(false);
        }
      });
    }
  }, [fontColor, imageLoadError, itemGapStyle, itemWidth, themeColor, uri]);
  const border = (0, _react.useMemo)(() => {
    const containerStyle = [styles.borderContainer, {
      borderWidth: selected ? 2 : 1,
      borderColor: selected ? themeColor : _styles.Colors.rankingBorder,
      width: itemWidth
    }];
    const maskStyle = {
      backgroundColor: (0, _styles.addOpacityToHex)(themeColor, 0.1)
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: containerStyle
    }, /*#__PURE__*/_react.default.createElement(_ActivityIndicatorMask.default, {
      loading: loadingImage,
      style: maskStyle
    }));
  }, [itemWidth, loadingImage, selected, themeColor]);
  const selection = (0, _react.useMemo)(() => {
    const containerStyle = [styles.optionContainer, rtl && _styles.default.flexRowReverse];
    const textStyle = colorScheme === _theme.COLOR_SCHEMES.dark ? [styles.optionText, {
      color: fontColor !== null && fontColor !== void 0 ? fontColor : _styles.Colors.appearanceSubBlack
    }] : [styles.optionText, {
      color: fontColor
    }];
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: containerStyle
    }, /*#__PURE__*/_react.default.createElement(ChooseIcon, {
      isMultipleChoice: isMultipleChoice,
      selected: selected,
      themeColor: themeColor
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: textStyle
    }, title));
  }, [colorScheme, fontColor, isMultipleChoice, rtl, selected, themeColor, title]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: itemGapStyle,
    onPress: () => {
      if (imageLoadError) {
        setImageLoadError(false);
        setLoadingImage(true);
      } else {
        onPress();
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, photo, border, selection));
};

var _default = /*#__PURE__*/_react.default.memo(PictureChoiceItem);

exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 25,
    minHeight: 20
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 5
  },
  picture: {
    height: 138,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: _styles.Colors.rankingBorder
  },
  pictureReloadContainer: {
    height: 138,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: _styles.Colors.rankingBorder,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reloadPlaceholderImage: {
    marginBottom: 8
  },
  reloadText: {
    fontSize: 12,
    marginLeft: 4
  },
  nonSelectedCirle: {
    width: 18,
    height: 18,
    borderColor: _styles.Colors.nonSelectCircle,
    borderWidth: 1,
    borderRadius: 9,
    marginTop: 1
  },
  nonSelectedSquare: {
    width: 18,
    height: 18,
    borderColor: _styles.Colors.nonSelectCircle,
    borderWidth: 1,
    borderRadius: 2,
    marginTop: 1
  },
  borderContainer: {
    position: 'absolute',
    height: 138,
    borderRadius: 12,
    borderColor: 'red',
    overflow: 'hidden'
  }
});
//# sourceMappingURL=PictureChoiceItem.js.map