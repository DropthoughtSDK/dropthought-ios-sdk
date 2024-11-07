"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurveyModal = SurveyModal;
exports.useOpenSurvey = exports.SurveyModalOpenSurveyContext = exports.SurveyModalContainer = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ramda = require("ramda");
var _reactNativeUi = require("@dropthought/react-native-ui");
var _SDKEntry = _interopRequireDefault(require("./SDKEntry"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ModalProps = ['animated', 'animationType', 'transparent', 'visible', 'onRequestClose', 'onShow', 'presentationStyle', 'supportedOrientations', 'onDismiss', 'onOrientationChange', 'hardwareAccelerated'];
const height = _reactNative.Dimensions.get('window').height;
const width = _reactNative.Dimensions.get('window').width;
/**
 * @param {SurveyModalProps & SDKEntryProps & ModalProps } props
 */
function SurveyModal(props) {
  const sdkProps = (0, _ramda.omit)(ModalProps, props);
  const modalProps = (0, _ramda.pick)(ModalProps, props);
  //[DK-3764] add backgroundColor to prevent the broken ui issue
  const {
    backgroundColor,
    appearance
  } = props;
  let dummyBackgroundColor = _reactNativeUi.Colors.white;
  if (backgroundColor) {
    dummyBackgroundColor = backgroundColor;
  } else if (appearance === 'dark') {
    dummyBackgroundColor = _reactNativeUi.Colors.backgroundColorDark;
  }
  const containerStyle = {
    height,
    width,
    backgroundColor: dummyBackgroundColor
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: containerStyle
  }), /*#__PURE__*/React.createElement(_reactNative.Modal, _extends({
    presentationStyle: "overFullScreen",
    transparent: true
  }, modalProps), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _reactNativeUi.GlobalStyle.flex1
  }, /*#__PURE__*/React.createElement(_SDKEntry.default, sdkProps))));
}

/** @type {React.Context<(param: OpenSurveyProps=) => void>} */
const SurveyModalOpenSurveyContext = exports.SurveyModalOpenSurveyContext = /*#__PURE__*/React.createContext(() => undefined);
const useOpenSurvey = () => {
  const context = React.useContext(SurveyModalOpenSurveyContext);
  if (context === undefined) {
    throw new Error('useOpenSurvey must be used within a SurveyModalContainer');
  }
  return context;
};

/**
 * @param {SurveyModalProps & SDKEntryProps & ModalProps } param0
 */
exports.useOpenSurvey = useOpenSurvey;
const SurveyModalContainer = ({
  children,
  onClose,
  ...props
}) => {
  const [visible, setVisible] = React.useState(false);
  const [openSurveyProps, setOpenSurveyProps] = React.useState();
  const openSurvey = React.useCallback(( /** @type {SDKEntryProps} */inputProps) => {
    setOpenSurveyProps(inputProps);
    setVisible(true);
  }, []);
  const onCloseSurveyHandler = React.useCallback(() => {
    onClose && onClose();
    setVisible(false);
  }, [onClose]);
  return /*#__PURE__*/React.createElement(SurveyModalOpenSurveyContext.Provider, {
    value: openSurvey
  }, children, visible ? /*#__PURE__*/React.createElement(SurveyModal, _extends({}, props, openSurveyProps, {
    visible: visible,
    onClose: onCloseSurveyHandler
  })) : null);
};

/**
 * @typedef {import('./SurveyModal').SurveyModalProps} SurveyModalProps
 * @typedef {import('./SDKEntry').SDKEntryProps} SDKEntryProps
 * @typedef {import('react-native').ModalProps} ModalProps
 */

/**
 * @typedef {SDKEntryProps & ModalProps} OpenSurveyProps
 */
exports.SurveyModalContainer = SurveyModalContainer;
//# sourceMappingURL=SurveyModal.js.map