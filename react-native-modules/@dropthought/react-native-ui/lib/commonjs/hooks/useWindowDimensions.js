"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWindowDimensions = exports.useOrientationType = exports.useDimensionWidthType = exports.OrientationType = exports.DimensionWidthType = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DimensionWidthType = exports.DimensionWidthType = Object.freeze({
  phone: 'phone',
  tablet: 'tablet'
});

/** @enum {'portrait' | 'landscape'} */
const OrientationType = exports.OrientationType = {
  portrait: 'portrait',
  landscape: 'landscape'
};

/**
 * @typedef {object} DimensionType
 * @property {DimensionWidthType} widthType
 */
/** @typedef {DimensionType&ScaledSize} WindowDimensions */

/**
 * @param {ScaledSize} scaledSize
 * @returns {DimensionWidthType}
 */
const getWidthType = scaledSize => {
  if (scaledSize.width < 768) return DimensionWidthType.phone;
  return DimensionWidthType.tablet;
};

/**
 * @returns {WindowDimensions}
 */
const useWindowDimensions = () => {
  const scaledSize = (0, _reactNative.useWindowDimensions)();
  return React.useMemo(() => ({
    ...scaledSize,
    widthType: getWidthType(scaledSize)
  }), [scaledSize]);
};

/**
 * @returns {DimensionWidthType}
 */
exports.useWindowDimensions = useWindowDimensions;
const useDimensionWidthType = () => {
  const windowDimensions = useWindowDimensions();
  return windowDimensions.widthType;
};

/**
 * @returns {OrientationType}
 */
exports.useDimensionWidthType = useDimensionWidthType;
const useOrientationType = () => {
  const scaledSize = (0, _reactNative.useWindowDimensions)();
  if (scaledSize.width > scaledSize.height) {
    return OrientationType.landscape;
  } else {
    return OrientationType.portrait;
  }
};
exports.useOrientationType = useOrientationType;
//# sourceMappingURL=useWindowDimensions.js.map