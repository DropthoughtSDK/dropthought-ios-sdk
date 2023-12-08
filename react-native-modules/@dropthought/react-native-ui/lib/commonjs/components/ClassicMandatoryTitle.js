"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

var React = _interopRequireWildcard(require("react"));

var _surveyPage = require("../contexts/survey-page");

var _styles = _interopRequireWildcard(require("../styles"));

var _ClassicQuestionWarningMessage = _interopRequireDefault(require("./ClassicQuestionWarningMessage"));

var _translation = _interopRequireDefault(require("../translation"));

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _theme = require("../contexts/theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ClassicMandatoryTitle = ({
  forgot,
  invalidMessage = '',
  mandatoryErrorMessage,
  question,
  style
}) => {
  const rtl = _translation.default.dir() === 'rtl';
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const {
    fontColor
  } = (0, _theme.useTheme)();
  const ref = React.useRef(null);
  const addMandatoryRef = (0, _surveyPage.useAddMandatoryRef)();
  React.useEffect(() => {
    if (ref.current) {
      addMandatoryRef(question.questionId, ref.current);
    }
  }, [addMandatoryRef, question.questionId]);
  const textStyle = [styles.questionTitle, questionTitleSize[dimensionWidthType], {
    color: fontColor,
    minHeight: _translation.default.language === 'te' ? 30 : undefined
  }];
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    ref: ref,
    style: [styles.horizontal, style, rtl && _styles.default.flexRowReverse]
  }, question.questionTitle.split(' ').map((text, index) => /*#__PURE__*/React.createElement(_reactNative.Text, {
    key: index,
    style: textStyle
  }, text + ' ')), //optional was been used on matrix question
  (question.mandatory || question.optional) && /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.hint
  }, "*"), /*#__PURE__*/React.createElement(_ClassicQuestionWarningMessage.default // forgot message has higher priority than custom invalid message
  , {
    message: forgot ? mandatoryErrorMessage : invalidMessage
  }));
};

var _default = ClassicMandatoryTitle;
exports.default = _default;

const questionTitleSize = _reactNative.StyleSheet.create({
  [_useWindowDimensions.DimensionWidthType.phone]: {
    fontSize: 16
  },
  [_useWindowDimensions.DimensionWidthType.tablet]: {
    fontSize: 18
  }
});

const styles = _reactNative.StyleSheet.create({
  hint: {
    color: _styles.Colors.mandatoryRed,
    fontSize: 18
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  questionTitle: {
    fontSize: 18,
    marginBottom: 2,
    textAlignVertical: 'center',
    alignSelf: 'center'
  }
});
//# sourceMappingURL=ClassicMandatoryTitle.js.map