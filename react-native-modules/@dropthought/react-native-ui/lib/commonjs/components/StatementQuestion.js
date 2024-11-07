"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = require("react-native-svg");
var _styles = _interopRequireWildcard(require("../styles"));
var _theme = require("../contexts/theme");
var _OpenURLButton = _interopRequireDefault(require("./OpenURLButton"));
var _ActivityIndicatorMask = _interopRequireDefault(require("./ActivityIndicatorMask"));
var _translation = _interopRequireDefault(require("../translation"));
var _useStateRef = _interopRequireDefault(require("../hooks/useStateRef"));
var _data = require("../utils/data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RELOAD_TIMEOUT = 30 * 1000;
const MAX_IMAGE_HEIGHT = 445;
const questionContainerWidth = _reactNative.Dimensions.get('window').width * 0.8;
const getImageExtension = url => {
  return (url === null || url === void 0 ? void 0 : url.split('.').pop()) || '';
};
const StatementQuestion = ({
  question,
  onFeedback
}) => {
  const {
    questionTitlePlain,
    statementProperty,
    questionId
  } = question;
  const {
    fontColor
  } = (0, _theme.useTheme)();
  const {
    addImage,
    addUrl,
    url = '',
    logo
  } = statementProperty;
  const rtl = _translation.default.dir() === 'rtl';
  const [size, setSize] = (0, _react.useState)({
    width: questionContainerWidth,
    height: MAX_IMAGE_HEIGHT
  });
  const [loadingImage, setLoadingImage, loadingImageRef] = (0, _useStateRef.default)(true);
  const [imageLoadError, setImageLoadError, imageLoadErrorRef] = (0, _useStateRef.default)(false);
  const fetchImageSize = (0, _react.useCallback)(
  /**
   * @param {string} uri
   */
  uri => {
    (0, _data.getImageSize)(uri).then(imageSize => {
      const ratio = Math.min(questionContainerWidth / imageSize.width, MAX_IMAGE_HEIGHT / imageSize.height, 1);
      setSize({
        width: imageSize.width * ratio,
        height: imageSize.height * ratio
      });
    });
  }, []);
  (0, _react.useEffect)(() => {
    if (logo && getImageExtension(logo) !== 'svg') {
      fetchImageSize(logo);
    }

    // this feedback means user has read it.
    onFeedback({
      questionId,
      answers: [''],
      type: 'statement'
    });
  }, [fetchImageSize, logo, onFeedback, questionId]);
  const descriptionStyle = [styles.description, rtl && _styles.default.textAlignRight, {
    color: fontColor
  }];

  //@ts-ignore
  const earthIcon = /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: require('../assets/ic-earth.png')
  });
  const urlComponent = addUrl ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.urlContainer, rtl && _styles.default.flexRowReverse]
  }, earthIcon, /*#__PURE__*/_react.default.createElement(_OpenURLButton.default, {
    url: url
  })) : null;
  const triggerReload = (0, _react.useCallback)(() => {
    if (logo && getImageExtension(logo) !== 'svg') {
      fetchImageSize(logo);
    }
    setImageLoadError(false);
    setLoadingImage(true);
    if (_reactNative.Platform.OS === 'ios') {
      setTimeout(() => {
        if (!imageLoadErrorRef.current && loadingImageRef.current) {
          setImageLoadError(true);
          setLoadingImage(false);
        }
      }, RELOAD_TIMEOUT);
    }
  }, [fetchImageSize, imageLoadErrorRef, loadingImageRef, logo, setImageLoadError, setLoadingImage]);
  const reloadTextStyle = [styles.reloadText, {
    color: fontColor
  }];
  const imageComponent = () => {
    if (addImage) {
      if (imageLoadError) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.reloadContainer,
          onPress: triggerReload
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: require('../assets/ic_image_placeholder.png')
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: _styles.default.row
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: require('../assets/ic_reload.png'),
          tintColor: fontColor
        }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          style: reloadTextStyle
        }, `${_translation.default.t('picture-choice:reload')}`)));
      } else {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.imageContainer
        }, getImageExtension(logo) === 'svg' ? /*#__PURE__*/_react.default.createElement(_reactNativeSvg.SvgUri, {
          width: "100%",
          height: MAX_IMAGE_HEIGHT,
          uri: logo || '',
          onLoad: () => {
            setLoadingImage(false);
          }
        }) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          style: [styles.image, size],
          source: {
            uri: logo
          },
          onLoadStart: () => setLoadingImage(true),
          onLoadEnd: () => setLoadingImage(false),
          onError: _ => {
            setImageLoadError(true);
            setLoadingImage(false);
          }
        }), /*#__PURE__*/_react.default.createElement(_ActivityIndicatorMask.default, {
          loading: loadingImage
        }));
      }
    }
    return null;
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.content
  }, imageComponent(), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: descriptionStyle
  }, questionTitlePlain), urlComponent));
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(StatementQuestion);
const styles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    ..._styles.default.flex1
  },
  content: {
    gap: 20
  },
  image: {
    width: '100%',
    height: MAX_IMAGE_HEIGHT,
    resizeMode: 'contain',
    borderRadius: 20
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  urlContainer: {
    flexDirection: 'row',
    gap: 10
  },
  reloadContainer: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: _styles.Colors.rankingBorder,
    paddingVertical: 36,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 22
  },
  reloadText: {
    fontSize: 14,
    marginLeft: 6
  }
});
//# sourceMappingURL=StatementQuestion.js.map