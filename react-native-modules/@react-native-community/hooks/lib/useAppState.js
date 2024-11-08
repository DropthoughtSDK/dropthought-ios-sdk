"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppState = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
function useAppState() {
    var currentState = react_native_1.AppState.currentState;
    var _a = (0, react_1.useState)(currentState), appState = _a[0], setAppState = _a[1];
    (0, react_1.useEffect)(function () {
        function onChange(newState) {
            setAppState(newState);
        }
        var subscription = react_native_1.AppState.addEventListener('change', onChange);
        return function () {
            subscription.remove();
        };
    }, []);
    return appState;
}
exports.useAppState = useAppState;
//# sourceMappingURL=useAppState.js.map