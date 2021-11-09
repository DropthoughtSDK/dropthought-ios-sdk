import * as React from 'react';
import { useWindowDimensions as useRNDimensions } from 'react-native';
/** @enum {'phone' | 'tablet'} */

export const DimensionWidthType = {
  phone: 'phone',
  tablet: 'tablet'
};
/** @enum {'portrait' | 'landscape'} */

export const OrientationType = {
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


export const useWindowDimensions = () => {
  const scaledSize = useRNDimensions();
  return React.useMemo(() => ({ ...scaledSize,
    widthType: getWidthType(scaledSize)
  }), [scaledSize]);
};
/**
 * @returns {DimensionWidthType}
 */

export const useDimensionWidthType = () => {
  const windowDimensions = useWindowDimensions();
  return windowDimensions.widthType;
};
/**
 * @returns {OrientationType}
 */

export const useOrientationType = () => {
  const scaledSize = useRNDimensions();

  if (scaledSize.width > scaledSize.height) {
    return OrientationType.landscape;
  } else {
    return OrientationType.portrait;
  }
};
//# sourceMappingURL=useWindowDimensions.js.map