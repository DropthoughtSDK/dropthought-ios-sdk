"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCellTranslate = void 0;
var react_native_reanimated_1 = require("react-native-reanimated");
var animatedValueContext_1 = require("../context/animatedValueContext");
var refContext_1 = require("../context/refContext");
var procs_1 = require("../procs");
var useSpring_1 = require("./useSpring");
var useNode_1 = require("../hooks/useNode");
var draggableFlatListContext_1 = require("../context/draggableFlatListContext");
function useCellTranslate(_a) {
    var cellIndex = _a.cellIndex, cellSize = _a.cellSize, cellOffset = _a.cellOffset;
    var _b = (0, animatedValueContext_1.useAnimatedValues)(), activeIndexAnim = _b.activeIndexAnim, activeCellSize = _b.activeCellSize, hoverAnim = _b.hoverAnim, scrollOffset = _b.scrollOffset, spacerIndexAnim = _b.spacerIndexAnim, placeholderOffset = _b.placeholderOffset, isDraggingCell = _b.isDraggingCell, resetTouchedCell = _b.resetTouchedCell, disabled = _b.disabled;
    var animationConfigRef = (0, refContext_1.useRefs)().animationConfigRef;
    var onDragEnd = (0, draggableFlatListContext_1.useDraggableFlatListContext)().onDragEnd;
    var cellSpring = (0, useSpring_1.useSpring)({ config: animationConfigRef.current });
    var clock = cellSpring.clock, state = cellSpring.state, config = cellSpring.config;
    var isAfterActive = (0, react_native_reanimated_1.useValue)(0);
    var isClockRunning = (0, useNode_1.useNode)((0, react_native_reanimated_1.clockRunning)(clock));
    var runSpring = (0, useNode_1.useNode)((0, procs_1.springFill)(clock, state, config));
    // Even though this is the same value as hoverOffset passed via context
    // the android context value lags behind the actual value on autoscroll
    var cellHoverOffset = (0, useNode_1.useNode)((0, react_native_reanimated_1.add)(hoverAnim, scrollOffset));
    var onFinished = (0, useNode_1.useNode)((0, react_native_reanimated_1.cond)(isClockRunning, [
        (0, react_native_reanimated_1.stopClock)(clock),
        (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.eq)(cellIndex, activeIndexAnim), [
            resetTouchedCell,
            (0, react_native_reanimated_1.call)([activeIndexAnim, spacerIndexAnim], onDragEnd),
        ]),
    ]));
    var prevTrans = (0, react_native_reanimated_1.useValue)(0);
    var prevSpacerIndex = (0, react_native_reanimated_1.useValue)(-1);
    var prevIsDraggingCell = (0, react_native_reanimated_1.useValue)(0);
    var cellTranslate = (0, useNode_1.useNode)((0, procs_1.setupCell)(cellIndex, cellSize, cellOffset, isAfterActive, prevTrans, prevSpacerIndex, activeIndexAnim, activeCellSize, cellHoverOffset, spacerIndexAnim, 
    //@ts-ignore
    config.toValue, state.position, state.time, state.finished, runSpring, onFinished, isDraggingCell, placeholderOffset, prevIsDraggingCell, clock, disabled));
    // This is a workaround required to continually evaluate values
    (0, react_native_reanimated_1.useCode)(function () {
        return (0, react_native_reanimated_1.block)([
            (0, react_native_reanimated_1.onChange)(cellTranslate, []),
            (0, react_native_reanimated_1.onChange)(prevTrans, []),
            (0, react_native_reanimated_1.onChange)(cellSize, []),
            (0, react_native_reanimated_1.onChange)(cellOffset, []),
        ]);
    }, []);
    return state.position;
}
exports.useCellTranslate = useCellTranslate;
