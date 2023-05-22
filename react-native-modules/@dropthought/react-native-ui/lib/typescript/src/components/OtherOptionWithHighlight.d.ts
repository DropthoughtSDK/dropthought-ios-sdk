import { Props as OptionWithHighlightProps } from './OptionWithHighlight';
import type { Question } from '../data';
declare type Props = OptionWithHighlightProps & {
    textValue: string | undefined;
    onChangeValue: (id: any, value: {
        checked: boolean;
        value: string | undefined;
    }) => void;
    question: Question;
};
declare function OtherOptionWithHighlightProps(props: Props): JSX.Element;
export default OtherOptionWithHighlightProps;
