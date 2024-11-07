import * as React from 'react';
import type { onPostPollChoiceType } from '../containers/SurveyScreenLayout';
import type { Question, Feedback, Survey } from '../data';
import type { IThemeOptionType } from '../contexts/theme';
import type { onUploadType } from '../dt-common';
type Props = {
    key: string;
    anonymous: boolean;
    mandatoryErrorMessage: string;
    question: Question;
    validationStarted: boolean;
    themeColor: string;
    onClose: () => void;
    onPrevPage: () => void;
    onNextPage: () => void;
    onFeedback?: (feedback: Feedback) => void;
    onUpload?: onUploadType;
    isUploading?: boolean;
    onPostPollChoice?: onPostPollChoiceType;
    isPostingPollChoice?: boolean;
    survey: Survey;
    pageIndex: number;
    themeOption: IThemeOptionType;
    preview: boolean;
    isLastPage: boolean;
};
declare const QuestionContainer: (props: Props) => React.JSX.Element;
export default QuestionContainer;
//# sourceMappingURL=QuestionContainer.d.ts.map