export default SingleChoiceQuestion;
declare class SingleChoiceQuestion extends React.PureComponent<any, any, any> {
    constructor(props: any);
    onFeedback(id: any): void;
    onChangeValueHandler(index: any, newValue: any): void;
    renderRadios(): any;
}
import React from "react";
