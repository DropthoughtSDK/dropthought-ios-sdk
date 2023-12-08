export var __esModule: boolean;
export var FeedbacksQueue: any;
export var FailedFeedbacksQueue: any;
export var FailedReasonsQueue: any;
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
export type Feedback = any;
export type SurveyFeedback = any;
export type FailedReason = {
    message: string;
    status: number | undefined;
};
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
type UploaderStates = 'idle' | 'processing';
declare namespace UploaderStates {
    const Idle_1: string;
    export { Idle_1 as Idle };
    const Processing_1: string;
    export { Processing_1 as Processing };
}
export {};
