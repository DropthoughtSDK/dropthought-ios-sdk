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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpacityDecorator = exports.ShadowDecorator = exports.ScaleDecorator = exports.useOnCellActiveAnimation = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var draggableFlatListContext_1 = require("../context/draggableFlatListContext");
var useNode_1 = require("../hooks/useNode");
var useOnCellActiveAnimation_1 = require("../hooks/useOnCellActiveAnimation");
Object.defineProperty(exports, "useOnCellActiveAnimation", { enumerable: true, get: function () { return useOnCellActiveAnimation_1.useOnCellActiveAnimation; } });
var useOnCellActiveAnimation_2 = require("../hooks/useOnCellActiveAnimation");
// support older versions of Reanimated v1 by using the old interpolate function
// if interpolateNode not available.
var interpolateFn = (react_native_reanimated_1.interpolateNode ||
    react_native_reanimated_1.interpolate);
var ScaleDecorator = function (_a) {
    var _b = _a.activeScale, activeScale = _b === void 0 ? 1.1 : _b, children = _a.children;
    var _c = (0, useOnCellActiveAnimation_2.useOnCellActiveAnimation)({
        animationConfig: { mass: 0.1, restDisplacementThreshold: 0.0001 },
    }), isActive = _c.isActive, onActiveAnim = _c.onActiveAnim;
    var animScale = (0, useNode_1.useNode)(interpolateFn(onActiveAnim, {
        inputRange: [0, 1],
        outputRange: [1, activeScale],
    }));
    var horizontal = (0, draggableFlatListContext_1.useDraggableFlatListContext)().horizontal;
    var scale = isActive ? animScale : 1;
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { style: [
            { transform: [{ scaleX: scale }, { scaleY: scale }] },
            horizontal && styles.horizontal,
        ] }, children));
};
exports.ScaleDecorator = ScaleDecorator;
var ShadowDecorator = function (_a) {
    var _b = _a.elevation, elevation = _b === void 0 ? 10 : _b, _c = _a.color, color = _c === void 0 ? "black" : _c, _d = _a.opacity, opacity = _d === void 0 ? 0.25 : _d, _e = _a.radius, radius = _e === void 0 ? 5 : _e, children = _a.children;
    var _f = (0, useOnCellActiveAnimation_2.useOnCellActiveAnimation)(), isActive = _f.isActive, onActiveAnim = _f.onActiveAnim;
    var horizontal = (0, draggableFlatListContext_1.useDraggableFlatListContext)().horizontal;
    var shadowOpacity = (0, useNode_1.useNode)((0, react_native_reanimated_1.multiply)(onActiveAnim, opacity));
    var style = {
        elevation: isActive ? elevation : 0,
        shadowRadius: isActive ? radius : 0,
        shadowColor: isActive ? color : "transparent",
        shadowOpacity: isActive ? shadowOpacity : 0,
    };
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { style: [style, horizontal && styles.horizontal] }, children));
};
exports.ShadowDecorator = ShadowDecorator;
var OpacityDecorator = function (_a) {
    var _b = _a.activeOpacity, activeOpacity = _b === void 0 ? 0.25 : _b, children = _a.children;
    var _c = (0, useOnCellActiveAnimation_2.useOnCellActiveAnimation)(), isActive = _c.isActive, onActiveAnim = _c.onActiveAnim;
    var horizontal = (0, draggableFlatListContext_1.useDraggableFlatListContext)().horizontal;
    var opacity = (0, useNode_1.useNode)(interpolateFn(onActiveAnim, {
        inputRange: [0, 1],
        outputRange: [1, activeOpacity],
    }));
    var style = {
        opacity: isActive ? opacity : 1,
    };
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { style: [style, horizontal && styles.horizontal] }, children));
};
exports.OpacityDecorator = OpacityDecorator;
var styles = react_native_1.StyleSheet.create({
    horizontal: {
        flexDirection: "row",
        flex: 1,
    },
});
