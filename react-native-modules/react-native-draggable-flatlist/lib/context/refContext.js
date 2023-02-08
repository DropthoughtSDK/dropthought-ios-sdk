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
exports.useRefs = void 0;
var react_1 = __importStar(require("react"));
var react_2 = require("react");
var constants_1 = require("../constants");
var propsContext_1 = require("./propsContext");
var animatedValueContext_1 = require("./animatedValueContext");
var RefContext = react_1.default.createContext(undefined);
function RefProvider(_a) {
    var children = _a.children, flatListRef = _a.flatListRef;
    var value = useSetupRefs({ flatListRef: flatListRef });
    return react_1.default.createElement(RefContext.Provider, { value: value }, children);
}
exports.default = RefProvider;
function useRefs() {
    var value = (0, react_1.useContext)(RefContext);
    if (!value) {
        throw new Error("useRefs must be called from within a RefContext.Provider!");
    }
    return value;
}
exports.useRefs = useRefs;
function useSetupRefs(_a) {
    var flatListRefProp = _a.flatListRef;
    var props = (0, propsContext_1.useProps)();
    var _b = props.animationConfig, animationConfig = _b === void 0 ? constants_1.DEFAULT_PROPS.animationConfig : _b;
    var isTouchActiveNative = (0, animatedValueContext_1.useAnimatedValues)().isTouchActiveNative;
    var propsRef = (0, react_2.useRef)(props);
    propsRef.current = props;
    var animConfig = __assign(__assign({}, constants_1.DEFAULT_PROPS.animationConfig), animationConfig);
    var animationConfigRef = (0, react_2.useRef)(animConfig);
    animationConfigRef.current = animConfig;
    var cellDataRef = (0, react_2.useRef)(new Map());
    var keyToIndexRef = (0, react_2.useRef)(new Map());
    var containerRef = (0, react_2.useRef)(null);
    var flatListRefInner = (0, react_2.useRef)(null);
    var flatListRef = flatListRefProp || flatListRefInner;
    var panGestureHandlerRef = (0, react_2.useRef)(null);
    var scrollOffsetRef = (0, react_2.useRef)(0);
    var isTouchActiveRef = (0, react_2.useRef)({
        native: isTouchActiveNative,
        js: false,
    });
    var refs = (0, react_2.useMemo)(function () { return ({
        animationConfigRef: animationConfigRef,
        cellDataRef: cellDataRef,
        containerRef: containerRef,
        flatListRef: flatListRef,
        isTouchActiveRef: isTouchActiveRef,
        keyToIndexRef: keyToIndexRef,
        panGestureHandlerRef: panGestureHandlerRef,
        propsRef: propsRef,
        scrollOffsetRef: scrollOffsetRef,
    }); }, []);
    return refs;
}
