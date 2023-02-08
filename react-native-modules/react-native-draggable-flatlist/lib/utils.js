"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedMemo = void 0;
var react_1 = __importDefault(require("react"));
// Fixes bug with useMemo + generic types:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087#issuecomment-542793243
exports.typedMemo = react_1.default.memo;
