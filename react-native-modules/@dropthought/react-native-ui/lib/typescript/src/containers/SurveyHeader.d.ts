import * as React from 'react';
import type { Survey, Question } from '../data';
declare type Props = {
    survey: Survey;
    pageIndex: number;
    question?: Question;
    backgroundColor?: string;
    onClose: () => void;
};
declare const _default: React.MemoExoticComponent<(props: Props) => JSX.Element>;
export default _default;
