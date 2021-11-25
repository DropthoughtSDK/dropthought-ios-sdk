"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestionContentTextSize = exports.GlobalStyle = void 0;

var _reactNative = require("react-native");

var _Colors = require("./Colors");

var _useWindowDimensions = require("../hooks/useWindowDimensions");

const QuestionContentTextSize = _reactNative.StyleSheet.create({
  [_useWindowDimensions.DimensionWidthType.phone]: {
    fontSize: 17
  },
  [_useWindowDimensions.DimensionWidthType.tablet]: {
    fontSize: 15
  }
});

exports.QuestionContentTextSize = QuestionContentTextSize;

const GlobalStyle = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: _Colors.Colors.white,
    flex: 1,
    justifyContent: 'center'
  },
  dialog: {
    backgroundColor: _Colors.Colors.white,
    borderRadius: 5,
    paddingBottom: 30,
    paddingLeft: 46,
    paddingRight: 46,
    paddingTop: 40
  },
  dialogButton: {
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 5
  },
  dialogDescription: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20
  },
  dialogLeftButtonDescription: {
    color: _Colors.Colors.purple,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center'
  },
  dialogPrimaryButton: {
    backgroundColor: _Colors.Colors.purple
  },
  dialogRightButtonDescription: {
    color: _Colors.Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center'
  },
  flex1: {
    flex: 1
  },
  flexEnd: {
    justifyContent: 'flex-end'
  },
  flexRowReverse: {
    flexDirection: 'row-reverse'
  },
  horizontalFlip: {
    transform: [{
      rotateY: '180deg'
    }]
  },
  null: {},
  // used in OpenQuestion, SliderRatingQuestion, ...the survey question component
  questionContainer: {
    fontSize: 18,
    marginTop: 45
  },
  textAlignLeft: {
    textAlign: 'left'
  },
  textAlignRight: {
    textAlign: 'right'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fullCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingMask: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _Colors.Colors.loadingMaskBG,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
});

exports.GlobalStyle = GlobalStyle;
//# sourceMappingURL=GlobalStyle.js.map