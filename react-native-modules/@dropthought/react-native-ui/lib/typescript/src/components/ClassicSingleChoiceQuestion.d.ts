import { PureComponent } from 'react';
import type { Feedback as OriginFeedback, Question as OriginQuestion, Option } from '../data';
declare type Feedback = OriginFeedback & {
    answers: (string | number)[];
};
declare type Question = OriginQuestion & {
    options: string[];
    scale: string;
};
declare type Props = {
    mandatoryErrorMessage: string;
    question: Question;
    feedback: Feedback;
    onFeedback: (feedback: Feedback) => void;
    forgot: boolean;
    themeColor: string;
};
declare type State = {
    options: Option[];
    value: number | undefined;
    otherText: string | undefined;
};
declare class ClassicSingleChoiceQuestion extends PureComponent<Props, State> {
    constructor(props: Props);
    onFeedback(id: number): void;
    onChangeValueHandler(index: any, newValue: {
        checked: boolean;
        value: string | undefined;
    }): void;
    renderRadios(): JSX.Element[];
    render(): JSX.Element;
}
export default ClassicSingleChoiceQuestion;
