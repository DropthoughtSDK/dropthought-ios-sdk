function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { View, TextInput, StyleSheet, Platform, Keyboard, UIManager, LayoutAnimation, findNodeHandle, ScrollView } from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
} // compute the offsets from keyboard End coordinate to frame's bottom


const computeOffset = (keyboardEvent, frameBottomY, show) => {
  let offset = 0;

  if (keyboardEvent && show && frameBottomY) {
    // the offset from keyboard coordinate to view's bottom Y coordinate
    const keyboardEndY = keyboardEvent.endCoordinates.screenY - Platform.select({
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
    LayoutAnimation.configureNext({
      // We have to pass the duration equal to minimal accepted duration defined here: RCTLayoutAnimation.m
      duration: Math.max(duration, 10),
      update: {
        duration: Math.max(duration, 10),
        type: Platform.OS === 'android' ? LayoutAnimation.Types.easeIn : LayoutAnimation.Types[easing]
      }
    });
  }
};

export const useKeyboardAvoidingFocusedInputView = (parentViewRef, extraAvoidingSpace = 0) => {
  const [bottomHeight, setBottomHeight] = React.useState(0);
  const keyboardChangeHandler = React.useCallback((event, show) => {
    // @ts-ignore
    const currentlyFocusedField = TextInput.State.currentlyFocusedInput ? // @ts-ignore
    findNodeHandle(TextInput.State.currentlyFocusedInput()) : TextInput.State.currentlyFocusedField(); // if there's no focused input or keyboard is not show or view is not existed

    if (!currentlyFocusedField || !show || !parentViewRef.current) {
      configureLayoutAnimation(event);
      setBottomHeight(0);
      return;
    } // here we want to check if the focused input is "within" this view
    // if it is not this view, do nothing (it could be a un-focused screen)
    // @ts-ignore


    UIManager.viewIsDescendantOf(currentlyFocusedField, findNodeHandle(parentViewRef.current), isDescendant => {
      if (isDescendant) {
        // measure the input's layout, compute the offset to the keyboard
        UIManager.measureInWindow(currentlyFocusedField, (_x, y, _width, height) => {
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

  React.useEffect(() => {
    // subscribe to these keyboard events
    let keyboardEvents = Platform.select({
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
      return Keyboard.addListener(eventInfo.name, event => keyboardChangeHandler(event, eventInfo.show));
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

const KeyboardAvoidingView = ({
  children,
  style,
  extraAvoidingSpace = 0,
  ...props
}) => {
  const viewRef = React.useRef(null);
  const {
    bottomHeight
  } = useKeyboardAvoidingFocusedInputView( // @ts-ignore
  viewRef, extraAvoidingSpace);

  if (Platform.OS === 'android') {
    return /*#__PURE__*/React.createElement(View, _extends({
      style: style
    }, props), children);
  }

  return /*#__PURE__*/React.createElement(View, _extends({
    ref: viewRef,
    style: style
  }, props), /*#__PURE__*/React.createElement(View, {
    style: StyleSheet.compose(styles.contentContainerStyle, {
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

  if (Platform.OS === 'android') {
    return /*#__PURE__*/React.createElement(ScrollView, _extends({
      style: style,
      contentContainerStyle: contentContainerStyle
    }, props, {
      ref: ref
    }), children);
  }

  return /*#__PURE__*/React.createElement(ScrollView, _extends({
    ref: ref,
    style: style,
    contentContainerStyle: StyleSheet.compose(contentContainerStyle, {
      bottom: bottomHeight
    })
  }, props), children);
};
/** @type {React.FunctionComponent<KeyboardAvoidingProps & ScrollViewProps>} */


export const KeyboardAvoidingScrollView = /*#__PURE__*/React.forwardRef( // @ts-ignore
KeyboardAvoidingScrollViewForwardRef);
const styles = StyleSheet.create({
  contentContainerStyle: {
    height: '100%'
  }
});
export default KeyboardAvoidingView;
/**
 * @typedef {object} KeyboardAvoidingProps
 * @property {ViewStyle} contentContainerStyle
 * @property {ViewStyle} style
 * @property {number=} extraAvoidingSpace - optional, the default behavior of this keyboard avoiding is to avoid the whole input box, but if you wish to have extra space to avoid
 */
//# sourceMappingURL=KeyboardAvoidingView.js.map