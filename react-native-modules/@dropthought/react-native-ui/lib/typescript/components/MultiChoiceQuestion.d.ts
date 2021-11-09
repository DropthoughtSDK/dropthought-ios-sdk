import { PureComponent } from 'react';
import type { Question, Option, Feedback as OriginFeedback } from '../data';
declare type Feedback = OriginFeedback & {
    answers: (string | number)[];
};
declare type Props = {
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    forgot: boolean;
    feedback: Feedback;
    themeColor: string;
};
declare type State = {
    values: boolean[];
    options: Option[];
    otherText: string | undefined;
};
declare class MultiChoiceQuestion extends PureComponent<Props, State> {
    constructor(props: Props);
    feedback(values: boolean[], otherText: string | undefined): void;
    onOptionPressHandler(index: number): void;
    onChangeValueHandler(index: number, newValue: {
        value: string | undefined;
        checked: boolean;
    }): void;
    renderOptions(): JSX.Element[];
    render(): JSX.Element;
}
export default MultiChoiceQuestion;
