import React, { PureComponent } from 'react';
import type { Feedback as OriginFeedback, Question as OriginQuestion, Option } from '../data';
type Feedback = OriginFeedback & {
    answers: (string | number)[];
};
type Question = OriginQuestion & {
    options: string[];
    scale: string;
};
type Props = {
    mandatoryErrorMessage: string;
    question: Question;
    feedback: Feedback;
    onFeedback: (feedback: Feedback) => void;
    forgot: boolean;
    themeColor: string;
};
type State = {
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
    renderRadios(): React.JSX.Element[];
    render(): React.JSX.Element;
}
export default ClassicSingleChoiceQuestion;
//# sourceMappingURL=ClassicSingleChoiceQuestion.d.ts.map