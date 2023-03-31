"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SliderContainer = exports.Slider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = require("./styles");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Rect = ({
  height,
  width,
  x,
  y
}) => ({
  containsPoint: (nativeX, nativeY) => nativeX >= x && nativeY >= y && nativeX <= x + width && nativeY <= y + height,
  height,
  trackDistanceToPoint: nativeX => {
    if (nativeX < x) {
      return x - nativeX;
    }

    if (nativeX > x + width) {
      return nativeX - (x + width);
    }

    return 0;
  },
  width,
  x,
  y
});

const DEFAULT_ANIMATION_CONFIGS = {
  spring: {
    friction: 7,
    tension: 100
  },
  timing: {
    duration: 150,
    easing: _reactNative.Easing.inOut(_reactNative.Easing.ease),
    delay: 0
  }
};

const normalizeValue = (props, value) => {
  if (!value || Array.isArray(value) && value.length === 0) {
    return [0];
  }

  const {
    maximumValue,
    minimumValue
  } = props;

  const getBetweenValue = inputValue => Math.max(Math.min(inputValue, maximumValue), minimumValue);

  if (!Array.isArray(value)) {
    return [getBetweenValue(value)];
  }

  return value.map(getBetweenValue).sort((a, b) => a - b);
};

const updateValues = ({
  values,
  newValues = values
}) => {
  if (Array.isArray(newValues) && Array.isArray(values) && newValues.length !== values.length) {
    return updateValues({
      values: newValues
    });
  }

  if (Array.isArray(values) && Array.isArray(newValues)) {
    return values === null || values === void 0 ? void 0 : values.map((value, index) => {
      let valueToSet = newValues[index];

      if (value instanceof _reactNative.Animated.Value) {
        if (valueToSet instanceof _reactNative.Animated.Value) {
          //@ts-ignore
          valueToSet = valueToSet.__getValue();
        } //@ts-ignore


        value.setValue(valueToSet);
        return value;
      }

      if (valueToSet instanceof _reactNative.Animated.Value) {
        return valueToSet;
      }

      return new _reactNative.Animated.Value(valueToSet);
    });
  }

  return [new _reactNative.Animated.Value(0)];
};

const indexOfLowest = values => {
  let lowestIndex = 0;
  values.forEach((value, index, array) => {
    if (value < array[lowestIndex]) {
      lowestIndex = index;
    }
  });
  return lowestIndex;
};

