import * as React from 'react';
import type { Survey, Question } from '../data';
type Props = {
    survey: Survey;
    pageIndex: number;
    question?: Question;
    backgroundColor?: string;
    onClose: () => void;
};
declare const _default: React.MemoExoticComponent<(props: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=SurveyHeader.d.ts.map