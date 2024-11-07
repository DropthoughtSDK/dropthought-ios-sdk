import React, { PureComponent } from 'react';
import type { Question, Option, Feedback as OriginFeedback } from '../data';
type Feedback = OriginFeedback & {
    answers: (string | number)[];
};
type Props = {
    mandatoryErrorMessage: string;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    forgot: boolean;
    feedback: Feedback;
    themeColor: string;
};
type State = {
    values: boolean[];
    options: Option[];
    otherText: string | undefined;
};
declare class ClassicMultiChoiceQuestion extends PureComponent<Props, State> {
    constructor(props: Props);
    feedback(values: boolean[], otherText: string | undefined): void;
    onOptionPressHandler(index: number): void;
    onChangeValueHandler(index: number, newValue: {
        value: string | undefined;
        checked: boolean;
    }): void;
    renderOptions(): React.JSX.Element[];
    render(): React.JSX.Element;
}
export default ClassicMultiChoiceQuestion;
//# sourceMappingURL=ClassicMultiChoiceQuestion.d.ts.map