"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWindowDimensions = exports.useOrientationType = exports.useDimensionWidthType = exports.OrientationType = exports.DimensionWidthType = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** @enum {'phone' | 'tablet'} */
const DimensionWidthType = {
  phone: 'phone',
  tablet: 'tablet'
};
/** @enum {'portrait' | 'landscape'} */

exports.DimensionWidthType = DimensionWidthType;
const OrientationType = {
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

exports.OrientationType = OrientationType;

const getWidthType = scaledSize => {
  if (scaledSize.width < 768) return DimensionWidthType.phone;
  return DimensionWidthType.tablet;
};
/**
 * @returns {WindowDimensions}
 */


const useWindowDimensions = () => {
  const scaledSize = (0, _reactNative.useWindowDimensions)();
  return React.useMemo(() => ({ ...scaledSize,
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