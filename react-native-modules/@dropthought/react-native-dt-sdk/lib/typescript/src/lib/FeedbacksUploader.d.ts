/** @type {QueueStorage<SurveyFeedback>} */
export const FeedbacksQueue: QueueStorage<SurveyFeedback>;
/** @type {QueueStorage<SurveyFeedback>} */
export const FailedFeedbacksQueue: QueueStorage<SurveyFeedback>;
/** @type {QueueStorage<FailedReason>} */
export const FailedReasonsQueue: QueueStorage<FailedReason>;
export type UploaderStates = 'idle' | 'processing';
export namespace UploaderStates {
    const Idle: string;
    const Processing: string;
}
export namespace feedbackUploader {
    export { upload };
    export { subscribe };
    export { cancel };
    export { clear };
    export { initialize };
}
export type FeedbackUploaderSubscription = {
    id: string;
    subscriber: FeedbackUploaderSubscriber;
};
export type FeedbackUploaderPublishState = {
    uploadStatus: UploaderStates;
    numOfFeedbacksProcessed: number;
    queuedFeedbacks: SurveyFeedback[];
    failedFeedbacksDuringProcessing: SurveyFeedback[];
    failedReasons: FailedReason[];
    userCanceled: boolean;
};
export type FeedbackUploaderSubscriber = (state: FeedbackUploaderPublishState) => void;
export type Feedback = import('../data').Feedback;
export type SurveyFeedback = import('../data').SurveyFeedback;
export type FailedReason = {
    message: string;
    status: number | undefined;
};
import QueueStorage from "./QueueStorage";
/**
 * @public
 */
declare function upload(): Promise<void>;
/**
 * @public
 * @param {FeedbackUploaderSubscriber} subscriber
 */
declare function subscribe(subscriber: FeedbackUploaderSubscriber): () => void;
/**
 * @public
 */
declare function cancel(): void;
/**
 * @public
 */
declare function clear(): Promise<void>;
/**
 * @public
 */
declare function initialize(): Promise<any>;
export {};
