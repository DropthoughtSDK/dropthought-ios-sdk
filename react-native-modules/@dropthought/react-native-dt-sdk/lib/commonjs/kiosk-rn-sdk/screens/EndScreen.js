"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _hooks = require("@react-native-community/hooks");

var _reactNativeUi = require("@dropthought/react-native-ui");

var _survey = require("../contexts/survey");

var _customProps = require("../contexts/custom-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useBackForDismiss = () => {
  const {
    onClose
  } = (0, _survey.useSurveyContext)();

  const backHandler = _react.default.useCallback(() => {
    onClose();
    return true;
  }, [onClose]);

  (0, _hooks.useBackHandler)(backHandler);
};
/**
 * @type {React.FunctionComponent<ScreenProps>}
 * @param {ScreenProps} props
 */


const EndScreen = ({
  error,
  surveyFeedback,
  onClose
}) => {
  const survey = (0, _survey.useSurvey)();
  const onSubmitSuccessCallback = (0, _customProps.useOnSubmitSuccessCallback)();
  const onSubmitCallback = (0, _customProps.useOnSubmitCallback)();

  _react.default.useEffect(() => {
    // passing data to native, if error is undefined, null, 0, it means success
    if (onSubmitCallback) {
      onSubmitCallback(surveyFeedback, error); // deprecate later

      if (!error && onSubmitSuccessCallback) {
        onSubmitSuccessCallback(surveyFeedback);
      }
    } // if (surveyFeedback)
    //     SurveyNativeBridge.onFeedbackResult(surveyFeedback, error || 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  useBackForDismiss();
  return /*#__PURE__*/_react.default.createElement(_reactNativeUi.EndScreenLayout, {
    survey: survey,
    onClose: onClose
  });
};

var _default = EndScreen;
/**
 * @typedef {import('../../data').SurveyFeedback} SurveyFeedback
 */

/**
 * @typedef {Object} ScreenProps
 * @property {Error=} error
 * @property {SurveyFeedback=} surveyFeedback
 * @property {() => void} onClose
 */

exports.default = _default;
//# sourceMappingURL=EndScreen.js.map