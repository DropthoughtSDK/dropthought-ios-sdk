import { Props as OptionWithHighlightProps } from './OptionWithHighlight';
declare type Props = OptionWithHighlightProps & {
    textValue: string | undefined;
    onChangeValue: (id: any, value: {
        checked: boolean;
        value: string | undefined;
    }) => void;
};
declare function OtherOptionWithHighlightProps(props: Props): JSX.Element;
export default OtherOptionWithHighlightProps;
