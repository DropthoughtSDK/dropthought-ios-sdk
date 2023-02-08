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
exports.NestableDraggableFlatList = exports.NestableDraggableFlatListInner = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var DraggableFlatList_1 = __importDefault(require("../components/DraggableFlatList"));
var nestableScrollContainerContext_1 = require("../context/nestableScrollContainerContext");
var useNestedAutoScroll_1 = require("../hooks/useNestedAutoScroll");
function NestableDraggableFlatListInner(props, ref) {
    var _this = this;
    var hasSuppressedWarnings = (0, react_1.useRef)(false);
    if (!hasSuppressedWarnings.current) {
        react_native_1.LogBox.ignoreLogs([
            "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing",
        ]); // Ignore log notification by message
        //@ts-ignore
        console.reportErrorsAsExceptions = false;
        hasSuppressedWarnings.current = true;
    }
    var _a = (0, nestableScrollContainerContext_1.useNestableScrollContainerContext)(), containerRef = _a.containerRef, outerScrollOffset = _a.outerScrollOffset, setOuterScrollEnabled = _a.setOuterScrollEnabled;
    var listVerticalOffset = (0, react_1.useMemo)(function () { return new react_native_reanimated_1.default.Value(0); }, []);
    var viewRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)({}), animVals = _b[0], setAnimVals = _b[1];
    (0, useNestedAutoScroll_1.useNestedAutoScroll)(animVals);
    var onListContainerLayout = function () { return __awaiter(_this, void 0, void 0, function () {
        var viewNode, nodeHandle, onSuccess, onFail;
        return __generator(this, function (_a) {
            viewNode = viewRef.current;
            nodeHandle = (0, react_native_1.findNodeHandle)(containerRef.current);
            onSuccess = function (_x, y) {
                listVerticalOffset.setValue(y);
            };
            onFail = function () {
                console.log("## nested draggable list measure fail");
            };
            //@ts-ignore
            viewNode.measureLayout(nodeHandle, onSuccess, onFail);
            return [2 /*return*/];
        });
    }); };
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { ref: viewRef, onLayout: onListContainerLayout },
        react_1.default.createElement(DraggableFlatList_1.default, __assign({ ref: ref, activationDistance: 20, autoscrollSpeed: 50, scrollEnabled: false }, props, { outerScrollOffset: outerScrollOffset, onDragBegin: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                setOuterScrollEnabled(false);
                (_a = props.onDragBegin) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([props], args, false));
            }, onDragEnd: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                (_a = props.onDragEnd) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([props], args, false));
                setOuterScrollEnabled(true);
            }, onAnimValInit: function (animVals) {
                var _a;
                setAnimVals(__assign(__assign({}, animVals), { hoverAnim: (0, react_native_reanimated_1.add)(animVals.hoverAnim, listVerticalOffset) }));
                (_a = props.onAnimValInit) === null || _a === void 0 ? void 0 : _a.call(props, animVals);
            } }))));
}
exports.NestableDraggableFlatListInner = NestableDraggableFlatListInner;
// Generic forwarded ref type assertion taken from:
// https://fettblog.eu/typescript-react-generic-forward-refs/#option-1%3A-type-assertion
exports.NestableDraggableFlatList = react_1.default.forwardRef(NestableDraggableFlatListInner);
