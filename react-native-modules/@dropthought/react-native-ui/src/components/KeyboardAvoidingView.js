import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
  UIManager,
  findNodeHandle,
  ScrollView,
} from 'react-native';
import debounce from 'lodash/debounce';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => typeof fn === 'function' && fn(...args));

const getKeyboardExtraHeight = () => {
  return Platform.select({
    // it looks that in android, it didn't consider the suggestion box of the keyboard
    android: 40,
    default: 0,
  });
};

export const useKeyboardListener = (keyboardChangeHandler = () => {}) => {
  // keyboard change effect
  React.useEffect(() => {
    // subscribe to these keyboard events
    let keyboardEvents = Platform.select({
      default: [
        { name: 'keyboardWillShow', show: true },
        { name: 'keyboardWillHide', show: false },
      ],
      android: [
        { name: 'keyboardDidShow', show: true },
        { name: 'keyboardDidHide', show: false },
      ],
    });

    let subscriptions = keyboardEvents.map((eventInfo) => {
      return Keyboard.addListener(eventInfo.name, (event) =>
        keyboardChangeHandler(event, eventInfo.show)
      );
    });

    return function cleanup() {
      subscriptions.forEach((subscription) => {
        subscription?.remove();
      });
    };
  }, [keyboardChangeHandler]);
};

const getCurrentlyFocusedField = () => {
  return TextInput.State.currentlyFocusedInput
    ? findNodeHandle(TextInput.State.currentlyFocusedInput())
    : TextInput.State.currentlyFocusedField();
};

export const useKeyboardAvoidingFocusedInputView = (
  parentViewRef,
  extraAvoidingSpace = 0,
  insetBottom = 0
) => {
  const parentViewLayoutRef = React.useRef();
  const contentOffsetYRef = React.useRef(0);
  const keyboardEndCoordinatesRef = React.useRef();
  const isKeyboardShowingRef = React.useRef(false);

  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const keyboardHeightHandler = React.useCallback(
    (event, show) => {
      keyboardEndCoordinatesRef.current = event.endCoordinates;
      isKeyboardShowingRef.current = show;
      setKeyboardHeight(
        show
          ? event.endCoordinates.height -
              (Platform.OS === 'android' ? 0 : insetBottom) +
              getKeyboardExtraHeight()
          : 0
      );
    },
    [insetBottom]
  );
  useKeyboardListener(keyboardHeightHandler);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateOffset = React.useCallback(
    debounce(() => {
      if (!parentViewRef.current) {
        return;
      }
      const currentlyFocusedField = getCurrentlyFocusedField();
      if (currentlyFocusedField) {
        // here we want to check if the focused input is "within" this view
        // if it is not this view, do nothing (it could be a un-focused screen)
        UIManager.viewIsDescendantOf(
          currentlyFocusedField,
          findNodeHandle(parentViewRef.current),
          (isDescendant) => {
            if (isDescendant) {
              // measure the input's layout, compute the offset to the keyboard
              UIManager.measureInWindow(
                currentlyFocusedField,
                (x, y, width, height) => {
                  if (
                    !parentViewLayoutRef.current ||
                    !keyboardEndCoordinatesRef.current
                  ) {
                    return;
                  }
                  const screenHeight =
                    keyboardEndCoordinatesRef.current.screenY +
                    keyboardEndCoordinatesRef.current.height;
                  const keyboardScreenY =
                    keyboardEndCoordinatesRef.current.screenY -
                    getKeyboardExtraHeight();
                  const parentViewTopDistance =
                    screenHeight -
                    insetBottom -
                    parentViewLayoutRef.current.height;
                  const currentlyFocusedFieldBottomY =
                    y + height + extraAvoidingSpace;
                  const topIsCoverd = parentViewTopDistance > y;
                  const bottomIsCoverd =
                    currentlyFocusedFieldBottomY > keyboardScreenY;
                  // can see the field completely
                  if (!topIsCoverd && !bottomIsCoverd) {
                    return;
                  }
                  const offset =
                    currentlyFocusedFieldBottomY +
                    contentOffsetYRef.current -
                    keyboardScreenY;
                  if (offset >= 0) {
                    parentViewRef.current.scrollTo({
                      x: 0,
                      y: offset,
                      animated: true,
                    });
                  }
                }
              );
            }
          }
        );
      }
    }, 100),
    [extraAvoidingSpace, insetBottom, parentViewRef]
  );

  const handleKeyboardChange = React.useCallback(
    (event, show) => {
      if (isKeyboardShowingRef.current) {
        updateOffset(event);
      }
    },
    [updateOffset]
  );
  useKeyboardListener(handleKeyboardChange);

  const handleScrollViewContentSizeChange = (contentWidth, contentHeight) => {
    if (isKeyboardShowingRef.current) {
      updateOffset();
    }
  };

  const handleScrollViewScroll = (event) => {
    contentOffsetYRef.current = Math.max(event.nativeEvent.contentOffset.y, 0);
  };

  const handleScrollViewLayout = (event) => {
    parentViewLayoutRef.current = event.nativeEvent.layout;
  };

  return {
    keyboardHeight,
    handleScrollViewLayout,
    handleScrollViewContentSizeChange,
    handleScrollViewScroll,
  };
};

