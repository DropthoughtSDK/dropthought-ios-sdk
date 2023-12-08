import type { Survey, SurveyFeedback, ImageFileProps } from '../data';
export declare const SurveyProgressBarPosition: {
    FixedBottom: number;
    BelowBody: number;
};
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
    onUpload?: (file: ImageFileProps) => Promise<string | undefined>;
    isUploading?: boolean;
    SurveyProgressBar?: any;
    surveyProgressBarPosition?: number;
    SurveyPageIndicator?: any;
    preview: boolean;
}
declare const SurveyScreenLayout: ({ pageIndex, survey, onClose, onPrevPage, onNextPage, onSubmit, onUpload, isUploading, SurveyPageIndicator, SurveyProgressBar, surveyProgressBarPosition, preview, }: Props) => JSX.Element;
export default SurveyScreenLayout;