class Slider extends _react.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_handleStartShouldSetPanResponder", e => this._thumbHitTest(e));

    _defineProperty(this, "_handlePanResponderGrant", e => {
      var _this$props, _this$props$onSliding;

      const {
        thumbSize
      } = this.state;
      const {
        nativeEvent
      } = e;
      this._previousLeft = this.props.trackClickable ? nativeEvent.locationX - thumbSize.width : this._getThumbLeft(this._getCurrentValue(this._activeThumbIndex));
      (_this$props = this.props) === null || _this$props === void 0 ? void 0 : (_this$props$onSliding = _this$props.onSlidingStart) === null || _this$props$onSliding === void 0 ? void 0 : _this$props$onSliding.call(_this$props, this._getRawValues(this.state.values));
    });

    _defineProperty(this, "_handlePanResponderMove", (_e, gestureState) => {
      if (this.props.disabled) {
        return;
      }

      this._setCurrentValue(this._getValue(gestureState), this._activeThumbIndex, () => {
        var _this$props2, _this$props2$onValueC;

        (_this$props2 = this.props) === null || _this$props2 === void 0 ? void 0 : (_this$props2$onValueC = _this$props2.onValueChange) === null || _this$props2$onValueC === void 0 ? void 0 : _this$props2$onValueC.call(_this$props2, this._getRawValues(this.state.values));
      });
    });

    _defineProperty(this, "_handlePanResponderRequestEnd", () =>
    /* e, gestureState: GestureState */
    {
      // Should we allow another component to take over this pan?
      return false;
    });

    _defineProperty(this, "_handlePanResponderEnd", (_e, gestureState) => {
      if (this.props.disabled) {
        return;
      }

      this._setCurrentValue(this._getValue(gestureState), this._activeThumbIndex, () => {
        var _this$props4, _this$props4$onSlidin;

        if (this.props.trackClickable) {
          var _this$props3, _this$props3$onValueC;

          (_this$props3 = this.props) === null || _this$props3 === void 0 ? void 0 : (_this$props3$onValueC = _this$props3.onValueChange) === null || _this$props3$onValueC === void 0 ? void 0 : _this$props3$onValueC.call(_this$props3, this._getRawValues(this.state.values));
        }

        (_this$props4 = this.props) === null || _this$props4 === void 0 ? void 0 : (_this$props4$onSlidin = _this$props4.onSlidingComplete) === null || _this$props4$onSlidin === void 0 ? void 0 : _this$props4$onSlidin.call(_this$props4, this._getRawValues(this.state.values));
      });

      this._activeThumbIndex = 0;
    });

    _defineProperty(this, "_measureContainer", e => {
      this._handleMeasure('_containerSize', e);
    });

    _defineProperty(this, "_measureTrack", e => {
      this._handleMeasure('_trackSize', e);
    });

    _defineProperty(this, "_measureThumb", e => {
      this._handleMeasure('_thumbSize', e);
    });

    _defineProperty(this, "_handleMeasure", (name, e) => {
      const {
        width,
        height
      } = e.nativeEvent.layout;
      const size = {
        width,
        height
      };
      const currentSize = this[name];

      if (currentSize && width === currentSize.width && height === currentSize.height) {
        return;
      }

      this[name] = size;

      if (this._containerSize && this._thumbSize) {
        this.setState({
          containerSize: this._containerSize,
          thumbSize: this._thumbSize,
          allMeasured: true
        });
      }
    });

    _defineProperty(this, "_getRatio", value => {
      const {
        maximumValue,
        minimumValue
      } = this.props;
      return (value - minimumValue) / (maximumValue - minimumValue);
    });

    _defineProperty(this, "_getThumbLeft", value => {
      const {
        containerSize,
        thumbSize
      } = this.state;
      const {
        vertical
      } = this.props;

      const standardRatio = this._getRatio(value);

      const ratio = _reactNative.I18nManager.isRTL ? 1 - standardRatio : standardRatio;
      return ratio * ((vertical ? containerSize.height : containerSize.width) - thumbSize.width);
    });

    _defineProperty(this, "_getValue", gestureState => {
      const {
        containerSize,
        thumbSize,
        values
      } = this.state;
      const {
        maximumValue,
        minimumValue,
        step,
        vertical
      } = this.props;
      const length = containerSize.width - thumbSize.width;
      const thumbLeft = vertical ? this._previousLeft + gestureState.dy * -1 : this._previousLeft + gestureState.dx;
      const nonRtlRatio = thumbLeft / length;
      const ratio = _reactNative.I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;
      let minValue = minimumValue;
      let maxValue = maximumValue;

      const rawValues = this._getRawValues(values);

      const buffer = step ? step : 0.1;

      if (values.length === 2) {
        if (this._activeThumbIndex === 1) {
          minValue = rawValues[0] + buffer;
        } else {
          maxValue = rawValues[1] - buffer;
        }
      }

      if (step) {
        return Math.max(minValue, Math.min(maxValue, minimumValue + Math.round(ratio * (maximumValue - minimumValue) / step) * step));
      }

      return Math.max(minValue, Math.min(maxValue, ratio * (maximumValue - minimumValue) + minimumValue));
    });

    _defineProperty(this, "_getCurrentValue", (thumbIndex = 0) => //@ts-ignore
    this.state.values[thumbIndex].__getValue());

    _defineProperty(this, "_setCurrentValue", (value, thumbIndex, callback) => {
      const safeIndex = thumbIndex !== null && thumbIndex !== void 0 ? thumbIndex : 0;
      const animatedValue = this.state.values[safeIndex];

      if (animatedValue) {
        animatedValue.setValue(value);

        if (callback) {
          callback();
        }
      } else {
        this.setState(prevState => {
          const newValues = [...prevState.values];
          newValues[safeIndex] = new _reactNative.Animated.Value(value);
          return {
            values: newValues
          };
        }, callback);
      }
    });

    _defineProperty(this, "_setCurrentValueAnimated", (value, thumbIndex = 0) => {
      const {
        animationType
      } = this.props;
      const animationConfig = { ...DEFAULT_ANIMATION_CONFIGS[animationType],
        ...this.props.animationConfig,
        toValue: value,
        useNativeDriver: false
      };

      _reactNative.Animated[animationType](this.state.values[thumbIndex], animationConfig).start();
    });

    _defineProperty(this, "_getTouchOverflowSize", () => {
      const {
        allMeasured,
        containerSize,
        thumbSize
      } = this.state;
      const {
        thumbTouchSize
      } = this.props;
      const size = {
        width: 40,
        height: 40
      };

      if (allMeasured) {
        size.width = Math.max(0, (thumbTouchSize === null || thumbTouchSize === void 0 ? void 0 : thumbTouchSize.width) || 0 - thumbSize.width);
        size.height = Math.max(0, (thumbTouchSize === null || thumbTouchSize === void 0 ? void 0 : thumbTouchSize.height) || 0 - containerSize.height);
      }

      return size;
    });

    _defineProperty(this, "_getTouchOverflowStyle", () => {
      const {
        width,
        height
      } = this._getTouchOverflowSize();

      const touchOverflowStyle = {};

      if (width !== undefined && height !== undefined) {
        const verticalMargin = -height / 2;
        touchOverflowStyle.marginTop = verticalMargin;
        touchOverflowStyle.marginBottom = verticalMargin;
        const horizontalMargin = -width / 2;
        touchOverflowStyle.marginLeft = horizontalMargin;
        touchOverflowStyle.marginRight = horizontalMargin;
      }

      if (this.props.debugTouchArea === true) {
        touchOverflowStyle.backgroundColor = 'orange';
        touchOverflowStyle.opacity = 0.5;
      }

      return touchOverflowStyle;
    });

    _defineProperty(this, "_thumbHitTest", e => {
      const {
        nativeEvent
      } = e;
      const {
        trackClickable
      } = this.props;
      const {
        values
      } = this.state;
      const hitThumb = values.find((_, i) => {
        const thumbTouchRect = this._getThumbTouchRect(i);

        const containsPoint = thumbTouchRect.containsPoint(nativeEvent.locationX, nativeEvent.locationY);

        if (containsPoint) {
          this._activeThumbIndex = i;
        }

        return containsPoint;
      });

      if (hitThumb) {
        return true;
      }

      if (trackClickable) {
        // set the active thumb index
        if (values.length === 1) {
          this._activeThumbIndex = 0;
        } else {
          // we will find the closest thumb and that will be the active thumb
          const thumbDistances = values.map((_value, index) => {
            const thumbTouchRect = this._getThumbTouchRect(index);

            return thumbTouchRect.trackDistanceToPoint(nativeEvent.locationX);
          });
          this._activeThumbIndex = indexOfLowest(thumbDistances);
        }

        return true;
      }

      return false;
    });

    _defineProperty(this, "_getThumbTouchRect", (thumbIndex = 0) => {
      const {
        containerSize,
        thumbSize
      } = this.state;
      const {
        thumbTouchSize
      } = this.props;
      const {
        height,
        width
      } = thumbTouchSize || {
        height: 40,
        width: 40
      };

      const touchOverflowSize = this._getTouchOverflowSize();

      return Rect({
        height,
        width,
        x: touchOverflowSize.width / 2 + this._getThumbLeft(this._getCurrentValue(thumbIndex)) + (thumbSize.width - width) / 2,
        y: touchOverflowSize.height / 2 + (containerSize.height - height) / 2
      });
    });

    _defineProperty(this, "_activeThumbIndex", 0);

    _defineProperty(this, "_containerSize", void 0);

    _defineProperty(this, "_panResponder", void 0);

    _defineProperty(this, "_previousLeft", 0);

    _defineProperty(this, "_thumbSize", void 0);

    _defineProperty(this, "_trackSize", void 0);

    _defineProperty(this, "_renderDebugThumbTouchRect", (thumbLeft, index) => {
      const {
        height,
        y,
        width
      } = this._getThumbTouchRect() || {};
      const positionStyle = {
        height,
        left: thumbLeft,
        top: y,
        width
      };
      return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
        key: `debug-thumb-${index}`,
        pointerEvents: "none",
        style: [_styles.defaultStyles.debugThumbTouchArea, positionStyle]
      });
    });

    _defineProperty(this, "_renderThumbImage", (thumbIndex = 0) => {
      const {
        thumbImage
      } = this.props;

      if (!thumbImage) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: Array.isArray(thumbImage) ? thumbImage[thumbIndex] : thumbImage
      });
    });

    this._panResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
      onPanResponderTerminate: this._handlePanResponderEnd
    });
    this.state = {
      allMeasured: false,
      containerSize: {
        width: 0,
        height: 0
      },
      thumbSize: {
        width: 0,
        height: 0
      },
      trackMarksValues: updateValues({
        values: normalizeValue(this.props, this.props.trackMarks)
      }),
      values: updateValues({
        values: normalizeValue(this.props, this.props.value instanceof _reactNative.Animated.Value ? //@ts-ignore
        this.props.value.__getValue() : this.props.value)
      })
    };
  }

  //@ts-ignore
  static getDerivedStateFromProps(props, state) {
    if (props.trackMarks && !!state.trackMarksValues && state.trackMarksValues.length > 0) {
      const newTrackMarkValues = normalizeValue(props, props.trackMarks);
      const statePatch = {};

      if (state.trackMarksValues) {
        statePatch.trackMarksValues = updateValues({
          values: state.trackMarksValues,
          newValues: newTrackMarkValues
        });
      }

      return statePatch;
    }
  }

  componentDidUpdate() {
    const newValues = normalizeValue(this.props, this.props.value instanceof _reactNative.Animated.Value ? //@ts-ignore
    this.props.value.__getValue() : this.props.value);
    newValues.forEach((value, i) => {
      if (!this.state.values[i]) {
        this._setCurrentValue(value, i); //@ts-ignore

      } else if (value !== this.state.values[i].__getValue()) {
        if (this.props.animateTransitions) {
          this._setCurrentValueAnimated(value, i);
        } else {
          this._setCurrentValue(value, i);
        }
      }
    });
  }

  _getRawValues(values) {
    //@ts-ignore
    return values.map(value => value.__getValue());
  }

  // Should we become active when the user presses down on the thumb?
  _handleMoveShouldSetPanResponder() {
    // Should we become active when the user moves a touch over the thumb?
    return false;
  }

  render() {
    const {
      containerStyle,
      debugTouchArea,
      maximumTrackTintColor,
      maximumValue,
      minimumTrackTintColor,
      minimumValue,
      renderAboveThumbComponent,
      renderBelowThumbComponent,
      renderTrackMarkComponent,
      renderThumbComponent,
      thumbStyle,
      thumbTintColor,
      trackStyle,
      minimumTrackStyle: propMinimumTrackStyle,
      maximumTrackStyle: propMaximumTrackStyle,
      vertical,
      startFromZero,
      step = 0,
      ...other
    } = this.props;
    const {
      allMeasured,
      containerSize,
      thumbSize,
      trackMarksValues,
      values
    } = this.state;

    const _startFromZero = values.length === 1 && minimumValue < 0 && maximumValue > 0 ? startFromZero : false;

    const interpolatedThumbValues = values.map(value => value.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: _reactNative.I18nManager.isRTL ? [0, -(containerSize.width - thumbSize.width)] : [0, containerSize.width - thumbSize.width]
    }));
    const interpolatedTrackValues = values.map(value => value.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: [0, containerSize.width - thumbSize.width]
    }));
    const interpolatedTrackMarksValues = trackMarksValues && trackMarksValues.map(v => v.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: _reactNative.I18nManager.isRTL ? [0, -(containerSize.width - thumbSize.width)] : [0, containerSize.width - thumbSize.width]
    }));
    const valueVisibleStyle = {};

    if (!allMeasured) {
      valueVisibleStyle.opacity = 0;
    }

    const interpolatedRawValues = this._getRawValues(interpolatedTrackValues);

    const minRawValue = Math.min(...interpolatedRawValues);
    const minThumbValue = new _reactNative.Animated.Value(minRawValue);
    const maxRawValue = Math.max(...interpolatedRawValues);
    const maxThumbValue = new _reactNative.Animated.Value(maxRawValue); //@ts-ignore

    const _value = values[0].__getValue();

    const sliderWidthCoefficient = containerSize.width / (Math.abs(minimumValue) + Math.abs(maximumValue));
    const startPositionOnTrack = _startFromZero ? _value < 0 + step ? (_value + Math.abs(minimumValue)) * sliderWidthCoefficient : Math.abs(minimumValue) * sliderWidthCoefficient : 0;
    const minTrackWidth = _startFromZero ? Math.abs(_value) * sliderWidthCoefficient - thumbSize.width / 2 : interpolatedTrackValues[0];
    const clearBorderRadius = {};

    if (_startFromZero && _value < 0 + step) {
      clearBorderRadius.borderBottomRightRadius = 0;
      clearBorderRadius.borderTopRightRadius = 0;
    }

    if (_startFromZero && _value > 0) {
      clearBorderRadius.borderTopLeftRadius = 0;
      clearBorderRadius.borderBottomLeftRadius = 0;
    }

    const minimumTrackStyle = {
      position: 'absolute',
      left: interpolatedTrackValues.length === 1 ? new _reactNative.Animated.Value(startPositionOnTrack) : _reactNative.Animated.add(minThumbValue, thumbSize.width / 2),
      width: interpolatedTrackValues.length === 1 ? _reactNative.Animated.add(minTrackWidth, thumbSize.width / 2) : _reactNative.Animated.add(_reactNative.Animated.multiply(minThumbValue, -1), maxThumbValue),
      backgroundColor: minimumTrackTintColor,
      ...valueVisibleStyle,
      ...clearBorderRadius
    };

    const touchOverflowStyle = this._getTouchOverflowStyle();

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderAboveThumbComponent && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.defaultStyles.aboveThumbComponentsContainer
    }, interpolatedThumbValues.map((interpolationValue, i) => {
      const animatedValue = values[i] || 0;
      let v = 0;
      animatedValue.addListener(({
        value
      }) => {
        v = value;
      });
      const value = animatedValue instanceof _reactNative.Animated.Value ? v : animatedValue;
      return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
        key: `slider-above-thumb-${i}`,
        style: [_styles.defaultStyles.renderThumbComponent, // eslint-disable-next-line react-native/no-inline-styles
        {
          bottom: 0,
          left: thumbSize.width / 2,
          transform: [{
            translateX: interpolationValue
          }, {
            translateY: 0
          }],
          ...valueVisibleStyle
        }]
      }, renderAboveThumbComponent(i, value));
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, other, {
      style: [_styles.defaultStyles.container, vertical ? {
        transform: [{
          rotate: '-90deg'
        }]
      } : {}, containerStyle],
      onLayout: this._measureContainer
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      renderToHardwareTextureAndroid: true,
      style: [_styles.defaultStyles.track, {
        backgroundColor: maximumTrackTintColor
      }, trackStyle, propMaximumTrackStyle],
      onLayout: this._measureTrack
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      renderToHardwareTextureAndroid: true,
      style: [_styles.defaultStyles.track, trackStyle, minimumTrackStyle, propMinimumTrackStyle]
    }), renderTrackMarkComponent && interpolatedTrackMarksValues && interpolatedTrackMarksValues.map((value, i) => /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      key: `track-mark-${i}`,
      style: [_styles.defaultStyles.renderThumbComponent, {
        transform: [{
          translateX: value
        }, {
          translateY: 0
        }],
        ...valueVisibleStyle
      }]
    }, renderTrackMarkComponent(i))), interpolatedThumbValues.map((value, i) => /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      key: `slider-thumb-${i}`,
      style: [renderThumbComponent ? _styles.defaultStyles.renderThumbComponent : _styles.defaultStyles.thumb, renderThumbComponent ? {} : {
        backgroundColor: thumbTintColor,
        ...thumbStyle
      }, {
        transform: [{
          translateX: value
        }, {
          translateY: 0
        }],
        ...valueVisibleStyle
      }],
      onLayout: this._measureThumb
    }, renderThumbComponent ? Array.isArray(renderThumbComponent) ? renderThumbComponent[i]() : renderThumbComponent() : this._renderThumbImage(i))), /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
      style: [_styles.defaultStyles.touchArea, touchOverflowStyle]
    }, this._panResponder.panHandlers), !!debugTouchArea && interpolatedThumbValues.map((value, i) => this._renderDebugThumbTouchRect(value, i)))), renderBelowThumbComponent && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.defaultStyles.belowThumbComponentsContainer
    }, interpolatedThumbValues.map((interpolationValue, i) => {
      const animatedValue = values[i] || 0;
      const value = animatedValue instanceof _reactNative.Animated.Value ? //@ts-ignore
      animatedValue.__getValue() : animatedValue;
      return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
        key: `slider-below-thumb-${i}`,
        style: [_styles.defaultStyles.renderThumbComponent, // eslint-disable-next-line react-native/no-inline-styles
        {
          top: 0,
          left: thumbSize.width / 2,
          transform: [{
            translateX: interpolationValue
          }, {
            translateY: 0
          }],
          ...valueVisibleStyle
        }]
      }, renderBelowThumbComponent(i, value));
    })));
  }

}

