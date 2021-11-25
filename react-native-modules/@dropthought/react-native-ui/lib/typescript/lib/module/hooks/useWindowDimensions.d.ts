export type DimensionWidthType = 'phone' | 'tablet';
export namespace DimensionWidthType {
    const phone: string;
    const tablet: string;
}
export type OrientationType = 'portrait' | 'landscape';
export namespace OrientationType {
    const portrait: string;
    const landscape: string;
}
export function useWindowDimensions(): WindowDimensions;
export function useDimensionWidthType(): DimensionWidthType;
export function useOrientationType(): OrientationType;
export type DimensionType = {
    widthType: DimensionWidthType;
};
export type WindowDimensions = DimensionType & any;
