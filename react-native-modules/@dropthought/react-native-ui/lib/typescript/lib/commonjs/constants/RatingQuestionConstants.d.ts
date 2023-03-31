export var __esModule: boolean;
export type QuestionSubType = import('../data').QuestionSubType;
export type RatingIconType = 'smiley' | 'star' | 'heart' | 'thumb';
export namespace RatingIconType {
    const smiley: string;
    const star: string;
    const heart: string;
    const thumb: string;
}
export function defaultIcon(type: any, colorScheme: any): any;
/**
 * @param {QuestionSubType} type
 * @param {number} optionLength
 * @returns {string[]}
 */
export function getIcons(type: any, optionLength: number): string[];
export function getSelectedIcons(type: any, optionLength: any): any[] | undefined;
