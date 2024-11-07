import * as React from 'react';
import type { Question, Feedback, Survey } from '../data';
import type { onUploadType } from '../dt-common';
import type { onPostPollChoiceType } from '../containers/SurveyScreenLayout';
type Props = {
    mandatoryErrorMessage: string;
    anonymous: boolean;
    survey: Survey;
    question: Question;
    validationStarted: boolean;
    themeColor: string;
    onFeedback?: (feedback: Feedback) => void;
    onUpload?: onUploadType;
    isUploading?: boolean;
    onPostPollChoice?: onPostPollChoiceType;
    isPostingPollChoice?: boolean;
    onDragGrant: () => void;
    onDragEnd: () => void;
    preview: boolean;
};
declare const ClassicQuestionContainer: (props: Props) => React.JSX.Element;
export default ClassicQuestionContainer;
//# sourceMappingURL=ClassicQuestionContainer.d.ts.map