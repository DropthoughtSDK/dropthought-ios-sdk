export var __esModule: boolean;
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
export type Feedback = any;
export type SurveyFeedback = any;
export type FailedReason = {
    message: string;
    status: number | undefined;
};
/** @type {QueueStorage<SurveyFeedback>} */
export const FeedbacksQueue: any;
export const FailedFeedbacksQueue: any;
export const FailedReasonsQueue: any;
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
