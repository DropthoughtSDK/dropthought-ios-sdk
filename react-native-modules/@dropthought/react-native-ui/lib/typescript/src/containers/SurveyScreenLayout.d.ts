import React from 'react';
import type { Survey, SurveyFeedback } from '../data';
import type { onUploadType } from '../dt-common';
export declare const SurveyProgressBarPosition: {
    FixedBottom: number;
    BelowBody: number;
};
export interface PollResult {
    [key: string]: number;
}
type PollChoiceData = {
    questionId: string;
    choice?: string;
    isOther: boolean;
};
export type onPostPollChoiceType = (data: PollChoiceData) => Promise<PollResult | undefined>;
interface Props {
    pageIndex: number;
    survey: Survey;
    onClose?: () => void;
    onSubmit: (surveyFeedback: SurveyFeedback) => void;
    onNextPage: (nextPageIndex: number) => void;
    onPrevPage?: () => void;
    onPageEnter?: () => void;
    onPageLeave?: () => void;
    onFeedback?: () => void;
    onUpload?: onUploadType;
    isUploading?: boolean;
    onPostPollChoice?: onPostPollChoiceType;
    isPostingPollChoice?: boolean;
    SurveyProgressBar?: any;
    surveyProgressBarPosition?: number;
    SurveyPageIndicator?: any;
    preview: boolean;
}
declare const SurveyScreenLayout: ({ pageIndex, survey, onClose, onPrevPage, onNextPage, onSubmit, onUpload, isUploading, onPostPollChoice, isPostingPollChoice, SurveyPageIndicator, SurveyProgressBar, surveyProgressBarPosition, preview, }: Props) => React.JSX.Element;
export default SurveyScreenLayout;
//# sourceMappingURL=SurveyScreenLayout.d.ts.map