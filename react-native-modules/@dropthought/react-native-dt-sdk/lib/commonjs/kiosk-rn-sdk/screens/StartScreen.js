"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _src = require("@dropthought/react-native-ui/src");
var _ErrorHintScreen = _interopRequireDefault(require("./ErrorHintScreen"));
var _survey = require("../contexts/survey");
var _DateTimerParser = require("../../lib/DateTimerParser");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 *
 * @param {import('../../data').ProgramStateType} surveyState
 * @param {Date} surveyStartDate
 * @param {Date} surveyEndDate
 */
const checkSurveyStatus = (surveyState, surveyStartDate, surveyEndDate) => {
  let imageType;
  switch (surveyState) {
    case 'active':
      imageType = null;
      break;
    case 'expired':
      imageType = _src.PlaceholderImageTypes.ProgramExpired;
      break;
    case 'scheduled':
      imageType = _src.PlaceholderImageTypes.ProgramScheduled;
      break;
    case 'inactive':
      imageType = _src.PlaceholderImageTypes.ProgramDeactivated;
      break;
    case 'drafts':
    default:
      imageType = _src.PlaceholderImageTypes.ProgramUnavailable;
  }
  // still need to check the start-end time
  if (!imageType) {
    const now = new Date();
    if (now < surveyStartDate) {
      imageType = _src.PlaceholderImageTypes.ProgramScheduled;
    } else if (now > surveyEndDate) {
      imageType = _src.PlaceholderImageTypes.ProgramExpired;
    }
  }
  return imageType;
};

/**
 * @type {React.FunctionComponent<ScreenProps>}
 * @param {ScreenProps} props
 */
const StartScreen = props => {
  const {
    onStart,
    onClose
  } = props;
  const {
    survey,
    changeLanguage
  } = (0, _survey.useSurveyContext)();
  const {
    state: surveyState,
    surveyEndDate: surveyEndDateStr,
    surveyStartDate: surveyStartDateStr
  } = survey;
  const surveyStartDate = (0, _DateTimerParser.fromAPIDateStrToJS)(surveyStartDateStr);
  const surveyEndDate = (0, _DateTimerParser.fromAPIDateStrToJS)(surveyEndDateStr);
  const onLanguageSelectHandler = _react.default.useCallback(language => {
    changeLanguage(language);
  }, [changeLanguage]);

  // render placeholder
  const imageType = checkSurveyStatus(surveyState, surveyStartDate, surveyEndDate);
  if (imageType) {
    // need to render placeholder
    return /*#__PURE__*/_react.default.createElement(_ErrorHintScreen.default, {
      onClose: onClose
    }, /*#__PURE__*/_react.default.createElement(_src.PlaceholderScreen, {
      imageType: imageType,
      message: _src.i18n.t('start-survey:placeholder-message')
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_src.StartScreenLayout, {
    survey: survey,
    onClose: onClose,
    onStart: onStart,
    onLanguageSelect: onLanguageSelectHandler
  });
};
var _default = exports.default = StartScreen;
/**
 * @typedef {Object} ScreenProps
 * @property {() => void} onStart
 * @property {() => void} onClose
 */
//# sourceMappingURL=StartScreen.js.map