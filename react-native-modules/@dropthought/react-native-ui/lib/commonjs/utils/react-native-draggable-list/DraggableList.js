"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _DraggableItem = _interopRequireDefault(require("./DraggableItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function moveElement(array, from, to) {
  const result = [...array];
  if (from !== to) {
    const element = result.splice(from, 1)[0];
    // @ts-ignore
    result.splice(to, 0, element);
  }
  return result;
}
function DraggableList({
  data,
  renderItem,
  onDragStart,
  onDragGrant,
  onDragRelease,
  onDragEnd
}) {
  const backupListRef = (0, _react.useRef)([...data]);
  const tempListRef = (0, _react.useRef)([...data]);
  const draggingIndexRef = (0, _react.useRef)(-1);
  const newIndexRef = (0, _react.useRef)(-1);
  const [forceReset, setForceReset] = (0, _react.useState)(false);
  const setHelpToRerender = (0, _react.useState)(false)[1];
  const heightLevelRef = (0, _react.useRef)(undefined);
  (0, _react.useEffect)(() => {
    let result = [];
    data.forEach(item => {
      const backupItem = backupListRef.current.find(backupData => backupData.index === item.index);
      if (backupItem) {
        result = [...result, backupItem];
      }
    });
    tempListRef.current = result ? result : [...data];
    heightLevelRef.current = undefined;
  }, [data]);
  const calculateMovements = (0, _react.useCallback)(index => {
    let result = 0;
    if (newIndexRef.current < 0 || draggingIndexRef.current < 0) {
      return result;
    }
    if (newIndexRef.current === draggingIndexRef.current) {
      return result;
    } else {
      var _tempListRef$current$;
      const movements = ((_tempListRef$current$ = tempListRef.current[draggingIndexRef.current]) === null || _tempListRef$current$ === void 0 ? void 0 : _tempListRef$current$.rowHeight) ?? 0;
      if (newIndexRef.current > draggingIndexRef.current) {
        result = index > draggingIndexRef.current && index <= newIndexRef.current ? -movements : 0;
      } else {
        result = index < draggingIndexRef.current && index >= newIndexRef.current ? movements : 0;
      }
      return result;
    }
  }, []);
  const calculateHeightLevel = (0, _react.useCallback)(() => {
    if (!heightLevelRef.current) {
      let localHeightLevel = [Number.MIN_SAFE_INTEGER];
      for (let i = 0; i < tempListRef.current.length; i++) {
        var _tempListRef$current$2;
        const iRowHeight = (_tempListRef$current$2 = tempListRef.current[i]) === null || _tempListRef$current$2 === void 0 ? void 0 : _tempListRef$current$2.rowHeight;
        if (iRowHeight) {
          let level = 0;
          if (i < draggingIndexRef.current) {
            level = Math.floor(iRowHeight / 2);
            for (let j = i + 1; j < draggingIndexRef.current; j++) {
              var _tempListRef$current$3;
              const jRowHeight = (_tempListRef$current$3 = tempListRef.current[j]) === null || _tempListRef$current$3 === void 0 ? void 0 : _tempListRef$current$3.rowHeight;
              if (jRowHeight) {
                level = level + jRowHeight;
              }
            }
            localHeightLevel = [...localHeightLevel, -level];
          } else if (i > draggingIndexRef.current) {
            for (let j = draggingIndexRef.current + 1; j < i; j++) {
              var _tempListRef$current$4;
              const jRowHeight = (_tempListRef$current$4 = tempListRef.current[j]) === null || _tempListRef$current$4 === void 0 ? void 0 : _tempListRef$current$4.rowHeight;
              if (jRowHeight) {
                level = level + jRowHeight;
              }
            }
            level = level + Math.floor(iRowHeight / 2);
            localHeightLevel = [...localHeightLevel, level];
          }
        }
      }
      localHeightLevel = [...localHeightLevel, Number.MAX_SAFE_INTEGER];
      heightLevelRef.current = localHeightLevel;
    }
  }, []);
  const calculateReleaseDragMovements = (0, _react.useCallback)(() => {
    let movements = 0;
    tempListRef.current.forEach((item, localIndex) => {
      if (item.rowHeight) {
        if (newIndexRef.current > draggingIndexRef.current) {
          if (localIndex > draggingIndexRef.current && localIndex <= newIndexRef.current) {
            movements += item.rowHeight;
          }
        } else if (newIndexRef.current < draggingIndexRef.current) {
          if (localIndex < draggingIndexRef.current && localIndex >= newIndexRef.current) {
            movements -= item.rowHeight;
          }
        }
      }
    });
    return movements;
  }, []);
  const calculatePositionChange = (0, _react.useCallback)(currentY => {
    if (heightLevelRef.current) {
      for (let i = 0; i < heightLevelRef.current.length; i++) {
        if (
        // @ts-ignore
        currentY >= heightLevelRef.current[i] &&
        // @ts-ignore
        currentY < heightLevelRef.current[i + 1]) {
          if (newIndexRef.current !== i) {
            newIndexRef.current = i;
            // Note: Call setHelpToRerender to trigger rerender. Without calling setHelpToRerender other item will not shift while dragging.
            setHelpToRerender(prev => !prev);
          }
        }
      }
    }
  }, [setHelpToRerender]);
  let minRef = (0, _react.useRef)(0);
  let maxRef = (0, _react.useRef)(0);
  const onDragStartHandler = index => {
    onDragStart && onDragStart();
    const nonNACount = data.filter(({
      isNA
    }) => !isNA).length;
    minRef.current = 0;
    maxRef.current = 0;
    for (let i = 0; i < index; i++) {
      var _tempListRef$current$5;
      minRef.current = minRef.current - (((_tempListRef$current$5 = tempListRef.current[i]) === null || _tempListRef$current$5 === void 0 ? void 0 : _tempListRef$current$5.rowHeight) ?? 0);
    }
    for (let i = index; i < nonNACount - 1; i++) {
      const origin = data.filter(({
        option
      }) => {
        var _tempListRef$current$6;
        return option === ((_tempListRef$current$6 = tempListRef.current[index]) === null || _tempListRef$current$6 === void 0 ? void 0 : _tempListRef$current$6.option);
      });
      // @ts-ignore
      if (origin.length > 0 && !origin[0].isNA) {
        var _tempListRef$current$7;
        maxRef.current = maxRef.current + (((_tempListRef$current$7 = tempListRef.current[i]) === null || _tempListRef$current$7 === void 0 ? void 0 : _tempListRef$current$7.rowHeight) ?? 0);
      }
    }
  };
  const onDragGrantHandler = () => {
    onDragGrant && onDragGrant();
  };
  const onDragHandler = (0, _react.useCallback)((pan, y, listIndex) => {
    if (y > minRef.current && y < maxRef.current) {
      pan.y.setValue(y);
      draggingIndexRef.current = listIndex;
      calculateHeightLevel();
      calculatePositionChange(y);
    }
  }, [calculateHeightLevel, calculatePositionChange]);
  const onDragEndHandler = (0, _react.useCallback)((pan, listIndex) => {
    const movements = calculateReleaseDragMovements();
    if (movements !== 0) {
      _reactNative.Animated.spring(pan, {
        toValue: {
          x: 0,
          y: movements
        },
        useNativeDriver: true,
        speed: Number.MAX_SAFE_INTEGER
      }).start(() => {
        const newList = moveElement(tempListRef.current, listIndex, newIndexRef.current);
        newIndexRef.current = -1;
        draggingIndexRef.current = -1;
        setForceReset(true);
        onDragEnd(newList);
        tempListRef.current = newList;
        setTimeout(() => {
          setForceReset(false);
          heightLevelRef.current = undefined;
        }, 0);
      });
    } else {
      setForceReset(true);
      setTimeout(() => {
        setForceReset(false);
        heightLevelRef.current = undefined;
      }, 0);
    }
  }, [calculateReleaseDragMovements, onDragEnd]);
  const onLayoutHandler = (event, listIndex) => {
    var _backupListRef$curren;
    var {
      height
    } = event.nativeEvent.layout;
    // @ts-ignore
    tempListRef.current[listIndex] = {
      ...tempListRef.current[listIndex],
      rowHeight: parseInt(`${height}`, 10)
    };
    if (!((_backupListRef$curren = backupListRef.current[listIndex]) !== null && _backupListRef$curren !== void 0 && _backupListRef$curren.rowHeight)) {
      // @ts-ignore
      backupListRef.current[listIndex] = {
        ...tempListRef.current[listIndex],
        rowHeight: parseInt(`${height}`, 10)
      };
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.questionContainer
  }, data.map((item, index) => {
    return /*#__PURE__*/_react.default.createElement(_DraggableItem.default, {
      index: index,
      onDragStart: () => onDragStartHandler(index),
      onDragGrant: () => onDragGrantHandler(),
      onDrag: (pan, y) => onDragHandler(pan, y, index),
      onDragRelease: onDragRelease,
      onDragEnd: pan => onDragEndHandler(pan, index),
      onLayout: event => onLayoutHandler(event, index),
      forceReset: forceReset,
      movements: calculateMovements(index),
      key: JSON.stringify(item) + index.toString(),
      draggable: !item.isNA
    }, renderItem({
      item,
      index
    }));
  }));
}
var _default = exports.default = /*#__PURE__*/_react.default.memo(DraggableList);
const styles = _reactNative.StyleSheet.create({
  questionContainer: {
    width: '100%'
  }
});
//# sourceMappingURL=DraggableList.js.map