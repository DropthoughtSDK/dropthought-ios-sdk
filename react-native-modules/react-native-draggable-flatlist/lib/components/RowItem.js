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
var react_1 = __importStar(require("react"));
var draggableFlatListContext_1 = require("../context/draggableFlatListContext");
var refContext_1 = require("../context/refContext");
var utils_1 = require("../utils");
function RowItem(props) {
    var propsRef = (0, react_1.useRef)(props);
    propsRef.current = props;
    var activeKey = (0, draggableFlatListContext_1.useDraggableFlatListContext)().activeKey;
    var activeKeyRef = (0, react_1.useRef)(activeKey);
    activeKeyRef.current = activeKey;
    var keyToIndexRef = (0, refContext_1.useRefs)().keyToIndexRef;
    var drag = (0, react_1.useCallback)(function () {
        var _a = propsRef.current, drag = _a.drag, itemKey = _a.itemKey, debug = _a.debug;
        if (activeKeyRef.current) {
            // already dragging an item, noop
            if (debug)
                console.log("## attempt to drag item while another item is already active, noop");
        }
        drag(itemKey);
    }, []);
    var renderItem = props.renderItem, item = props.item, itemKey = props.itemKey, extraData = props.extraData;
    return (react_1.default.createElement(MemoizedInner, { isActive: activeKey === itemKey, drag: drag, renderItem: renderItem, item: item, index: keyToIndexRef.current.get(itemKey), extraData: extraData }));
}
exports.default = (0, utils_1.typedMemo)(RowItem);
function Inner(_a) {
    var isActive = _a.isActive, item = _a.item, drag = _a.drag, index = _a.index, renderItem = _a.renderItem;
    return renderItem({ isActive: isActive, item: item, drag: drag, index: index });
}
var MemoizedInner = (0, utils_1.typedMemo)(Inner);
