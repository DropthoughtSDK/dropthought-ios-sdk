export type RatingIconType = 'smiley' | 'star' | 'heart' | 'thumb';
export namespace RatingIconType {
    const smiley: string;
    const star: string;
    const heart: string;
    const thumb: string;
}
export function defaultIcon(type: QuestionSubType, colorScheme: string): any;
export function getIcons(type: QuestionSubType, optionLength: number): string[];
export function getSelectedIcons(type: QuestionSubType, optionLength: number): string[];
export type QuestionSubType = import('../data').QuestionSubType;
