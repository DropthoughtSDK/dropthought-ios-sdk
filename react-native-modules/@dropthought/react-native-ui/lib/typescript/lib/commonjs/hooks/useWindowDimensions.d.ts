export var __esModule: boolean;
export type DimensionWidthType = 'portrait' | 'landscape';
export type DimensionType = {
    widthType: DimensionWidthType;
};
export type WindowDimensions = DimensionType & any;
export type DimensionWidthType = 'phone' | 'tablet';
export namespace DimensionWidthType {
    const phone: string;
    const tablet: string;
}
export namespace OrientationType {
    const portrait: string;
    const landscape: string;
}
/**
 * @returns {WindowDimensions}
 */
export function useWindowDimensions(): WindowDimensions;
export function useDimensionWidthType(): any;
export function useOrientationType(): string;
