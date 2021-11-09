"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SurveyProgressBarPosition = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _surveyPage = require("../contexts/survey-page");

var _QuestionContainer = _interopRequireDefault(require("./QuestionContainer"));

var _SurveyProgressBar = _interopRequireDefault(require("./SurveyProgressBar"));

var _SurveyFooter = _interopRequireDefault(require("./SurveyFooter"));

var _SurveyPageIndicator = _interopRequireDefault(require("../components/SurveyPageIndicator"));

var _KeyboardAvoidingView = require("../components/KeyboardAvoidingView");

var _styles = _interopRequireDefault(require("../styles"));

var _translation = _interopRequireDefault(require("../translation"));

var _theme = require("../contexts/theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SurveyProgressBarPosition = {
  FixedBottom: 0,
  BelowBody: 1
};
exports.SurveyProgressBarPosition = SurveyProgressBarPosition;
const ScrollView = _reactNative.Platform.OS === 'ios' ? _KeyboardAvoidingView.KeyboardAvoidingScrollView : _reactNative.ScrollView;

const SurveyScreenLayout = props => {
  const {
    backgroundColor
  } = (0, _theme.useTheme)();
  const {
    pageIndex = 0,
    survey,
    SurveyPageIndicator = _SurveyPageIndicator.default,
    SurveyProgressBar = _SurveyProgressBar.default,
    surveyProgressBarPosition = SurveyProgressBarPosition.FixedBottom
  } = props;
  const scrollViewRef = React.useRef(null); // when validation start, set the state

  const [validationStarted, setValidationStarted] = React.useState(false);
  const onValidationStartHandler = React.useCallback(() => {
    setValidationStarted(true);
  }, []); // when validation failed, scroll to the ref

  const onValidationFailedHandler = React.useCallback((_, targetReg) => {
    if (targetReg && scrollViewRef.current) {
      targetReg.measureLayout((0, _reactNative.findNodeHandle)(scrollViewRef.current), (_x, y) => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: 0,
            y: y,
            animated: true
          });
        }
      });
    }
  }, []);
  const questions = survey.pages[pageIndex].questions.map(question => {
    return /*#__PURE__*/React.createElement(_QuestionContainer.default, {
      key: question.questionId,
      anonymous: survey.anonymous,
      question: question,
      validationStarted: validationStarted,
      themeColor: survey.surveyProperty.hexCode
    });
  });
  const surveyProgressBar = /*#__PURE__*/React.createElement(SurveyProgressBar, {
    survey: survey,
    pageIndex: pageIndex,
    rtl: _translation.default.dir() === 'rtl'
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_styles.default.flex1, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(SurveyPageIndicator, {
    pageIndex: pageIndex,
    survey: survey,
    rtl: _translation.default.dir() === 'rtl'
  }), /*#__PURE__*/React.createElement(ScrollView, {
    ref: scrollViewRef,
    style: [styles.scrollView, {
      backgroundColor
    }],
    extraAvoidingSpace: 30,
    contentContainerStyle: styles.scrollViewContentContainer
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.bodyContent
  }, questions, /*#__PURE__*/React.createElement(_SurveyFooter.default, _extends({}, props, {
    survey: survey,
    onValidationFailed: onValidationFailedHandler,
    onValidationStart: onValidationStartHandler
  })), surveyProgressBarPosition === SurveyProgressBarPosition.BelowBody && surveyProgressBar)), surveyProgressBarPosition === SurveyProgressBarPosition.FixedBottom && surveyProgressBar);
};

const SurveyScreenLayoutWrapper = props => {
  return /*#__PURE__*/React.createElement(_surveyPage.SurveyPageProvider, null, /*#__PURE__*/React.createElement(SurveyScreenLayout, props));
};

var _default = SurveyScreenLayoutWrapper;
exports.default = _default;

const noop = () => undefined;

SurveyScreenLayout.defaultProps = {
  pageIndex: 0,
  onSubmit: noop,
  onNextPage: noop,
  onPrevPage: noop
};

const styles = _reactNative.StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 30
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 30
  },
  // where the questions and submit/page buttons go
  bodyContent: {
    width: '100%',
    flex: 1,
    maxWidth: 648
  }
});
//# sourceMappingURL=SurveyScreenLayout.js.map