import { ViewStyle } from 'react-native';
import type { Question } from '../data';
declare type Props = {
    forgot?: boolean;
    invalidMessage?: string;
    question: Question;
    style?: ViewStyle;
};
declare const ClassicMandatoryTitle: ({ forgot, invalidMessage, question, style, }: Props) => JSX.Element;
export default ClassicMandatoryTitle;
