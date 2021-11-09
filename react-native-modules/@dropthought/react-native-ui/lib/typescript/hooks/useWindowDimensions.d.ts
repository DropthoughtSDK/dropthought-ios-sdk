/** @enum {'phone' | 'tablet'} */
export declare const DimensionWidthType: {
    phone: string;
    tablet: string;
};
/** @enum {'portrait' | 'landscape'} */
export declare const OrientationType: {
    portrait: string;
    landscape: string;
};
/**
 * @returns {WindowDimensions}
 */
export declare const useWindowDimensions: () => {
    widthType: string;
    width: number;
    height: number;
    scale: number;
    fontScale: number;
};
/**
 * @returns {DimensionWidthType}
 */
export declare const useDimensionWidthType: () => string;
/**
 * @returns {OrientationType}
 */
export declare const useOrientationType: () => string;
