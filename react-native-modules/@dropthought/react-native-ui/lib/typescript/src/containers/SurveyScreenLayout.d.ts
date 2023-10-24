import type { Survey, SurveyFeedback, ImageFileProps } from '../data';
export declare const SurveyProgressBarPosition: {
    FixedBottom: number;
    BelowBody: number;
};
declare type Props = {
    pageIndex: number;
    survey: Survey;
    onClose?: () => void;
    onSubmit: (surveyFeedback: SurveyFeedback) => void;
    onNextPage: (nextPageIndex: number) => void;
    onPrevPage?: () => void;
    onPageEnter?: () => void;
    onPageLeave?: () => void;
    onFeedback?: () => void;
    onUpload?: (file: ImageFileProps) => Promise<string | undefined>;
    isUploading?: boolean;
    SurveyProgressBar?: any;
    surveyProgressBarPosition?: number;
    SurveyPageIndicator?: any;
};
declare const SurveyScreenLayoutWrapper: (props: Props) => JSX.Element;
export default SurveyScreenLayoutWrapper;
