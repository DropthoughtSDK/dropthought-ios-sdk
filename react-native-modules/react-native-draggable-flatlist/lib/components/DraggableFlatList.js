"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var CellRendererComponent_1 = __importDefault(require("./CellRendererComponent"));
var constants_1 = require("../constants");
var PlaceholderItem_1 = __importDefault(require("./PlaceholderItem"));
var RowItem_1 = __importDefault(require("./RowItem"));
var ScrollOffsetListener_1 = __importDefault(require("./ScrollOffsetListener"));
var useAutoScroll_1 = require("../hooks/useAutoScroll");
var useNode_1 = require("../hooks/useNode");
var propsContext_1 = __importDefault(require("../context/propsContext"));
var animatedValueContext_1 = __importStar(require("../context/animatedValueContext"));
var refContext_1 = __importStar(require("../context/refContext"));
var draggableFlatListContext_1 = __importDefault(require("../context/draggableFlatListContext"));
var AnimatedFlatList = react_native_reanimated_1.default.createAnimatedComponent(react_native_gesture_handler_1.FlatList);
function DraggableFlatListInner(props) {
    var _a = (0, refContext_1.useRefs)(), cellDataRef = _a.cellDataRef, containerRef = _a.containerRef, flatListRef = _a.flatListRef, isTouchActiveRef = _a.isTouchActiveRef, keyToIndexRef = _a.keyToIndexRef, panGestureHandlerRef = _a.panGestureHandlerRef, propsRef = _a.propsRef, scrollOffsetRef = _a.scrollOffsetRef;
    var _b = (0, animatedValueContext_1.useAnimatedValues)(), activationDistance = _b.activationDistance, activeCellOffset = _b.activeCellOffset, activeCellSize = _b.activeCellSize, activeIndexAnim = _b.activeIndexAnim, containerSize = _b.containerSize, disabled = _b.disabled, panGestureState = _b.panGestureState, resetTouchedCell = _b.resetTouchedCell, scrollOffset = _b.scrollOffset, scrollViewSize = _b.scrollViewSize, spacerIndexAnim = _b.spacerIndexAnim, touchAbsolute = _b.touchAbsolute, touchInit = _b.touchInit;
    var _c = props.dragHitSlop, dragHitSlop = _c === void 0 ? constants_1.DEFAULT_PROPS.dragHitSlop : _c, _d = props.scrollEnabled, scrollEnabled = _d === void 0 ? constants_1.DEFAULT_PROPS.scrollEnabled : _d, _e = props.activationDistance, activationDistanceProp = _e === void 0 ? constants_1.DEFAULT_PROPS.activationDistance : _e;
    var _f = (0, react_1.useState)(null), activeKey = _f[0], setActiveKey = _f[1];
    var keyExtractor = (0, react_1.useCallback)(function (item, index) {
        if (propsRef.current.keyExtractor)
            return propsRef.current.keyExtractor(item, index);
        else
            throw new Error("You must provide a keyExtractor to DraggableFlatList");
    }, [propsRef]);
    (0, react_1.useLayoutEffect)(function () {
        props.data.forEach(function (d, i) {
            var key = keyExtractor(d, i);
            keyToIndexRef.current.set(key, i);
        });
    }, [props.data, keyExtractor, keyToIndexRef]);
    var drag = (0, react_1.useCallback)(function (activeKey) {
        if (!isTouchActiveRef.current.js)
            return;
        var index = keyToIndexRef.current.get(activeKey);
        var cellData = cellDataRef.current.get(activeKey);
        if (cellData) {
            activeCellOffset.setValue(cellData.measurements.offset - scrollOffsetRef.current);
            activeCellSize.setValue(cellData.measurements.size);
        }
        var onDragBegin = propsRef.current.onDragBegin;
        if (index !== undefined) {
            spacerIndexAnim.setValue(index);
            activeIndexAnim.setValue(index);
            setActiveKey(activeKey);
            onDragBegin === null || onDragBegin === void 0 ? void 0 : onDragBegin(index);
        }
    }, [
        isTouchActiveRef,
        keyToIndexRef,
        cellDataRef,
        propsRef,
        activeCellOffset,
        scrollOffsetRef,
        activeCellSize,
        spacerIndexAnim,
        activeIndexAnim,
    ]);
    var autoScrollNode = (0, useAutoScroll_1.useAutoScroll)();
    var onContainerLayout = function (_a) {
        var layout = _a.nativeEvent.layout;
        containerSize.setValue(props.horizontal ? layout.width : layout.height);
    };
    var onListContentSizeChange = function (w, h) {
        var _a;
        scrollViewSize.setValue(props.horizontal ? w : h);
        (_a = props.onContentSizeChange) === null || _a === void 0 ? void 0 : _a.call(props, w, h);
    };
    var onContainerTouchStart = function () {
        isTouchActiveRef.current.js = true;
        isTouchActiveRef.current.native.setValue(1);
        return false;
    };
    var onContainerTouchEnd = function () {
        isTouchActiveRef.current.js = false;
        isTouchActiveRef.current.native.setValue(0);
    };
    var dynamicProps = {};
    if (activationDistanceProp) {
        var activeOffset = [-activationDistanceProp, activationDistanceProp];
        dynamicProps = props.horizontal
            ? { activeOffsetX: activeOffset }
            : { activeOffsetY: activeOffset };
    }
    var extraData = (0, react_1.useMemo)(function () { return ({
        activeKey: activeKey,
        extraData: props.extraData,
    }); }, [activeKey, props.extraData]);
    var renderItem = (0, react_1.useCallback)(function (_a) {
        var item = _a.item, index = _a.index;
        var key = keyExtractor(item, index);
        if (index !== keyToIndexRef.current.get(key))
            keyToIndexRef.current.set(key, index);
        return (react_1.default.createElement(RowItem_1.default, { item: item, itemKey: key, renderItem: props.renderItem, drag: drag, extraData: props.extraData }));
    }, [props.renderItem, props.extraData, drag, keyExtractor]);
    var resetHoverState = (0, react_1.useCallback)(function () {
        activeIndexAnim.setValue(-1);
        spacerIndexAnim.setValue(-1);
        touchAbsolute.setValue(0);
        disabled.setValue(0);
        requestAnimationFrame(function () {
            setActiveKey(null);
        });
    }, [activeIndexAnim, spacerIndexAnim, touchAbsolute, disabled]);
    var onRelease = function (_a) {
        var _b;
        var index = _a[0];
        // This shouldn't be necessary but seems to fix a bug where sometimes
        // native values wouldn't update
        isTouchActiveRef.current.native.setValue(0);
        (_b = props.onRelease) === null || _b === void 0 ? void 0 : _b.call(props, index);
    };
    var onDragEnd = (0, react_1.useCallback)(function (_a) {
        var from = _a[0], to = _a[1];
        var _b = propsRef.current, onDragEnd = _b.onDragEnd, data = _b.data;
        if (onDragEnd) {
            var newData = __spreadArray([], data, true);
            if (from !== to) {
                newData.splice(from, 1);
                newData.splice(to, 0, data[from]);
            }
            onDragEnd({ from: from, to: to, data: newData });
        }
        resetHoverState();
    }, [resetHoverState, propsRef]);
    var onGestureRelease = (0, useNode_1.useNode)((0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.greaterThan)(activeIndexAnim, -1), [
        (0, react_native_reanimated_1.set)(disabled, 1),
        (0, react_native_reanimated_1.set)(isTouchActiveRef.current.native, 0),
        (0, react_native_reanimated_1.call)([activeIndexAnim], onRelease),
    ], [(0, react_native_reanimated_1.call)([activeIndexAnim], resetHoverState), resetTouchedCell]));
    var onPanStateChange = (0, react_1.useMemo)(function () {
        return (0, react_native_reanimated_1.event)([
            {
                nativeEvent: function (_a) {
                    var state = _a.state, x = _a.x, y = _a.y;
                    return (0, react_native_reanimated_1.block)([
                        (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.and)((0, react_native_reanimated_1.neq)(state, panGestureState), (0, react_native_reanimated_1.not)(disabled)), [
                            (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.or)((0, react_native_reanimated_1.eq)(state, react_native_gesture_handler_1.State.BEGAN), // Called on press in on Android, NOT on ios!
                            // GestureState.BEGAN may be skipped on fast swipes
                            (0, react_native_reanimated_1.and)((0, react_native_reanimated_1.eq)(state, react_native_gesture_handler_1.State.ACTIVE), (0, react_native_reanimated_1.neq)(panGestureState, react_native_gesture_handler_1.State.BEGAN))), [
                                (0, react_native_reanimated_1.set)(touchAbsolute, props.horizontal ? x : y),
                                (0, react_native_reanimated_1.set)(touchInit, touchAbsolute),
                            ]),
                            (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.eq)(state, react_native_gesture_handler_1.State.ACTIVE), [
                                (0, react_native_reanimated_1.set)(activationDistance, (0, react_native_reanimated_1.sub)(props.horizontal ? x : y, touchInit)),
                                (0, react_native_reanimated_1.set)(touchAbsolute, props.horizontal ? x : y),
                            ]),
                        ]),
                        (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.neq)(panGestureState, state), [
                            (0, react_native_reanimated_1.set)(panGestureState, state),
                            (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.or)((0, react_native_reanimated_1.eq)(state, react_native_gesture_handler_1.State.END), (0, react_native_reanimated_1.eq)(state, react_native_gesture_handler_1.State.CANCELLED), (0, react_native_reanimated_1.eq)(state, react_native_gesture_handler_1.State.FAILED)), onGestureRelease),
                        ]),
                    ]);
                },
            },
        ]);
    }, [
        activationDistance,
        props.horizontal,
        panGestureState,
        disabled,
        onGestureRelease,
        touchAbsolute,
        touchInit,
    ]);
    var onPanGestureEvent = (0, react_1.useMemo)(function () {
        return (0, react_native_reanimated_1.event)([
            {
                nativeEvent: function (_a) {
                    var x = _a.x, y = _a.y;
                    return (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.and)((0, react_native_reanimated_1.greaterThan)(activeIndexAnim, -1), (0, react_native_reanimated_1.eq)(panGestureState, react_native_gesture_handler_1.State.ACTIVE), (0, react_native_reanimated_1.not)(disabled)), [(0, react_native_reanimated_1.set)(touchAbsolute, props.horizontal ? x : y)]);
                },
            },
        ]);
    }, [
        activeIndexAnim,
        disabled,
        panGestureState,
        props.horizontal,
        touchAbsolute,
    ]);
    var scrollHandler = (0, react_1.useMemo)(function () {
        // Web doesn't seem to like animated events
        var webOnScroll = function (_a) {
            var _b = _a.nativeEvent.contentOffset, x = _b.x, y = _b.y;
            scrollOffset.setValue(props.horizontal ? x : y);
        };
        var mobileOnScroll = (0, react_native_reanimated_1.event)([
            {
                nativeEvent: function (_a) {
                    var contentOffset = _a.contentOffset;
                    return (0, react_native_reanimated_1.block)([
                        (0, react_native_reanimated_1.set)(scrollOffset, props.horizontal ? contentOffset.x : contentOffset.y),
                        autoScrollNode,
                    ]);
                },
            },
        ]);
        return constants_1.isWeb ? webOnScroll : mobileOnScroll;
    }, [autoScrollNode, props.horizontal, scrollOffset]);
    return (react_1.default.createElement(draggableFlatListContext_1.default, { activeKey: activeKey, onDragEnd: onDragEnd, keyExtractor: keyExtractor, horizontal: !!props.horizontal },
        react_1.default.createElement(react_native_gesture_handler_1.PanGestureHandler, __assign({ ref: panGestureHandlerRef, hitSlop: dragHitSlop, onHandlerStateChange: onPanStateChange, onGestureEvent: onPanGestureEvent, simultaneousHandlers: props.simultaneousHandlers }, dynamicProps),
            react_1.default.createElement(react_native_reanimated_1.default.View, { style: props.containerStyle, ref: containerRef, onLayout: onContainerLayout, onTouchEnd: onContainerTouchEnd, onStartShouldSetResponderCapture: onContainerTouchStart, 
                //@ts-ignore
                onClick: onContainerTouchEnd },
                react_1.default.createElement(ScrollOffsetListener_1.default, { scrollOffset: scrollOffset, onScrollOffsetChange: function (_a) {
                        var _b;
                        var offset = _a[0];
                        scrollOffsetRef.current = offset;
                        (_b = props.onScrollOffsetChange) === null || _b === void 0 ? void 0 : _b.call(props, offset);
                    } }),
                !!props.renderPlaceholder && (react_1.default.createElement(PlaceholderItem_1.default, { renderPlaceholder: props.renderPlaceholder })),
                react_1.default.createElement(AnimatedFlatList, __assign({}, props, { CellRendererComponent: CellRendererComponent_1.default, ref: flatListRef, onContentSizeChange: onListContentSizeChange, scrollEnabled: !activeKey && scrollEnabled, renderItem: renderItem, extraData: extraData, keyExtractor: keyExtractor, onScroll: scrollHandler, scrollEventThrottle: 16, simultaneousHandlers: props.simultaneousHandlers, removeClippedSubviews: false })),
                react_1.default.createElement(react_native_reanimated_1.default.Code, { dependencies: [] }, function () {
                    return (0, react_native_reanimated_1.block)([
                        (0, react_native_reanimated_1.onChange)(isTouchActiveRef.current.native, (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.not)(isTouchActiveRef.current.native), onGestureRelease)),
                    ]);
                })))));
}
function DraggableFlatList(props, ref) {
    return (react_1.default.createElement(propsContext_1.default, __assign({}, props),
        react_1.default.createElement(animatedValueContext_1.default, null,
            react_1.default.createElement(refContext_1.default, { flatListRef: ref },
                react_1.default.createElement(DraggableFlatListInner, __assign({}, props))))));
}
// Generic forwarded ref type assertion taken from:
// https://fettblog.eu/typescript-react-generic-forward-refs/#option-1%3A-type-assertion
exports.default = react_1.default.forwardRef(DraggableFlatList);
