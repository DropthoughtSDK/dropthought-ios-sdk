import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import DraggableItem from './DraggableItem';

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
  onDragEnd
}) {
  const backupListRef = useRef([...data]);
  const tempListRef = useRef([...data]);
  const draggingIndexRef = useRef(-1);
  const newIndexRef = useRef(-1);
  const [forceReset, setForceReset] = useState(false);
  const setHelpToRerender = useState(false)[1];
  const heightLevelRef = useRef(undefined);
  useEffect(() => {
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
  const calculateMovements = useCallback(index => {
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
  const calculateHeightLevel = useCallback(() => {
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
  const calculateReleaseDragMovements = useCallback(() => {
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
  const calculatePositionChange = useCallback(currentY => {
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
  let minRef = useRef(0);
  let maxRef = useRef(0);

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

  const onDragHandler = useCallback((pan, y, listIndex) => {
    if (y > minRef.current && y < maxRef.current) {
      pan.y.setValue(y);
      draggingIndexRef.current = listIndex;
      calculateHeightLevel();
      calculatePositionChange(y);
    }
  }, [calculateHeightLevel, calculatePositionChange]);
  const onDragEndHandler = useCallback((pan, listIndex) => {
    const movements = calculateReleaseDragMovements();

    if (movements !== 0) {
      Animated.spring(pan, {
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

  return /*#__PURE__*/React.createElement(View, {
    style: styles.questionContainer
  }, data.map((item, index) => {
    return /*#__PURE__*/React.createElement(DraggableItem, {
      index: index,
      onDragStart: () => onDragStartHandler(index),
      onDrag: (pan, y) => onDragHandler(pan, y, index),
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

export default /*#__PURE__*/React.memo(DraggableList);
const styles = StyleSheet.create({
  questionContainer: {
    width: '100%'
  }
});
//# sourceMappingURL=DraggableList.js.map