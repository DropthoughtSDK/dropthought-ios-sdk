"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _ramda = require("ramda");

var _reactNativeUi = require("@dropthought/react-native-ui");

var _reactAsync = require("react-async");

var _customProps = require("../contexts/custom-props");

var _StartScreen = _interopRequireDefault(require("../screens/StartScreen"));

var _EndScreen = _interopRequireDefault(require("../screens/EndScreen"));

var _FakeScreen = _interopRequireDefault(require("../screens/FakeScreen"));

var _survey = require("../contexts/survey");

var _Feedback = require("../../lib/Feedback");

var _ScreenWrapper = _interopRequireDefault(require("./ScreenWrapper"));

var _Header = _interopRequireDefault(require("./Header"));

var _DateTimerParser = require("../../lib/DateTimerParser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const noData = a => (0, _ramda.isNil)(a) || (0, _ramda.isEmpty)(a);

const Stack = ({
  survey
}) => {
  const {
    onClose
  } = (0, _survey.useSurveyContext)();
  const themeColor = survey.surveyProperty.hexCode;
  const [visiblePageIds, setVisiblePageIds] = React.useState([]);
  const [endScreenvisible, setEndScreenvisible] = React.useState(false);
  const [surveyFeedback, setSurveyFeedback] = React.useState(undefined);
  const [error, setError] = React.useState();
  const metadata = (0, _customProps.useMetadata)();
  const {
    run,
    isPending: loading
  } = (0, _reactAsync.useAsync)({
    deferFn: _Feedback.submitFeedback,
    onResolve: () => {
      setEndScreenvisible(true);
    },
    onReject: rejectedError => {
      setError(rejectedError);
      setEndScreenvisible(true);
    }
  });
  const handleNextPage = React.useCallback(nextPageIndex => {
    if (nextPageIndex < survey.pageOrder.length) {
      setVisiblePageIds(prevPageIds => {
        const nextPageId = survey.pageOrder[nextPageIndex];
        return [...prevPageIds.filter(prevPageId => prevPageId !== nextPageId), nextPageId];
      });
    }
  }, [survey.pageOrder]);
  const handleStart = React.useCallback(() => {
    handleNextPage(0);
  }, [handleNextPage]);
  const handlePrevPage = React.useCallback(() => {
    setVisiblePageIds(prevPageIds => prevPageIds.slice(0, -1));
  }, []);
  const handleSubmit = React.useCallback(feedback => {
    const {
      timeZone
    } = _reactNative.NativeModules.DtSdk.getConstants();

    setSurveyFeedback(feedback);
    run({ ...feedback,
      metadata,
      createdTime: (0, _DateTimerParser.fromJSToAPIDateStr)(Date.now()),
      timeZone
    });
  }, [metadata, run]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.flexOne
  }, /*#__PURE__*/React.createElement(_Header.default, {
    title: survey.surveyName,
    onClose: onClose,
    themeColor: themeColor
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.flexOne
  }, /*#__PURE__*/React.createElement(_ScreenWrapper.default, {
    visible: true,
    isOnTop: !endScreenvisible && visiblePageIds.length === 0
  }, /*#__PURE__*/React.createElement(_StartScreen.default, {
    onStart: handleStart
  })), survey.pageOrder.map((pageId, pageIndex) => {
    return /*#__PURE__*/React.createElement(_ScreenWrapper.default, {
      key: pageId,
      visible: visiblePageIds.includes(pageId),
      isOnTop: visiblePageIds[visiblePageIds.length - 1] === pageId
    }, /*#__PURE__*/React.createElement(_reactNativeUi.SurveyScreenLayout, {
      survey: survey,
      pageIndex: pageIndex,
      onNextPage: handleNextPage,
      onPrevPage: handlePrevPage,
      onSubmit: handleSubmit
    }));
  }), /*#__PURE__*/React.createElement(_ScreenWrapper.default, {
    visible: endScreenvisible,
    isOnTop: endScreenvisible
  }, /*#__PURE__*/React.createElement(_EndScreen.default, {
    error: error,
    surveyFeedback: surveyFeedback
  }))), /*#__PURE__*/React.createElement(_reactNativeUi.ActivityIndicatorMask, {
    loading: loading
  }));
};

const SurveyStack = () => {
  const {
    survey,
    onClose
  } = (0, _survey.useSurveyContext)(); // check if survey data is valid

  if (noData(survey.pages) || noData(survey.surveyProperty) || noData(survey.surveyStartDate) || noData(survey.surveyEndDate)) {
    // need to render placeholder
    return /*#__PURE__*/React.createElement(_FakeScreen.default, {
      onClose: onClose
    }, /*#__PURE__*/React.createElement(_reactNativeUi.PlaceholderScreen, {
      imageType: _reactNativeUi.PlaceholderImageTypes.ProgramUnavailable,
      message: _reactNativeUi.i18n.t('start-survey:placeholder-message')
    }));
  }

  return /*#__PURE__*/React.createElement(Stack, {
    survey: survey
  });
};

var _default = SurveyStack;
exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  flexOne: {
    flex: 1
  }
});
//# sourceMappingURL=SurveyStack.js.map