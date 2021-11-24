export var __esModule: boolean;
export default _default;
declare var _default: typeof MultiChoiceQuestion;
declare const MultiChoiceQuestion_base: any;
declare class MultiChoiceQuestion extends MultiChoiceQuestion_base {
    [x: string]: any;
    constructor(props: any);
    onChangeValueHandler(index: any, newValue: any): void;
    onOptionPressHandler(index: any): void;
    state: {
        values: any;
        options: any;
        otherText: string;
    };
    feedback(values: any, otherText: any): void;
    renderOptions(): any;
    render(): any;
}
