/**
 * @description a extension UI/UX component of SurveyScreenLayout
 * it displays three buttons:
 *  - Back, displayed when page is > 0
 *  - Next, displayed when page is not end
 *  - Submit, displayed when page is the last page
 * When "Back" is pressed, call props.onPrevPage
 * When "Next" or "Submit" is pressed, call props.onNextPage
 */
import * as React from 'react';
declare type Props = {
    surveyColor: string;
    isFirstPage: boolean;
    isLastPage: boolean;
    onPrevPage: () => void;
    onNextPage: () => void;
    backgroundColor?: string;
};
declare const _default: React.MemoExoticComponent<(props: Props) => JSX.Element>;
export default _default;
