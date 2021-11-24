import * as React from 'react';
/**
 * The ProgressBar will use `value` and `maxValue` to
 * compute the percentage
 */
declare type Props = {
    value: number;
    maxValue: number;
    themeColor: string;
    rtl: boolean;
};
declare const _default: React.MemoExoticComponent<({ value, maxValue, themeColor, rtl }: Props) => JSX.Element>;
export default _default;
