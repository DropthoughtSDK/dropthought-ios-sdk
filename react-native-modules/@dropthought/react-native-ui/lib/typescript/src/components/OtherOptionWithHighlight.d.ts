/**
 * @description Option with a TextInput, this is for other option in multi-choice/single-choice question
 */
import * as React from 'react';
import type { Props as OptionWithHighlightProps } from './OptionWithHighlight';
import type { Question } from '../data';
type Props = OptionWithHighlightProps & {
    textValue: string | undefined;
    onChangeValue: (id: any, value: {
        checked: boolean;
        value: string | undefined;
    }) => void;
    question: Question;
};
declare function OtherOptionWithHighlightProps(props: Props): React.JSX.Element;
export default OtherOptionWithHighlightProps;
//# sourceMappingURL=OtherOptionWithHighlight.d.ts.map