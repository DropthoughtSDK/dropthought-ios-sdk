"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNode = void 0;
var react_1 = require("react");
function useNode(node) {
    var ref = (0, react_1.useRef)(null);
    if (ref.current === null) {
        ref.current = node;
    }
    return ref.current;
}
exports.useNode = useNode;
