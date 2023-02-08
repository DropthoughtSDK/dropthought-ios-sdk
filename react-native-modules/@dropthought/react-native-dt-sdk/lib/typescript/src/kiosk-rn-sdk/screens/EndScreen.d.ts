export default EndScreen;
export type SurveyFeedback = import('../../data').SurveyFeedback;
export type ScreenProps = {
    error?: Error | undefined;
    surveyFeedback?: SurveyFeedback | undefined;
    onClose: () => void;
};
/**
 * @type {React.FunctionComponent<ScreenProps>}
 * @param {ScreenProps} props
 */
declare const EndScreen: React.FunctionComponent<ScreenProps>;
import React from "react";
