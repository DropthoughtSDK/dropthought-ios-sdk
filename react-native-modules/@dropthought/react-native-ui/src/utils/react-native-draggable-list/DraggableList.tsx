import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, LayoutChangeEvent } from 'react-native';
import DraggableItem from './DraggableItem';

export type TransformedOption = {
  option: string;
  index: number;
  isNA: boolean;
  rowHeight?: number;
};

function moveElement<ItemT>(
  array: ReadonlyArray<ItemT>,
  from: number,
  to: number
) {
  const result = [...array];
  if (from !== to) {
    const element = result.splice(from, 1)[0];
    result.splice(to, 0, element);
  }
  return result;
}

type DraggableListRenderItemInfo = {
  item: TransformedOption;
  index: number;
};

export type DraggableListRenderItem = (
  info: DraggableListRenderItemInfo
) => React.ReactElement | null;

type DraggableListProps = {
  data: ReadonlyArray<TransformedOption>;
  renderItem: DraggableListRenderItem;
  onDragStart: () => void;
  onDragGrant: () => void;
  onDragRelease: () => void;
  onDragEnd: (newList: TransformedOption[]) => void;
};

function DraggableList({
  data,
  renderItem,
  onDragStart,
  onDragGrant,
  onDragRelease,
  onDragEnd,
}: DraggableListProps) {
  const backupListRef = useRef([...data]);
  const tempListRef = useRef([...data]);

  const draggingIndexRef = useRef(-1);
  const newIndexRef = useRef(-1);

  const [forceReset, setForceReset] = useState(false);

  const setHelpToRerender = useState(false)[1];
  const heightLevelRef = useRef<number[] | undefined>(undefined);

  useEffect(() => {
    let result: TransformedOption[] = [];
    data.forEach((item) => {
      const backupItem = backupListRef.current.find(
        (backupData) => backupData.index === item.index
      );
      if (backupItem) {
        result = [...result, backupItem];
      }
    });
    tempListRef.current = result ? result : [...data];
    heightLevelRef.current = undefined;
  }, [data]);

  const calculateMovements = useCallback((index: number) => {
    let result = 0;
    if (newIndexRef.current < 0 || draggingIndexRef.current < 0) {
      return result;
    }

    if (newIndexRef.current === draggingIndexRef.current) {
      return result;
    } else {
      const movements =
        tempListRef.current[draggingIndexRef.current].rowHeight ?? 0;
      if (newIndexRef.current > draggingIndexRef.current) {
        result =
          index > draggingIndexRef.current && index <= newIndexRef.current
            ? -movements
            : 0;
      } else {
        result =
          index < draggingIndexRef.current && index >= newIndexRef.current
            ? movements
            : 0;
      }
      return result;
    }
  }, []);

  const calculateHeightLevel = useCallback(() => {
    if (!heightLevelRef.current) {
      let localHeightLevel: number[] = [Number.MIN_SAFE_INTEGER];
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
          if (
            localIndex > draggingIndexRef.current &&
            localIndex <= newIndexRef.current
          ) {
            movements += item.rowHeight;
          }
        } else if (newIndexRef.current < draggingIndexRef.current) {
          if (
            localIndex < draggingIndexRef.current &&
            localIndex >= newIndexRef.current
          ) {
            movements -= item.rowHeight;
          }
        }
      }
    });
    return movements;
  }, []);

  const calculatePositionChange = useCallback(
    (currentY: number) => {
      if (heightLevelRef.current) {
        for (let i = 0; i < heightLevelRef.current.length; i++) {
          if (
            currentY >= heightLevelRef.current[i] &&
            currentY < heightLevelRef.current[i + 1]
          ) {
            if (newIndexRef.current !== i) {
              newIndexRef.current = i;
              // Note: Call setHelpToRerender to trigger rerender. Without calling setHelpToRerender other item will not shift while dragging.
              setHelpToRerender((prev) => !prev);
            }
          }
        }
      }
    },
    [setHelpToRerender]
  );

  let minRef = useRef(0);
  let maxRef = useRef(0);

  const onDragStartHandler = (index: number) => {
    onDragStart && onDragStart();
    const nonNACount = data.filter(({ isNA }) => !isNA).length;
    minRef.current = 0;
    maxRef.current = 0;
    for (let i = 0; i < index; i++) {
      minRef.current = minRef.current - (tempListRef.current[i].rowHeight ?? 0);
    }

    for (let i = index; i < nonNACount - 1; i++) {
      const origin = data.filter(
        ({ option }) => option === tempListRef.current[index].option
      );
      if (origin.length > 0 && !origin[0].isNA) {
        maxRef.current =
          maxRef.current + (tempListRef.current[i].rowHeight ?? 0);
      }
    }
  };

  const onDragGrantHandler = () => {
    onDragGrant && onDragGrant();
  };

  const onDragHandler = useCallback(
    (pan: Animated.ValueXY, y: number, listIndex: number) => {
      if (y > minRef.current && y < maxRef.current) {
        pan.y.setValue(y);

        draggingIndexRef.current = listIndex;
        calculateHeightLevel();
        calculatePositionChange(y);
      }
    },
    [calculateHeightLevel, calculatePositionChange]
  );

  const onDragEndHandler = useCallback(
    (pan: Animated.ValueXY, listIndex: number) => {
      const movements = calculateReleaseDragMovements();

      if (movements !== 0) {
        Animated.spring(pan, {
          toValue: { x: 0, y: movements },
          useNativeDriver: true,
          speed: Number.MAX_SAFE_INTEGER,
        }).start(() => {
          const newList = moveElement(
            tempListRef.current,
            listIndex,
            newIndexRef.current
          );
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
    },
    [calculateReleaseDragMovements, onDragEnd]
  );

  const onLayoutHandler = (event: LayoutChangeEvent, listIndex: number) => {
    var { height } = event.nativeEvent.layout;
    tempListRef.current[listIndex] = {
      ...tempListRef.current[listIndex],
      rowHeight: parseInt(`${height}`, 10),
    };
    if (!backupListRef.current[listIndex].rowHeight) {
      backupListRef.current[listIndex] = {
        ...tempListRef.current[listIndex],
        rowHeight: parseInt(`${height}`, 10),
      };
    }
  };

  return (
    <View style={styles.questionContainer}>
      {data.map((item, index) => {
        return (
          <DraggableItem
            index={index}
            onDragStart={() => onDragStartHandler(index)}
            onDragGrant={() => onDragGrantHandler()}
            onDrag={(pan, y) => onDragHandler(pan, y, index)}
            onDragRelease={onDragRelease}
            onDragEnd={(pan) => onDragEndHandler(pan, index)}
            onLayout={(event) => onLayoutHandler(event, index)}
            forceReset={forceReset}
            movements={calculateMovements(index)}
            key={JSON.stringify(item) + index.toString()}
            draggable={!item.isNA}
          >
            {renderItem({ item, index })}
          </DraggableItem>
        );
      })}
    </View>
  );
}

export default React.memo(DraggableList);

const styles = StyleSheet.create({
  questionContainer: {
    width: '100%',
  },
});
