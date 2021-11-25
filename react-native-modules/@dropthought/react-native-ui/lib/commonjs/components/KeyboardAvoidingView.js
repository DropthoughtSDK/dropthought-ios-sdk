"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeyboardListener = exports.useKeyboardAvoidingFocusedInputView = exports.default = exports.KeyboardAvoidingScrollView = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _debounce = _interopRequireDefault(require("lodash/debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

if (_reactNative.Platform.OS === 'android') {
  if (_reactNative.UIManager.setLayoutAnimationEnabledExperimental) {
    _reactNative.UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const callAll = (...fns) => (...args) => fns.forEach(fn => typeof fn === 'function' && fn(...args));

const getKeyboardExtraHeight = () => {
  return _reactNative.Platform.select({
    // it looks that in android, it didn't consider the suggestion box of the keyboard
    android: 40,
    default: 0
  });
};

const useKeyboardListener = (keyboardChangeHandler = () => {}) => {
  // keyboard change effect
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
};

exports.useKeyboardListener = useKeyboardListener;

const getCurrentlyFocusedField = () => {
  return _reactNative.TextInput.State.currentlyFocusedInput ? (0, _reactNative.findNodeHandle)(_reactNative.TextInput.State.currentlyFocusedInput()) : _reactNative.TextInput.State.currentlyFocusedField();
};

const useKeyboardAvoidingFocusedInputView = (parentViewRef, extraAvoidingSpace = 0, insetBottom = 0) => {
  const parentViewLayoutRef = _react.default.useRef();

  const contentOffsetYRef = _react.default.useRef(0);

  const keyboardEndCoordinatesRef = _react.default.useRef();

  const isKeyboardShowingRef = _react.default.useRef(false);

  const [keyboardHeight, setKeyboardHeight] = _react.default.useState(0);

  const keyboardHeightHandler = _react.default.useCallback((event, show) => {
    keyboardEndCoordinatesRef.current = event.endCoordinates;
    isKeyboardShowingRef.current = show;
    setKeyboardHeight(show ? event.endCoordinates.height - (_reactNative.Platform.OS === 'android' ? 0 : insetBottom) + getKeyboardExtraHeight() : 0);
  }, [insetBottom]);

  useKeyboardListener(keyboardHeightHandler); // eslint-disable-next-line react-hooks/exhaustive-deps

  const updateOffset = _react.default.useCallback((0, _debounce.default)(() => {
    if (!parentViewRef.current) {
      return;
    }

    const currentlyFocusedField = getCurrentlyFocusedField();

    if (currentlyFocusedField) {
      // here we want to check if the focused input is "within" this view
      // if it is not this view, do nothing (it could be a un-focused screen)
      _reactNative.UIManager.viewIsDescendantOf(currentlyFocusedField, (0, _reactNative.findNodeHandle)(parentViewRef.current), isDescendant => {
        if (isDescendant) {
          // measure the input's layout, compute the offset to the keyboard
          _reactNative.UIManager.measureInWindow(currentlyFocusedField, (x, y, width, height) => {
            if (!parentViewLayoutRef.current || !keyboardEndCoordinatesRef.current) {
              return;
            }

            const screenHeight = keyboardEndCoordinatesRef.current.screenY + keyboardEndCoordinatesRef.current.height;
            const keyboardScreenY = keyboardEndCoordinatesRef.current.screenY - getKeyboardExtraHeight();
            const parentViewTopDistance = screenHeight - insetBottom - parentViewLayoutRef.current.height;
            const currentlyFocusedFieldBottomY = y + height + extraAvoidingSpace;
            const topIsCoverd = parentViewTopDistance > y;
            const bottomIsCoverd = currentlyFocusedFieldBottomY > keyboardScreenY; // can see the field completely

            if (!topIsCoverd && !bottomIsCoverd) {
              return;
            }

            const offset = currentlyFocusedFieldBottomY + contentOffsetYRef.current - keyboardScreenY;

            if (offset >= 0) {
              parentViewRef.current.scrollTo({
                x: 0,
                y: offset,
                animated: true
              });
            }
          });
        }
      });
    }
  }, 100), [extraAvoidingSpace, insetBottom, parentViewRef]);

  const handleKeyboardChange = _react.default.useCallback((event, show) => {
    if (isKeyboardShowingRef.current) {
      updateOffset(event);
    }
  }, [updateOffset]);

  useKeyboardListener(handleKeyboardChange);

  const handleScrollViewContentSizeChange = (contentWidth, contentHeight) => {
    if (isKeyboardShowingRef.current) {
      updateOffset();
    }
  };

  const handleScrollViewScroll = event => {
    contentOffsetYRef.current = Math.max(event.nativeEvent.contentOffset.y, 0);
  };

  const handleScrollViewLayout = event => {
    parentViewLayoutRef.current = event.nativeEvent.layout;
  };

  return {
    keyboardHeight,
    handleScrollViewLayout,
    handleScrollViewContentSizeChange,
    handleScrollViewScroll
  };
};
/**
 * @type {React.FunctionComponent<KeyboardAvoidingProps & ViewProps>}
 * @param {KeyboardAvoidingProps & ViewProps} param0
 */


exports.useKeyboardAvoidingFocusedInputView = useKeyboardAvoidingFocusedInputView;

const KeyboardAvoidingView = ({
  children,
  style,
  contentContainerStyle,
  extraAvoidingSpace = 0,
  ...props
}) => {
  const viewRef = _react.default.useRef();

  const {
    keyboardHeight
  } = useKeyboardAvoidingFocusedInputView(viewRef, extraAvoidingSpace);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    ref: viewRef,
    style: style
  }, props), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.compose(styles.contentContainerStyle, {
      bottom: keyboardHeight
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
  onLayout,
  onContentSizeChange,
  onScroll,
  insetBottom,
  ...props
}, ref) => {
  var _contentContainerStyl;

  const scrollRef = _react.default.useRef(null);

  const {
    keyboardHeight,
    handleScrollViewLayout,
    handleScrollViewContentSizeChange,
    handleScrollViewScroll
  } = useKeyboardAvoidingFocusedInputView(scrollRef, extraAvoidingSpace, insetBottom);
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, _extends({
    ref: node => {
      scrollRef.current = node;

      if (ref && ref.hasOwnProperty('current')) {
        ref.current = node;
      } else if (typeof ref === 'function') {
        ref(node);
      }
    },
    style: _reactNative.StyleSheet.compose(style, {
      flex: 1
    }),
    contentContainerStyle: _reactNative.StyleSheet.compose(contentContainerStyle, {
      paddingBottom: ((_contentContainerStyl = contentContainerStyle === null || contentContainerStyle === void 0 ? void 0 : contentContainerStyle.paddingBottom) !== null && _contentContainerStyl !== void 0 ? _contentContainerStyl : 0) + keyboardHeight
    }),
    onLayout: callAll(onLayout, handleScrollViewLayout),
    onContentSizeChange: callAll(onContentSizeChange, handleScrollViewContentSizeChange),
    onScroll: callAll(onScroll, handleScrollViewScroll)
  }, props, {
    scrollEventThrottle: 16
  }), children);
};
/** @type {React.FunctionComponent<KeyboardAvoidingProps & ScrollViewProps>} */


const KeyboardAvoidingScrollView = /*#__PURE__*/_react.default.forwardRef(KeyboardAvoidingScrollViewForwardRef);

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

/**
 * @typedef {import('react-native').StyleProp<import('react-native').ViewStyle>} ViewStyle
 * @typedef {import('react-native').ViewProps} ViewProps
 * @typedef {import('react-native').ScrollViewProps} ScrollViewProps
 */

exports.default = _default;
//# sourceMappingURL=KeyboardAvoidingView.js.map