/**
 * @type {React.FunctionComponent<KeyboardAvoidingProps & ViewProps>}
 * @param {KeyboardAvoidingProps & ViewProps} param0
 */
const KeyboardAvoidingView = ({
  children,
  style,
  contentContainerStyle,
  extraAvoidingSpace = 0,
  ...props
}) => {
  const viewRef = React.useRef();
  const { keyboardHeight } = useKeyboardAvoidingFocusedInputView(
    viewRef,
    extraAvoidingSpace
  );

  return (
    <View ref={viewRef} style={style} {...props}>
      <View
        style={StyleSheet.compose(styles.contentContainerStyle, {
          bottom: keyboardHeight,
        })}
      >
        {children}
      </View>
    </View>
  );
};

/**
 * @param {KeyboardAvoidingProps & ScrollViewProps} param0
 * @param {*} ref
 */
const KeyboardAvoidingScrollViewForwardRef = (
  {
    children,
    style,
    contentContainerStyle,
    extraAvoidingSpace = 0,
    onLayout,
    onContentSizeChange,
    onScroll,
    insetBottom,
    ...props
  },
  ref
) => {
  const scrollRef = React.useRef(null);

  const {
    keyboardHeight,
    handleScrollViewLayout,
    handleScrollViewContentSizeChange,
    handleScrollViewScroll,
  } = useKeyboardAvoidingFocusedInputView(
    scrollRef,
    extraAvoidingSpace,
    insetBottom
  );

  return (
    <ScrollView
      ref={(node) => {
        scrollRef.current = node;
        if (ref && ref.hasOwnProperty('current')) {
          ref.current = node;
        } else if (typeof ref === 'function') {
          ref(node);
        }
      }}
      style={StyleSheet.compose(style, {
        flex: 1,
      })}
      contentContainerStyle={StyleSheet.compose(contentContainerStyle, {
        paddingBottom:
          (contentContainerStyle?.paddingBottom ?? 0) + keyboardHeight,
      })}
      onLayout={callAll(onLayout, handleScrollViewLayout)}
      onContentSizeChange={callAll(
        onContentSizeChange,
        handleScrollViewContentSizeChange
      )}
      onScroll={callAll(onScroll, handleScrollViewScroll)}
      {...props}
      scrollEventThrottle={16}
    >
      {children}
    </ScrollView>
  );
};

/** @type {React.FunctionComponent<KeyboardAvoidingProps & ScrollViewProps>} */
export const KeyboardAvoidingScrollView = React.forwardRef(
  KeyboardAvoidingScrollViewForwardRef
);

const styles = StyleSheet.create({
  contentContainerStyle: {
    height: '100%',
  },
});

export default KeyboardAvoidingView;

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
