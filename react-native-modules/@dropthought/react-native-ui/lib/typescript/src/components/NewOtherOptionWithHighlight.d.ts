import * as React from 'react';
import type { Props as NewOptionWithHighlightProps } from './NewOptionWithHighlight';
import type { Question, Feedback } from '../data';
declare type Props = NewOptionWithHighlightProps & {
    textValue: string | undefined;
    onChangeValue: (id: any, value: {
        checked: boolean;
        value: string | undefined;
    }) => void;
    feedback: Feedback;
    question: Question;
    anonymous: boolean;
};
declare function NewOtherOptionWithHighlight(props: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof NewOtherOptionWithHighlight>;
export default _default;
