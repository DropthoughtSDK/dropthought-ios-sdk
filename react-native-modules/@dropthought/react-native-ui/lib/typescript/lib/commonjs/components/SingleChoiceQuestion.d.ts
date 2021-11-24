export var __esModule: boolean;
export default _default;
declare var _default: typeof SingleChoiceQuestion;
declare const SingleChoiceQuestion_base: any;
declare class SingleChoiceQuestion extends SingleChoiceQuestion_base {
    [x: string]: any;
    constructor(props: any);
    onFeedback(id: any): void;
    onChangeValueHandler(index: any, newValue: any): void;
    state: {
        value: any;
        options: any;
        otherText: string;
    };
    renderRadios(): any;
    render(): any;
}
