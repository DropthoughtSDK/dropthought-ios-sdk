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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestableScrollContainer = void 0;
var react_1 = __importStar(require("react"));
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var nestableScrollContainerContext_1 = require("../context/nestableScrollContainerContext");
var AnimatedScrollView = react_native_reanimated_1.default.createAnimatedComponent(react_native_gesture_handler_1.ScrollView);
function NestableScrollContainerInner(props) {
    var _a = (0, nestableScrollContainerContext_1.useNestableScrollContainerContext)(), outerScrollOffset = _a.outerScrollOffset, containerRef = _a.containerRef, containerSize = _a.containerSize, scrollViewSize = _a.scrollViewSize, scrollableRef = _a.scrollableRef, outerScrollEnabled = _a.outerScrollEnabled;
    var onScroll = (0, react_1.useMemo)(function () {
        return react_native_reanimated_1.default.event([
            {
                nativeEvent: function (_a) {
                    var contentOffset = _a.contentOffset;
                    return (0, react_native_reanimated_1.block)([(0, react_native_reanimated_1.set)(outerScrollOffset, contentOffset.y)]);
                },
            },
        ]);
    }, []);
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { ref: containerRef, onLayout: function (_a) {
            var layout = _a.nativeEvent.layout;
            containerSize.setValue(layout.height);
        } },
        react_1.default.createElement(AnimatedScrollView, __assign({}, props, { onContentSizeChange: function (w, h) {
                var _a;
                scrollViewSize.setValue(h);
                (_a = props.onContentSizeChange) === null || _a === void 0 ? void 0 : _a.call(props, w, h);
            }, scrollEnabled: outerScrollEnabled, ref: scrollableRef, scrollEventThrottle: 1, onScroll: onScroll }))));
}
function NestableScrollContainer(props) {
    return (react_1.default.createElement(nestableScrollContainerContext_1.NestableScrollContainerProvider, null,
        react_1.default.createElement(NestableScrollContainerInner, __assign({}, props))));
}
exports.NestableScrollContainer = NestableScrollContainer;
