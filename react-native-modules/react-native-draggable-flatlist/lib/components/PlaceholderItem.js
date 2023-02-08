"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var animatedValueContext_1 = require("../context/animatedValueContext");
var draggableFlatListContext_1 = require("../context/draggableFlatListContext");
var propsContext_1 = require("../context/propsContext");
var refContext_1 = require("../context/refContext");
var useNode_1 = require("../hooks/useNode");
var utils_1 = require("../utils");
function PlaceholderItem(_a) {
    var _b, _c;
    var _d;
    var renderPlaceholder = _a.renderPlaceholder;
    var _e = (0, animatedValueContext_1.useAnimatedValues)(), activeCellSize = _e.activeCellSize, placeholderOffset = _e.placeholderOffset, spacerIndexAnim = _e.spacerIndexAnim, scrollOffset = _e.scrollOffset;
    var _f = (0, react_1.useState)(0), placeholderSize = _f[0], setPlaceholderSize = _f[1];
    var _g = (0, refContext_1.useRefs)(), keyToIndexRef = _g.keyToIndexRef, propsRef = _g.propsRef;
    var activeKey = (0, draggableFlatListContext_1.useDraggableFlatListContext)().activeKey;
    var horizontal = (0, propsContext_1.useProps)().horizontal;
    var onPlaceholderIndexChange = (0, react_1.useCallback)(function (index) {
        var _a, _b;
        (_b = (_a = propsRef.current).onPlaceholderIndexChange) === null || _b === void 0 ? void 0 : _b.call(_a, index);
    }, [propsRef]);
    (0, react_native_reanimated_1.useCode)(function () {
        return (0, react_native_reanimated_1.block)([
            (0, react_native_reanimated_1.onChange)(activeCellSize, (0, react_native_reanimated_1.call)([activeCellSize], function (_a) {
                var size = _a[0];
                // Using animated values to set height caused a bug where item wouldn't correctly update
                // so instead we mirror the animated value in component state.
                setPlaceholderSize(size);
            })),
            (0, react_native_reanimated_1.onChange)(spacerIndexAnim, (0, react_native_reanimated_1.call)([spacerIndexAnim], function (_a) {
                var i = _a[0];
                onPlaceholderIndexChange(i);
                if (i === -1)
                    setPlaceholderSize(0);
            })),
        ]);
    }, []);
    var translateKey = horizontal ? "translateX" : "translateY";
    var sizeKey = horizontal ? "width" : "height";
    var opacity = (0, useNode_1.useNode)((0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.greaterThan)(spacerIndexAnim, -1), 1, 0));
    var activeIndex = activeKey
        ? keyToIndexRef.current.get(activeKey)
        : undefined;
    var activeItem = activeIndex === undefined ? null : (_d = propsRef.current) === null || _d === void 0 ? void 0 : _d.data[activeIndex];
    var animStyle = (_b = {
            opacity: opacity
        },
        _b[sizeKey] = placeholderSize,
        _b.transform = [
            (_c = {}, _c[translateKey] = (0, react_native_reanimated_1.sub)(placeholderOffset, scrollOffset), _c),
        ],
        _b);
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { pointerEvents: activeKey ? "auto" : "none", style: [react_native_1.StyleSheet.absoluteFill, animStyle] }, !activeItem || activeIndex === undefined
        ? null
        : renderPlaceholder === null || renderPlaceholder === void 0 ? void 0 : renderPlaceholder({ item: activeItem, index: activeIndex })));
}
exports.default = (0, utils_1.typedMemo)(PlaceholderItem);
