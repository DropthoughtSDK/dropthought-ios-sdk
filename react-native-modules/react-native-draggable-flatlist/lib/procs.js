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
exports.springFill = exports.setupCell = exports.hardReset = exports.getIsAfterActive = void 0;
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var constants_1 = require("./constants");
var set = react_native_reanimated_1.default.set, cond = react_native_reanimated_1.default.cond, add = react_native_reanimated_1.default.add, sub = react_native_reanimated_1.default.sub, block = react_native_reanimated_1.default.block, eq = react_native_reanimated_1.default.eq, neq = react_native_reanimated_1.default.neq, and = react_native_reanimated_1.default.and, divide = react_native_reanimated_1.default.divide, greaterThan = react_native_reanimated_1.default.greaterThan, greaterOrEq = react_native_reanimated_1.default.greaterOrEq, Value = react_native_reanimated_1.default.Value, spring = react_native_reanimated_1.default.spring, lessThan = react_native_reanimated_1.default.lessThan, lessOrEq = react_native_reanimated_1.default.lessOrEq, multiply = react_native_reanimated_1.default.multiply;
if (!react_native_reanimated_1.default.proc) {
    throw new Error("Incompatible Reanimated version (proc not found)");
}
// clock procs don't seem to work in web, not sure if there's a perf benefit to web procs anyway?
var proc = constants_1.isWeb ? function (cb) { return cb; } : react_native_reanimated_1.default.proc;
exports.getIsAfterActive = proc(function (currentIndex, activeIndex) {
    return greaterThan(currentIndex, activeIndex);
});
exports.hardReset = proc(function (position, finished, time, toValue) {
    return block([set(position, 0), set(finished, 0), set(time, 0), set(toValue, 0)]);
});
exports.setupCell = proc(function (currentIndex, size, offset, isAfterActive, prevToValue, prevSpacerIndex, activeIndex, activeCellSize, hoverOffset, spacerIndex, toValue, position, time, finished, runSpring, onFinished, isDraggingCell, placeholderOffset, prevIsDraggingCell, clock, disabled) {
    return block([
        cond(greaterThan(activeIndex, -1), [
            // Only update spacer if touch is not disabled.
            // Fixes android bugs where state would update with invalid touch values on touch end.
            cond((0, react_native_reanimated_1.not)(disabled), [
                // Determine whether this cell is after the active cell in the list
                set(isAfterActive, (0, exports.getIsAfterActive)(currentIndex, activeIndex)),
                // Determining spacer index is hard to visualize, see diagram: https://i.imgur.com/jRPf5t3.jpg
                cond(isAfterActive, [
                    cond(and(greaterOrEq(add(hoverOffset, activeCellSize), offset), lessThan(add(hoverOffset, activeCellSize), add(offset, divide(size, 2)))), set(spacerIndex, sub(currentIndex, 1))),
                    cond(and(greaterOrEq(add(hoverOffset, activeCellSize), add(offset, divide(size, 2))), lessThan(add(hoverOffset, activeCellSize), add(offset, size))), set(spacerIndex, currentIndex)),
                ], cond(lessThan(currentIndex, activeIndex), [
                    cond(and(lessThan(hoverOffset, add(offset, size)), greaterOrEq(hoverOffset, add(offset, divide(size, 2)))), set(spacerIndex, add(currentIndex, 1))),
                    cond(and(greaterOrEq(hoverOffset, offset), lessThan(hoverOffset, add(offset, divide(size, 2)))), set(spacerIndex, currentIndex)),
                ])),
                // Set placeholder offset
                cond(eq(spacerIndex, currentIndex), [
                    set(placeholderOffset, cond(isAfterActive, add(sub(offset, activeCellSize), size), offset)),
                ]),
            ]),
            cond(eq(currentIndex, activeIndex), [
                // If this cell is the active cell
                cond(isDraggingCell, [
                    // Set its position to the drag position
                    set(position, sub(hoverOffset, offset)),
                ], [
                    // Active item, not pressed in
                    // Set value hovering element will snap to once released
                    cond(prevIsDraggingCell, [
                        set(toValue, sub(placeholderOffset, offset)),
                        // The clock starts automatically when toValue changes, however, we need to handle the
                        // case where the item should snap back to its original location and toValue doesn't change
                        cond(eq(prevToValue, toValue), [
                            cond((0, react_native_reanimated_1.clockRunning)(clock), (0, react_native_reanimated_1.stopClock)(clock)),
                            set(time, 0),
                            set(finished, 0),
                            (0, react_native_reanimated_1.startClock)(clock),
                        ]),
                    ]),
                ]),
            ], [
                // Not the active item
                // Translate cell down if it is before active index and active cell has passed it.
                // Translate cell up if it is after the active index and active cell has passed it.
                set(toValue, cond(cond(isAfterActive, lessOrEq(currentIndex, spacerIndex), greaterOrEq(currentIndex, spacerIndex)), cond(isAfterActive, multiply(activeCellSize, -1), activeCellSize), 0)),
            ]),
            // If this cell should animate somewhere new, reset its state and start its clock
            cond(neq(toValue, prevToValue), [
                cond((0, react_native_reanimated_1.clockRunning)(clock), (0, react_native_reanimated_1.stopClock)(clock)),
                set(time, 0),
                set(finished, 0),
                (0, react_native_reanimated_1.startClock)(clock),
            ]),
            cond(neq(prevSpacerIndex, spacerIndex), [
                cond(eq(spacerIndex, -1), [
                    // Hard reset to prevent stale state bugs
                    cond((0, react_native_reanimated_1.clockRunning)(clock), (0, react_native_reanimated_1.stopClock)(clock)),
                    (0, exports.hardReset)(position, finished, time, toValue),
                ]),
            ]),
            cond(finished, [onFinished, set(time, 0), set(finished, 0)]),
            set(prevSpacerIndex, spacerIndex),
            set(prevToValue, toValue),
            set(prevIsDraggingCell, isDraggingCell),
            cond((0, react_native_reanimated_1.clockRunning)(clock), runSpring),
        ], [
            // // Reset the spacer index when drag ends
            cond(neq(spacerIndex, -1), set(spacerIndex, -1)),
            cond(neq(position, 0), set(position, 0)),
        ]),
        position,
    ]);
});
var betterSpring = proc(function (finished, velocity, position, time, prevPosition, toValue, damping, mass, stiffness, overshootClamping, restSpeedThreshold, restDisplacementThreshold, clock) {
    return spring(clock, {
        finished: finished,
        velocity: velocity,
        position: position,
        time: time,
        // @ts-ignore -- https://github.com/software-mansion/react-native-reanimated/blob/master/src/animations/spring.js#L177
        prevPosition: prevPosition,
    }, {
        toValue: toValue,
        damping: damping,
        mass: mass,
        stiffness: stiffness,
        overshootClamping: overshootClamping,
        restDisplacementThreshold: restDisplacementThreshold,
        restSpeedThreshold: restSpeedThreshold,
    });
});
function springFill(clock, state, config) {
    return betterSpring(state.finished, state.velocity, state.position, state.time, new Value(0), config.toValue, config.damping, config.mass, config.stiffness, config.overshootClamping, config.restSpeedThreshold, config.restDisplacementThreshold, clock);
}
exports.springFill = springFill;
