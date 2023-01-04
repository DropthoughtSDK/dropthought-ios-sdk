"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _Button = _interopRequireDefault(require("../components/Button"));

var _styles = require("../styles");

var _translation = _interopRequireDefault(require("../translation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @description a extension UI/UX component of SurveyScreenLayout
 * it displays three buttons:
 *  - Back, displayed when page is > 0
 *  - Next, displayed when page is not end
 *  - Submit, displayed when page is the last page
 * When "Back" is pressed, call props.onPrevPage
 * When "Next" or "Submit" is pressed, call props.onNextPage
 */
const DummyButton = ({
  width
}) => /*#__PURE__*/React.createElement(_reactNative.View, {
  style: {
    width
  }
});

const ClassicSurveyFooter = props => {
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const rtl = _translation.default.dir() === 'rtl';
  const {
    survey,
    pageIndex = 0,
    onPrevPage,
    onNextPage
  } = props;
  const lastPage = pageIndex === survey.pageOrder.length - 1; // why use a dummy button here? we use 'space-between' to layout the buttons

  let LeftButtonComponent = _Button.default;

  if (!pageIndex || pageIndex <= 0) {
    // @ts-ignore
    LeftButtonComponent = DummyButton;
  }

  const themeColor = props.survey.surveyProperty.hexCode;
  const btnWidth = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone ? 76 : 100;
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, rtl && _styles.GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(LeftButtonComponent, {
    width: btnWidth,
    title: _translation.default.t('survey:survey-back'),
    color: themeColor,
    onPress: onPrevPage // @ts-ignore
    ,
    containerStyle: styles.leftBtnContainer
  }), lastPage ? /*#__PURE__*/React.createElement(_Button.default, {
    disabled: submitDisabled,
    width: btnWidth,
    title: _translation.default.t('survey:survey-submit'),
    color: themeColor,
    onPress: () => {
      setSubmitDisabled(true);
      onNextPage();
    } // @ts-ignore
    ,
    containerStyle: styles.rightBtnContainer
  }) : /*#__PURE__*/React.createElement(_Button.default, {
    width: btnWidth,
    title: _translation.default.t('survey:survey-next'),
    color: themeColor,
    onPress: onNextPage // @ts-ignore
    ,
    containerStyle: styles.rightBtnContainer
  }));
};

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    ..._styles.GlobalStyle.row,
    justifyContent: 'space-between',
    marginVertical: 30
  }
});

var _default = /*#__PURE__*/React.memo(ClassicSurveyFooter);

exports.default = _default;
//# sourceMappingURL=ClassicSurveyFooter.js.map