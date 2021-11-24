import { ViewStyle } from 'react-native';
import type { Question } from '../data';
declare type Props = {
    forgot?: boolean;
    invalidMessage?: string;
    question: Question;
    style?: ViewStyle;
};
declare const MandatoryTitle: ({ forgot, invalidMessage, question, style, }: Props) => JSX.Element;
export default MandatoryTitle;
