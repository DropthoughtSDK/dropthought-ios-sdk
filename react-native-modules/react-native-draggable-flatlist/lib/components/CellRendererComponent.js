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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var draggableFlatListContext_1 = require("../context/draggableFlatListContext");
var constants_1 = require("../constants");
var useCellTranslate_1 = require("../hooks/useCellTranslate");
var utils_1 = require("../utils");
var refContext_1 = require("../context/refContext");
var animatedValueContext_1 = require("../context/animatedValueContext");
var cellContext_1 = __importDefault(require("../context/cellContext"));
function CellRendererComponent(props) {
    var item = props.item, index = props.index, onLayout = props.onLayout, children = props.children;
    var currentIndexAnim = (0, react_native_reanimated_1.useValue)(index);
    (0, react_1.useLayoutEffect)(function () {
        currentIndexAnim.setValue(index);
    }, [index, currentIndexAnim]);
    var viewRef = (0, react_1.useRef)(null);
    var _a = (0, refContext_1.useRefs)(), cellDataRef = _a.cellDataRef, propsRef = _a.propsRef, scrollOffsetRef = _a.scrollOffsetRef, containerRef = _a.containerRef;
    var horizontalAnim = (0, animatedValueContext_1.useAnimatedValues)().horizontalAnim;
    var _b = (0, draggableFlatListContext_1.useDraggableFlatListContext)(), activeKey = _b.activeKey, keyExtractor = _b.keyExtractor, horizontal = _b.horizontal;
    var key = keyExtractor(item, index);
    var offset = (0, react_native_reanimated_1.useValue)(-1);
    var size = (0, react_native_reanimated_1.useValue)(-1);
    var translate = (0, useCellTranslate_1.useCellTranslate)({
        cellOffset: offset,
        cellSize: size,
        cellIndex: currentIndexAnim,
    });
    (0, react_1.useMemo)(function () {
        // prevent flicker on web
        if (constants_1.isWeb)
            translate.setValue(0);
    }, [index]); //eslint-disable-line react-hooks/exhaustive-deps
    var isActive = activeKey === key;
    var style = (0, react_1.useMemo)(function () { return ({
        transform: [
            { translateX: (0, react_native_reanimated_1.cond)(horizontalAnim, translate, 0) },
            { translateY: (0, react_native_reanimated_1.cond)(horizontalAnim, 0, translate) },
        ],
    }); }, [horizontalAnim, translate]);
    var updateCellMeasurements = (0, react_1.useCallback)(function () {
        var _a;
        var onSuccess = function (x, y, w, h) {
            if (constants_1.isWeb && horizontal)
                x += scrollOffsetRef.current;
            var cellOffset = horizontal ? x : y;
            var cellSize = horizontal ? w : h;
            cellDataRef.current.set(key, {
                measurements: { size: cellSize, offset: cellOffset },
            });
            size.setValue(cellSize);
            offset.setValue(cellOffset);
        };
        var onFail = function () {
            var _a;
            if ((_a = propsRef.current) === null || _a === void 0 ? void 0 : _a.debug) {
                console.log("## on measure fail, index: ".concat(index));
            }
        };
        // findNodeHandle is being deprecated. This is no longer necessary if using reanimated v2
        // remove once v1 is no longer supported
        var containerNode = containerRef.current;
        var viewNode = constants_1.isReanimatedV2
            ? viewRef.current
            : (_a = viewRef.current) === null || _a === void 0 ? void 0 : _a.getNode();
        //@ts-ignore
        var nodeHandle = constants_1.isReanimatedV2
            ? containerNode
            : (0, react_native_1.findNodeHandle)(containerNode);
        if (viewNode && nodeHandle) {
            //@ts-ignore
            viewNode.measureLayout(nodeHandle, onSuccess, onFail);
        }
    }, [
        cellDataRef,
        horizontal,
        index,
        key,
        offset,
        propsRef,
        size,
        scrollOffsetRef,
        containerRef,
    ]);
    (0, react_1.useEffect)(function () {
        if (constants_1.isWeb) {
            // onLayout isn't called on web when the cell index changes, so we manually re-measure
            updateCellMeasurements();
        }
    }, [index, updateCellMeasurements]);
    var onCellLayout = (0, react_1.useCallback)(function (e) {
        updateCellMeasurements();
        if (onLayout)
            onLayout(e);
    }, [updateCellMeasurements, onLayout]);
    // changing zIndex crashes android:
    // https://github.com/facebook/react-native/issues/28751
    return (react_1.default.createElement(react_native_reanimated_1.default.View, __assign({}, props, { ref: viewRef, onLayout: onCellLayout, style: [
            constants_1.isAndroid && { elevation: isActive ? 1 : 0 },
            { flexDirection: horizontal ? "row" : "column" },
            (constants_1.isWeb || constants_1.isIOS) && { zIndex: isActive ? 999 : 0 },
        ], pointerEvents: activeKey ? "none" : "auto" }),
        react_1.default.createElement(react_native_reanimated_1.default.View, __assign({}, props, { 
            // Including both animated styles and non-animated styles causes react-native-web
            // to ignore updates in non-animated styles. Solution is to separate animated styles from non-animated styles
            style: [props.style, style] }),
            react_1.default.createElement(cellContext_1.default, { isActive: isActive }, children))));
}
exports.default = (0, utils_1.typedMemo)(CellRendererComponent);
