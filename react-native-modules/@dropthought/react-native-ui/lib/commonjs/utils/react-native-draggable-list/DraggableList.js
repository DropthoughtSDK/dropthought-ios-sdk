"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _DraggableItem = _interopRequireDefault(require("./DraggableItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function moveElement(array, from, to) {
  const result = [...array];

  if (from !== to) {
    const element = result.splice(from, 1)[0];
    result.splice(to, 0, element);
  }

  return result;
}

function DraggableList({
  data,
  renderItem,
  onDragStart,
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

      const movements = (_tempListRef$current$ = tempListRef.current[draggingIndexRef.current].rowHeight) !== null && _tempListRef$current$ !== void 0 ? _tempListRef$current$ : 0;

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
        const iRowHeight = tempListRef.current[i].rowHeight;

        if (iRowHeight) {
          let level = 0;

          if (i < draggingIndexRef.current) {
            level = Math.floor(iRowHeight / 2);

            for (let j = i + 1; j < draggingIndexRef.current; j++) {
              const jRowHeight = tempListRef.current[j].rowHeight;

              if (jRowHeight) {
                level = level + jRowHeight;
              }
            }

            localHeightLevel = [...localHeightLevel, -level];
          } else if (i > draggingIndexRef.current) {
            for (let j = draggingIndexRef.current + 1; j < i; j++) {
              const jRowHeight = tempListRef.current[j].rowHeight;

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
        if (currentY >= heightLevelRef.current[i] && currentY < heightLevelRef.current[i + 1]) {
          if (newIndexRef.current !== i) {
            newIndexRef.current = i; // Note: Call setHelpToRerender to trigger rerender. Without calling setHelpToRerender other item will not shift while dragging.

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
      var _tempListRef$current$2;

      minRef.current = minRef.current - ((_tempListRef$current$2 = tempListRef.current[i].rowHeight) !== null && _tempListRef$current$2 !== void 0 ? _tempListRef$current$2 : 0);
    }

    for (let i = index; i < nonNACount - 1; i++) {
      const origin = data.filter(({
        option
      }) => option === tempListRef.current[index].option);

      if (origin.length > 0 && !origin[0].isNA) {
        var _tempListRef$current$3;

        maxRef.current = maxRef.current + ((_tempListRef$current$3 = tempListRef.current[i].rowHeight) !== null && _tempListRef$current$3 !== void 0 ? _tempListRef$current$3 : 0);
      }
    }
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
    var {
      height
    } = event.nativeEvent.layout;
    tempListRef.current[listIndex] = { ...tempListRef.current[listIndex],
      rowHeight: parseInt(`${height}`, 10)
    };

    if (!backupListRef.current[listIndex].rowHeight) {
      backupListRef.current[listIndex] = { ...tempListRef.current[listIndex],
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

var _default = /*#__PURE__*/_react.default.memo(DraggableList);

exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  questionContainer: {
    width: '100%'
  }
});
//# sourceMappingURL=DraggableList.js.map