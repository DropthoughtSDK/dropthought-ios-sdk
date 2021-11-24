/**
 * @description a extension UI/UX component of SurveyScreenLayout
 * it displays three buttons:
 *  - Back, displayed when page is > 0
 *  - Next, displayed when page is not end
 *  - Submit, displayed when page is the last page
 * When "Back" is pressed, call props.onPrevPage
 * When "Next" is pressed,
 *     would check if the answers are valid, and then apply the Skip Logic, get the next page id, call props.onNextPage(nextPageIndex)
 *     or it would call props.onSubmit, when the rule says it should go to end
 * When "Submit" is pressed,
 *     would check if the answers are valid, and then call props.onSubmit
 *
 * when the validation process failed, call props.onValidationFailed
 */
import * as React from 'react';
import type { Survey } from '../data';
declare type Props = {
    survey: Survey;
    pageIndex: number;
    onPrevPage: () => void;
    onNextPage: (arg0: number) => void;
    onSubmit: (arg0: any) => void;
    onValidationStart: () => void;
    onValidationFailed: (arg0: string, arg1: any) => void;
};
declare const _default: React.MemoExoticComponent<(props: Props) => JSX.Element>;
export default _default;
