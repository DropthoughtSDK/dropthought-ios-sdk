"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutoScroll = void 0;
var react_1 = require("react");
var react_native_reanimated_1 = require("react-native-reanimated");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var constants_1 = require("../constants");
var useNode_1 = require("../hooks/useNode");
var propsContext_1 = require("../context/propsContext");
var animatedValueContext_1 = require("../context/animatedValueContext");
var refContext_1 = require("../context/refContext");
function useAutoScroll() {
    var _this = this;
    var flatListRef = (0, refContext_1.useRefs)().flatListRef;
    var _a = (0, propsContext_1.useProps)(), _b = _a.autoscrollThreshold, autoscrollThreshold = _b === void 0 ? constants_1.DEFAULT_PROPS.autoscrollThreshold : _b, _c = _a.autoscrollSpeed, autoscrollSpeed = _c === void 0 ? constants_1.DEFAULT_PROPS.autoscrollSpeed : _c;
    var _d = (0, animatedValueContext_1.useAnimatedValues)(), scrollOffset = _d.scrollOffset, scrollViewSize = _d.scrollViewSize, containerSize = _d.containerSize, hoverAnim = _d.hoverAnim, isDraggingCell = _d.isDraggingCell, activeCellSize = _d.activeCellSize, panGestureState = _d.panGestureState;
    var isScrolledUp = (0, useNode_1.useNode)((0, react_native_reanimated_1.lessOrEq)((0, react_native_reanimated_1.sub)(scrollOffset, constants_1.SCROLL_POSITION_TOLERANCE), 0));
    var isScrolledDown = (0, useNode_1.useNode)((0, react_native_reanimated_1.greaterOrEq)((0, react_native_reanimated_1.add)(scrollOffset, containerSize, constants_1.SCROLL_POSITION_TOLERANCE), scrollViewSize));
    var distToTopEdge = (0, useNode_1.useNode)((0, react_native_reanimated_1.max)(0, hoverAnim));
    var distToBottomEdge = (0, useNode_1.useNode)((0, react_native_reanimated_1.max)(0, (0, react_native_reanimated_1.sub)(containerSize, (0, react_native_reanimated_1.add)(hoverAnim, activeCellSize))));
    var isAtTopEdge = (0, useNode_1.useNode)((0, react_native_reanimated_1.lessOrEq)(distToTopEdge, autoscrollThreshold));
    var isAtBottomEdge = (0, useNode_1.useNode)((0, react_native_reanimated_1.lessOrEq)(distToBottomEdge, autoscrollThreshold));
    var isAtEdge = (0, useNode_1.useNode)((0, react_native_reanimated_1.or)(isAtBottomEdge, isAtTopEdge));
    var autoscrollParams = [
        distToTopEdge,
        distToBottomEdge,
        scrollOffset,
        isScrolledUp,
        isScrolledDown,
    ];
    var targetScrollOffset = (0, react_native_reanimated_1.useValue)(0);
    var resolveAutoscroll = (0, react_1.useRef)();
    var isAutoScrollInProgressNative = (0, react_native_reanimated_1.useValue)(0);
    var isAutoScrollInProgress = (0, react_1.useRef)({
        js: false,
        native: isAutoScrollInProgressNative,
    });
    var isDraggingCellJS = (0, react_1.useRef)(false);
    (0, react_native_reanimated_1.useCode)(function () {
        return (0, react_native_reanimated_1.block)([
            (0, react_native_reanimated_1.onChange)(isDraggingCell, (0, react_native_reanimated_1.call)([isDraggingCell], function (_a) {
                var v = _a[0];
                isDraggingCellJS.current = !!v;
            })),
        ]);
    }, []);
    // Ensure that only 1 call to autoscroll is active at a time
    var autoscrollLooping = (0, react_1.useRef)(false);
    var onAutoscrollComplete = function (params) {
        var _a;
        isAutoScrollInProgress.current.js = false;
        (_a = resolveAutoscroll.current) === null || _a === void 0 ? void 0 : _a.call(resolveAutoscroll, params);
    };
    var scrollToAsync = function (offset) {
        return new Promise(function (resolve) {
            var _a;
            resolveAutoscroll.current = resolve;
            targetScrollOffset.setValue(offset);
            isAutoScrollInProgress.current.native.setValue(1);
            isAutoScrollInProgress.current.js = true;
            function getFlatListNode() {
                if (!flatListRef || !("current" in flatListRef) || !flatListRef.current)
                    return null;
                if ("scrollToOffset" in flatListRef.current)
                    return flatListRef.current;
                if ("getNode" in flatListRef.current) {
                    //@ts-ignore backwards compat
                    return flatListRef.current.getNode();
                }
                return null;
            }
            var flatListNode = getFlatListNode();
            (_a = flatListNode === null || flatListNode === void 0 ? void 0 : flatListNode.scrollToOffset) === null || _a === void 0 ? void 0 : _a.call(flatListNode, { offset: offset });
        });
    };
    var getScrollTargetOffset = function (distFromTop, distFromBottom, scrollOffset, isScrolledUp, isScrolledDown) {
        if (isAutoScrollInProgress.current.js)
            return -1;
        var scrollUp = distFromTop < autoscrollThreshold;
        var scrollDown = distFromBottom < autoscrollThreshold;
        if (!(scrollUp || scrollDown) ||
            (scrollUp && isScrolledUp) ||
            (scrollDown && isScrolledDown))
            return -1;
        var distFromEdge = scrollUp ? distFromTop : distFromBottom;
        var speedPct = 1 - distFromEdge / autoscrollThreshold;
        var offset = speedPct * autoscrollSpeed;
        var targetOffset = scrollUp
            ? Math.max(0, scrollOffset - offset)
            : scrollOffset + offset;
        return targetOffset;
    };
    var autoscroll = function (params) { return __awaiter(_this, void 0, void 0, function () {
        var shouldScroll, curParams, distFromTop, distFromBottom, scrollOffset_1, isScrolledUp_1, isScrolledDown_1, targetOffset, scrollingUpAtTop, scrollingDownAtBottom, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (autoscrollLooping.current) {
                        return [2 /*return*/];
                    }
                    autoscrollLooping.current = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 8, 9]);
                    shouldScroll = true;
                    curParams = params;
                    _a.label = 2;
                case 2:
                    if (!shouldScroll) return [3 /*break*/, 7];
                    distFromTop = curParams[0], distFromBottom = curParams[1], scrollOffset_1 = curParams[2], isScrolledUp_1 = curParams[3], isScrolledDown_1 = curParams[4];
                    targetOffset = getScrollTargetOffset(distFromTop, distFromBottom, scrollOffset_1, !!isScrolledUp_1, !!isScrolledDown_1);
                    scrollingUpAtTop = !!(isScrolledUp_1 && targetOffset <= scrollOffset_1);
                    scrollingDownAtBottom = !!(isScrolledDown_1 && targetOffset >= scrollOffset_1);
                    shouldScroll =
                        targetOffset >= 0 &&
                            isDraggingCellJS.current &&
                            !scrollingUpAtTop &&
                            !scrollingDownAtBottom;
                    if (!shouldScroll) return [3 /*break*/, 6];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, scrollToAsync(targetOffset)];
                case 4:
                    curParams = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 9];
                case 8:
                    autoscrollLooping.current = false;
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var checkAutoscroll = (0, useNode_1.useNode)((0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.and)(isAtEdge, (0, react_native_reanimated_1.not)((0, react_native_reanimated_1.and)(isAtTopEdge, isScrolledUp)), (0, react_native_reanimated_1.not)((0, react_native_reanimated_1.and)(isAtBottomEdge, isScrolledDown)), (0, react_native_reanimated_1.eq)(panGestureState, react_native_gesture_handler_1.State.ACTIVE), (0, react_native_reanimated_1.not)(isAutoScrollInProgress.current.native)), (0, react_native_reanimated_1.call)(autoscrollParams, autoscroll)));
    (0, react_native_reanimated_1.useCode)(function () { return checkAutoscroll; }, []);
    var onScrollNode = (0, useNode_1.useNode)((0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.and)(isAutoScrollInProgress.current.native, (0, react_native_reanimated_1.or)(
    // We've scrolled to where we want to be
    (0, react_native_reanimated_1.lessOrEq)((0, react_native_reanimated_1.abs)((0, react_native_reanimated_1.sub)(targetScrollOffset, scrollOffset)), constants_1.SCROLL_POSITION_TOLERANCE), 
    // We're at the start, but still want to scroll farther up
    (0, react_native_reanimated_1.and)(isScrolledUp, (0, react_native_reanimated_1.lessOrEq)(targetScrollOffset, scrollOffset)), 
    // We're at the end, but still want to scroll further down
    (0, react_native_reanimated_1.and)(isScrolledDown, (0, react_native_reanimated_1.greaterOrEq)(targetScrollOffset, scrollOffset)))), [
        // Finish scrolling
        (0, react_native_reanimated_1.set)(isAutoScrollInProgress.current.native, 0),
        (0, react_native_reanimated_1.call)(autoscrollParams, onAutoscrollComplete),
    ]));
    return onScrollNode;
}
exports.useAutoScroll = useAutoScroll;