exports.Slider = Slider;

_defineProperty(Slider, "defaultProps", {
  animationType: 'timing',
  debugTouchArea: false,
  trackMarks: [],
  maximumTrackTintColor: '#b3b3b3',
  maximumValue: 1,
  minimumTrackTintColor: '#3f3f3f',
  minimumValue: 0,
  step: 0,
  thumbTintColor: '#343434',
  trackClickable: true,
  value: 0,
  vertical: false,
  startFromZero: false
});

const SliderContainer = props => {
  const {
    value,
    setValue,
    trackMarks,
    trackMarkStyles,
    containerStyle,
    onCustomValueChange
  } = props;
  let renderTrackMarkComponent;

  if (trackMarks !== null && trackMarks !== void 0 && trackMarks.length && (!Array.isArray(value) || (value === null || value === void 0 ? void 0 : value.length) === 1)) {
    /**
     * @param {number} index
     */
    renderTrackMarkComponent = index => {
      const currentMarkValue = trackMarks[index];
      const style = currentMarkValue > Math.max(Array.isArray(value) ? value[0] : value) ? trackMarkStyles === null || trackMarkStyles === void 0 ? void 0 : trackMarkStyles.activeMark : trackMarkStyles === null || trackMarkStyles === void 0 ? void 0 : trackMarkStyles.inactiveMark;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: style
      });
    };
  }

  const renderChildren = () => {
    return _react.default.Children.map(props.children, child => {
      if (!!child && child.type === Slider) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          onValueChange: input => {
            onCustomValueChange();
            setValue(input);
          },
          renderTrackMarkComponent,
          trackMarks,
          value
        });
      }

      return child;
    });
  };

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [customStyles.sliderContainer, containerStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: customStyles.sliderContent
  }, renderChildren()));
};

exports.SliderContainer = SliderContainer;

const CustomSlider = props => {
  return /*#__PURE__*/_react.default.createElement(SliderContainer, props, /*#__PURE__*/_react.default.createElement(Slider, props));
};

var _default = CustomSlider;
exports.default = _default;

const customStyles = _reactNative.StyleSheet.create({
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sliderContent: {
    flex: 1
  }
});
//# sourceMappingURL=index.js.map