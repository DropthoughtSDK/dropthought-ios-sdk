import type { Question, Feedback, ImageFileProps } from '../data';
declare type Props = {
    mandatoryErrorMessage: string;
    anonymous: boolean;
    question: Question;
    validationStarted: boolean;
    themeColor: string;
    onFeedback?: (feedback: Feedback) => void;
    onUpload?: (file: ImageFileProps) => void;
    isUploading?: boolean;
    onDragGrant: () => void;
    onDragEnd: () => void;
    preview: boolean;
};
declare const ClassicQuestionContainer: (props: Props) => JSX.Element;
export default ClassicQuestionContainer;
