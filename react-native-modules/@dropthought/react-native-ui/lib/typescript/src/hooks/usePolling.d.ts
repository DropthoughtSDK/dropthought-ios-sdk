/// <reference types="react" />
import type { Question, Feedback } from '../data';
import type { onPostPollChoiceType } from '../containers/SurveyScreenLayout';
export interface PollingOption {
    title?: string;
    choice?: string;
    otherFlag: boolean;
}
declare const usePolling: (question: Question, onFeedback: (feedback: Feedback) => void, onPostPollChoice: onPostPollChoiceType, feedback?: Feedback) => {
    selectedOption: PollingOption | undefined;
    setSelectedOption: import("react").Dispatch<import("react").SetStateAction<PollingOption | undefined>>;
    onPoll: (option: PollingOption) => Promise<void>;
    pollingResult: {
        [choice: string]: number;
    } | undefined;
};
export default usePolling;
//# sourceMappingURL=usePolling.d.ts.map