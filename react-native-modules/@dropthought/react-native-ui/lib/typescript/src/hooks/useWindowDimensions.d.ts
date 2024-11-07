export declare const DimensionWidthType: Readonly<{
    phone: "phone";
    tablet: "tablet";
}>;
/** @enum {'portrait' | 'landscape'} */
export declare const OrientationType: {
    portrait: string;
    landscape: string;
};
/**
 * @returns {WindowDimensions}
 */
export declare const useWindowDimensions: () => {
    widthType: "phone" | "tablet";
    width: number;
    height: number;
    scale: number;
    fontScale: number;
};
/**
 * @returns {DimensionWidthType}
 */
export declare const useDimensionWidthType: () => "phone" | "tablet";
/**
 * @returns {OrientationType}
 */
export declare const useOrientationType: () => string;
//# sourceMappingURL=useWindowDimensions.d.ts.map