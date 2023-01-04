export var __esModule: boolean;
export default _default;
declare var _default: typeof ClassicMultiChoiceQuestion;
declare const ClassicMultiChoiceQuestion_base: any;
declare class ClassicMultiChoiceQuestion extends ClassicMultiChoiceQuestion_base {
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
