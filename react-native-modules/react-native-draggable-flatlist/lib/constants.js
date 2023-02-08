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
exports.isReanimatedV2 = exports.isWeb = exports.isAndroid = exports.isIOS = exports.DEFAULT_PROPS = exports.DEFAULT_ANIMATION_CONFIG = exports.SCROLL_POSITION_TOLERANCE = void 0;
var react_native_1 = require("react-native");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
// Fire onScrollComplete when within this many px of target offset
exports.SCROLL_POSITION_TOLERANCE = 2;
exports.DEFAULT_ANIMATION_CONFIG = {
    damping: 20,
    mass: 0.2,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.2,
    restDisplacementThreshold: 0.2,
};
exports.DEFAULT_PROPS = {
    autoscrollThreshold: 30,
    autoscrollSpeed: 100,
    animationConfig: exports.DEFAULT_ANIMATION_CONFIG,
    scrollEnabled: true,
    dragHitSlop: 0,
    activationDistance: 0,
    dragItemOverflow: false,
    outerScrollOffset: new react_native_reanimated_1.default.Value(0),
};
exports.isIOS = react_native_1.Platform.OS === "ios";
exports.isAndroid = react_native_1.Platform.OS === "android";
exports.isWeb = react_native_1.Platform.OS === "web";
// Is there a better way to check for v2?
exports.isReanimatedV2 = !!react_native_reanimated_1.useSharedValue;
if (!exports.isReanimatedV2) {
    console.warn("Your version of react-native-reanimated is too old for react-native-draggable-flatlist. It may not work as expected.");
}
