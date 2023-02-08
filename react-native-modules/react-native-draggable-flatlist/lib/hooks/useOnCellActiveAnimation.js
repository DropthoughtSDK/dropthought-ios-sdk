"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnCellActiveAnimation = void 0;
var react_native_reanimated_1 = require("react-native-reanimated");
var animatedValueContext_1 = require("../context/animatedValueContext");
var cellContext_1 = require("../context/cellContext");
var procs_1 = require("../procs");
var useSpring_1 = require("./useSpring");
function useOnCellActiveAnimation(_a) {
    var _b = _a === void 0 ? { animationConfig: {} } : _a, animationConfig = _b.animationConfig;
    var _c = (0, useSpring_1.useSpring)({ config: animationConfig }), clock = _c.clock, state = _c.state, config = _c.config;
    var isDraggingCell = (0, animatedValueContext_1.useAnimatedValues)().isDraggingCell;
    var isActive = (0, cellContext_1.useIsActive)();
    (0, react_native_reanimated_1.useCode)(function () {
        return (0, react_native_reanimated_1.block)([
            (0, react_native_reanimated_1.onChange)(isDraggingCell, [
                //@ts-ignore
                (0, react_native_reanimated_1.set)(config.toValue, (0, react_native_reanimated_1.cond)(isDraggingCell, 1, 0)),
                (0, react_native_reanimated_1.startClock)(clock),
            ]),
            (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.clockRunning)(clock), [
                (0, procs_1.springFill)(clock, state, config),
                (0, react_native_reanimated_1.cond)(state.finished, [
                    (0, react_native_reanimated_1.stopClock)(clock),
                    (0, react_native_reanimated_1.set)(state.finished, 0),
                    (0, react_native_reanimated_1.set)(state.time, 0),
                    (0, react_native_reanimated_1.set)(state.velocity, 0),
                ]),
            ]),
        ]);
    }, []);
    return {
        isActive: isActive,
        onActiveAnim: state.position,
    };
}
exports.useOnCellActiveAnimation = useOnCellActiveAnimation;
