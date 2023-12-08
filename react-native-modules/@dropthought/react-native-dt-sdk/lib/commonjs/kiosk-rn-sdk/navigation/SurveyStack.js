"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ramda = require("ramda");
var _src = require("@dropthought/react-native-ui/src");
var _reactAsync = require("react-async");
var _customProps = require("../contexts/custom-props");
var _StartScreen = _interopRequireDefault(require("../screens/StartScreen"));
var _EndScreen = _interopRequireDefault(require("../screens/EndScreen"));
var _ErrorHintScreen = _interopRequireDefault(require("../screens/ErrorHintScreen"));
var _survey = require("../contexts/survey");
var _Feedback = require("../../lib/Feedback");
var _ScreenWrapper = _interopRequireDefault(require("./ScreenWrapper"));
var _Header = _interopRequireDefault(require("./Header"));
var _DateTimerParser = require("../../lib/DateTimerParser");
var _UploadPicture = require("../../lib/UploadPicture");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const noData = a => (0, _ramda.isNil)(a) || (0, _ramda.isEmpty)(a);
const Stack = ({
  preview
}) => {
  const {
    survey,
    onClose
  } = (0, _survey.useSurveyContext)();
  const themeColor = survey.surveyProperty.hexCode;
  const [visiblePageIds, setVisiblePageIds] = (0, _react.useState)([]);
  const [endScreenvisible, setEndScreenvisible] = (0, _react.useState)(false);
  const [surveyFeedback, setSurveyFeedback] = (0, _react.useState)(undefined);
  const [error, setError] = (0, _react.useState)();
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
  const handleNextPage = (0, _react.useCallback)(nextPageIndex => {
    if (nextPageIndex < survey.pageOrder.length) {
      setVisiblePageIds(prevPageIds => {
        const nextPageId = survey.pageOrder[nextPageIndex];
        return [...prevPageIds.filter(prevPageId => prevPageId !== nextPageId), nextPageId];
      });
    }
  }, [survey.pageOrder]);
  const handleStart = (0, _react.useCallback)(() => {
    handleNextPage(0);
  }, [handleNextPage]);
  const handlePrevPage = (0, _react.useCallback)(() => {
    setVisiblePageIds(prevPageIds => prevPageIds.slice(0, -1));
  }, []);
  const handleSubmit = (0, _react.useCallback)(feedback => {
    if (preview) {
      setEndScreenvisible(true);
    } else {
      const {
        timeZone
      } = _reactNative.NativeModules.DtSdk.getConstants();
      setSurveyFeedback(feedback);
      run({
        ...feedback,
        metadata,
        createdTime: (0, _DateTimerParser.fromJSToAPIDateStr)(Date.now()),
        timeZone
      });
    }
  }, [metadata, preview, run]);
  const [isUploading, setIsUploading] = (0, _react.useState)(false);
  const handleUpload = async file => {
    if (file) {
      setIsUploading(true);
      try {
        const {
          url
        } = await (0, _UploadPicture.uploadPicture)(file);
        setIsUploading(false);
        return url;
      } catch (reason) {
        setIsUploading(false);
        return reason;
      }
    } else {
      return undefined;
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.flexOne
  }, /*#__PURE__*/_react.default.createElement(_Header.default, {
    title: survey.surveyName,
    onClose: onClose,
    themeColor: themeColor
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.flexOne
  }, /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    visible: true,
    isOnTop: !endScreenvisible && visiblePageIds.length === 0,
    rtl: survey.language === 'ar'
  }, /*#__PURE__*/_react.default.createElement(_StartScreen.default, {
    onStart: handleStart,
    onClose: onClose
  })), survey.pageOrder.map((pageId, pageIndex) => {
    return /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
      key: pageId,
      visible: visiblePageIds.includes(pageId),
      isOnTop: visiblePageIds[visiblePageIds.length - 1] === pageId,
      rtl: survey.language === 'ar'
    }, /*#__PURE__*/_react.default.createElement(_src.SurveyScreenLayout, {
      survey: survey,
      pageIndex: pageIndex,
      onClose: onClose,
      onNextPage: handleNextPage,
      onPrevPage: handlePrevPage,
      onSubmit: handleSubmit,
      onUpload: handleUpload,
      isUploading: isUploading,
      preview: preview
    }));
  }), /*#__PURE__*/_react.default.createElement(_ScreenWrapper.default, {
    visible: endScreenvisible,
    isOnTop: endScreenvisible,
    rtl: survey.language === 'ar'
  }, /*#__PURE__*/_react.default.createElement(_EndScreen.default, {
    error: error,
    surveyFeedback: surveyFeedback,
    onClose: onClose
  }))), /*#__PURE__*/_react.default.createElement(_src.ActivityIndicatorMask, {
    loading: loading
  }));
};
const SurveyStack = ({
  preview
}) => {
  const {
    survey,
    onClose
  } = (0, _survey.useSurveyContext)();
  // check if survey data is valid
  if (noData(survey.pages) || noData(survey.surveyProperty) || noData(survey.surveyStartDate) || noData(survey.surveyEndDate)) {
    // need to render placeholder
    return /*#__PURE__*/_react.default.createElement(_ErrorHintScreen.default, {
      onClose: onClose
    }, /*#__PURE__*/_react.default.createElement(_src.PlaceholderScreen, {
      imageType: _src.PlaceholderImageTypes.ProgramUnavailable,
      message: _src.i18n.t('start-survey:placeholder-message')
    }));
  }
  return /*#__PURE__*/_react.default.createElement(Stack, {
    preview: preview
  });
};
var _default = exports.default = SurveyStack;
const styles = _reactNative.StyleSheet.create({
  flexOne: {
    flex: 1
  }
});
//# sourceMappingURL=SurveyStack.js.map