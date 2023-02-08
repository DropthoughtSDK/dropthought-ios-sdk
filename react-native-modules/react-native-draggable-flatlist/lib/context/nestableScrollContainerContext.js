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
exports.useNestableScrollContainerContext = exports.NestableScrollContainerProvider = void 0;
var react_1 = __importStar(require("react"));
var react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
var NestableScrollContainerContext = react_1.default.createContext(undefined);
function useSetupNestableScrollContextValue() {
    var _a = (0, react_1.useState)(true), outerScrollEnabled = _a[0], setOuterScrollEnabled = _a[1];
    var scrollViewSize = (0, react_1.useMemo)(function () { return new react_native_reanimated_1.default.Value(0); }, []);
    var scrollableRef = (0, react_1.useRef)(null);
    var outerScrollOffset = (0, react_1.useMemo)(function () { return new react_native_reanimated_1.default.Value(0); }, []);
    var containerRef = (0, react_1.useRef)(null);
    var containerSize = (0, react_1.useMemo)(function () { return new react_native_reanimated_1.default.Value(0); }, []);
    var contextVal = (0, react_1.useMemo)(function () { return ({
        outerScrollEnabled: outerScrollEnabled,
        setOuterScrollEnabled: setOuterScrollEnabled,
        outerScrollOffset: outerScrollOffset,
        scrollViewSize: scrollViewSize,
        scrollableRef: scrollableRef,
        containerRef: containerRef,
        containerSize: containerSize,
    }); }, [outerScrollEnabled]);
    return contextVal;
}
function NestableScrollContainerProvider(_a) {
    var children = _a.children;
    var contextVal = useSetupNestableScrollContextValue();
    return (react_1.default.createElement(NestableScrollContainerContext.Provider, { value: contextVal }, children));
}
exports.NestableScrollContainerProvider = NestableScrollContainerProvider;
function useNestableScrollContainerContext() {
    var value = (0, react_1.useContext)(NestableScrollContainerContext);
    if (!value) {
        throw new Error("useNestableScrollContainerContext must be called from within NestableScrollContainerContext Provider!");
    }
    return value;
}
exports.useNestableScrollContainerContext = useNestableScrollContainerContext;
