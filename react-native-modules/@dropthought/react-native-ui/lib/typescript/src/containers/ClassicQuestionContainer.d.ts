import type { Question, Feedback, ImageFileProps } from '../data';
declare type Props = {
    anonymous: boolean;
    question: Question;
    validationStarted: boolean;
    themeColor: string;
    onFeedback?: (feedback: Feedback) => void;
    onUpload?: (file: ImageFileProps) => void;
    isUploading?: boolean;
    onDragGrant: () => void;
    onDragEnd: () => void;
};
declare const ClassicQuestionContainer: (props: Props) => JSX.Element;
export default ClassicQuestionContainer;
