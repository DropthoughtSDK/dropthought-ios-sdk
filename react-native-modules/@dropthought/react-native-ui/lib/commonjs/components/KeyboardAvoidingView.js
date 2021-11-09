"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeyboardAvoidingFocusedInputView = exports.default = exports.KeyboardAvoidingScrollView = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

if (_reactNative.Platform.OS === 'android') {
  if (_reactNative.UIManager.setLayoutAnimationEnabledExperimental) {
    _reactNative.UIManager.setLayoutAnimationEnabledExperimental(true);
  }
} // compute the offsets from keyboard End coordinate to frame's bottom


const computeOffset = (keyboardEvent, frameBottomY, show) => {
  let offset = 0;

  if (keyboardEvent && show && frameBottomY) {
    // the offset from keyboard coordinate to view's bottom Y coordinate
    const keyboardEndY = keyboardEvent.endCoordinates.screenY - _reactNative.Platform.select({
      // it looks that in android, it didn't consider the the suggestion box of the keyboard
      android: 40,
      default: 0
    }); // only consider the negative


    offset = Math.min(keyboardEndY - frameBottomY, 0);
  }

  return offset;
};

const configureLayoutAnimation = keyboardEvent => {
  const {
    duration = 0,
    easing
  } = keyboardEvent;

  if (easing) {
    _reactNative.LayoutAnimation.configureNext({
      // We have to pass the duration equal to minimal accepted duration defined here: RCTLayoutAnimation.m
      duration: Math.max(duration, 10),
      update: {
        duration: Math.max(duration, 10),
        type: _reactNative.Platform.OS === 'android' ? _reactNative.LayoutAnimation.Types.easeIn : _reactNative.LayoutAnimation.Types[easing]
      }
    });
  }
};

const useKeyboardAvoidingFocusedInputView = (parentViewRef, extraAvoidingSpace = 0) => {
  const [bottomHeight, setBottomHeight] = _react.default.useState(0);

  const keyboardChangeHandler = _react.default.useCallback((event, show) => {
    // @ts-ignore
    const currentlyFocusedField = _reactNative.TextInput.State.currentlyFocusedInput ? // @ts-ignore
    (0, _reactNative.findNodeHandle)(_reactNative.TextInput.State.currentlyFocusedInput()) : _reactNative.TextInput.State.currentlyFocusedField(); // if there's no focused input or keyboard is not show or view is not existed

    if (!currentlyFocusedField || !show || !parentViewRef.current) {
      configureLayoutAnimation(event);
      setBottomHeight(0);
      return;
    } // here we want to check if the focused input is "within" this view
    // if it is not this view, do nothing (it could be a un-focused screen)
    // @ts-ignore


    _reactNative.UIManager.viewIsDescendantOf(currentlyFocusedField, (0, _reactNative.findNodeHandle)(parentViewRef.current), isDescendant => {
      if (isDescendant) {
        // measure the input's layout, compute the offset to the keyboard
        _reactNative.UIManager.measureInWindow(currentlyFocusedField, (_x, y, _width, height) => {
          const currentlyFocusedFieldBottomY = y + height + extraAvoidingSpace;
          const offset = computeOffset(event, currentlyFocusedFieldBottomY, show); // if the offset is smaller than 0, it means it is below the keyboard

          if (offset < 0) {
            configureLayoutAnimation(event);
            setBottomHeight(0 - offset);
          }
        });
      }
    });
  }, [parentViewRef, extraAvoidingSpace]); // keyboard change effect


  _react.default.useEffect(() => {
    // subscribe to these keyboard events
    let keyboardEvents = _reactNative.Platform.select({
      default: [{
        name: 'keyboardWillShow',
        show: true
      }, {
        name: 'keyboardWillHide',
        show: false
      }],
      android: [{
        name: 'keyboardDidShow',
        show: true
      }, {
        name: 'keyboardDidHide',
        show: false
      }]
    });

    let subscriptions = keyboardEvents.map(eventInfo => {
      return _reactNative.Keyboard.addListener(eventInfo.name, event => keyboardChangeHandler(event, eventInfo.show));
    });
    return function cleanup() {
      subscriptions.forEach(subscription => {
        subscription.remove();
      });
    };
  }, [keyboardChangeHandler]);

  return {
    bottomHeight
  };
};

exports.useKeyboardAvoidingFocusedInputView = useKeyboardAvoidingFocusedInputView;

const KeyboardAvoidingView = ({
  children,
  style,
  extraAvoidingSpace = 0,
  ...props
}) => {
  const viewRef = _react.default.useRef(null);

  const {
    bottomHeight
  } = useKeyboardAvoidingFocusedInputView( // @ts-ignore
  viewRef, extraAvoidingSpace);

  if (_reactNative.Platform.OS === 'android') {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
      style: style
    }, props), children);
  }

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    ref: viewRef,
    style: style
  }, props), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.compose(styles.contentContainerStyle, {
      // @ts-ignore
      bottom: bottomHeight
    })
  }, children));
};
/**
 * @param {KeyboardAvoidingProps & ScrollViewProps} param0
 * @param {*} ref
 */


const KeyboardAvoidingScrollViewForwardRef = ({
  children,
  style,
  contentContainerStyle,
  extraAvoidingSpace = 0,
  ...props
}, ref) => {
  const {
    bottomHeight
  } = useKeyboardAvoidingFocusedInputView(ref, extraAvoidingSpace);

  if (_reactNative.Platform.OS === 'android') {
    return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, _extends({
      style: style,
      contentContainerStyle: contentContainerStyle
    }, props, {
      ref: ref
    }), children);
  }

  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, _extends({
    ref: ref,
    style: style,
    contentContainerStyle: _reactNative.StyleSheet.compose(contentContainerStyle, {
      bottom: bottomHeight
    })
  }, props), children);
};
/** @type {React.FunctionComponent<KeyboardAvoidingProps & ScrollViewProps>} */


const KeyboardAvoidingScrollView = /*#__PURE__*/_react.default.forwardRef( // @ts-ignore
KeyboardAvoidingScrollViewForwardRef);

exports.KeyboardAvoidingScrollView = KeyboardAvoidingScrollView;

const styles = _reactNative.StyleSheet.create({
  contentContainerStyle: {
    height: '100%'
  }
});

var _default = KeyboardAvoidingView;
/**
 * @typedef {object} KeyboardAvoidingProps
 * @property {ViewStyle} contentContainerStyle
 * @property {ViewStyle} style
 * @property {number=} extraAvoidingSpace - optional, the default behavior of this keyboard avoiding is to avoid the whole input box, but if you wish to have extra space to avoid
 */

exports.default = _default;
//# sourceMappingURL=KeyboardAvoidingView.js.map