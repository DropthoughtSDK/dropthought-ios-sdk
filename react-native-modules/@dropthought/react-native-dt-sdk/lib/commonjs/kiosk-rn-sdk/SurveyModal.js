"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurveyModal = SurveyModal;
exports.SurveyModalContainer = exports.useOpenSurvey = exports.SurveyModalOpenSurveyContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _ramda = require("ramda");

var _reactNativeUi = require("@dropthought/react-native-ui");

var _SDKEntry = _interopRequireDefault(require("./SDKEntry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ModalProps = ['animated', 'animationType', 'transparent', 'visible', 'onRequestClose', 'onShow', 'presentationStyle', 'supportedOrientations', 'onDismiss', 'onOrientationChange', 'hardwareAccelerated'];
/**
 * @param {SurveyModalProps & SDKEntryProps & ModalProps } props
 */

function SurveyModal(props) {
  const sdkProps = (0, _ramda.omit)(ModalProps, props);
  const modalProps = (0, _ramda.pick)(ModalProps, props);
  return /*#__PURE__*/React.createElement(_reactNative.Modal, _extends({
    presentationStyle: "overFullScreen",
    transparent: true
  }, modalProps), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _reactNativeUi.GlobalStyle.flex1
  }, /*#__PURE__*/React.createElement(_SDKEntry.default, sdkProps)));
}
/** @type {React.Context<(param: OpenSurveyProps=) => void>} */


const SurveyModalOpenSurveyContext = /*#__PURE__*/React.createContext(() => undefined);
exports.SurveyModalOpenSurveyContext = SurveyModalOpenSurveyContext;

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
  const openSurvey = React.useCallback(() => {
    setVisible(true);
  }, []);
  const onCloseSurveyHandler = React.useCallback(() => {
    onClose && onClose();
    setVisible(false);
  }, [onClose]);
  return /*#__PURE__*/React.createElement(SurveyModalOpenSurveyContext.Provider, {
    value: openSurvey
  }, children, visible ? /*#__PURE__*/React.createElement(SurveyModal, _extends({}, props, {
    visible: visible,
    onClose: onCloseSurveyHandler
  })) : null);
};
/**
 * @typedef {import('./SDKEntry').SDKEntryProps} SDKEntryProps
 * @typedef {import('react-native').ModalProps} ModalProps
 */

/**
 * @typedef {object} SurveyModalProps
 * @property {boolean} visible
 */

/**
 * @typedef {SDKEntryProps & ModalProps} OpenSurveyProps
 */


exports.SurveyModalContainer = SurveyModalContainer;
//# sourceMappingURL=SurveyModal.js.map