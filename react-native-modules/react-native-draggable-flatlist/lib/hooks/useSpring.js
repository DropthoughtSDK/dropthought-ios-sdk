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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSpring = void 0;
var react_1 = require("react");
var react_native_reanimated_1 = require("react-native-reanimated");
var constants_1 = require("../constants");
function useSpring(_a) {
    var _b = _a === void 0 ? { config: constants_1.DEFAULT_ANIMATION_CONFIG } : _a, configParam = _b.config;
    var toValue = (0, react_native_reanimated_1.useValue)(0);
    var clock = (0, react_1.useMemo)(function () { return new react_native_reanimated_1.Clock(); }, []);
    var finished = (0, react_native_reanimated_1.useValue)(0);
    var velocity = (0, react_native_reanimated_1.useValue)(0);
    var position = (0, react_native_reanimated_1.useValue)(0);
    var time = (0, react_native_reanimated_1.useValue)(0);
    var state = (0, react_1.useMemo)(function () { return ({
        finished: finished,
        velocity: velocity,
        position: position,
        time: time,
    }); }, [finished, velocity, position, time]);
    var config = (0, react_1.useMemo)(function () { return (__assign(__assign(__assign({}, constants_1.DEFAULT_ANIMATION_CONFIG), configParam), { toValue: toValue })); }, [configParam, toValue]);
    return (0, react_1.useMemo)(function () { return ({
        clock: clock,
        state: state,
        config: config,
    }); }, [clock, state, config]);
}
exports.useSpring = useSpring;
