export declare function usePollingRecord(): {
    pollingRecord: {
        [questionId: string]: {
            [choice: string]: number;
        };
    };
    setPollingRecord: (update: {
        [questionId: string]: {
            [choice: string]: number;
        };
    } | ((prev: {
        [questionId: string]: {
            [choice: string]: number;
        };
    }) => {
        [questionId: string]: {
            [choice: string]: number;
        };
    })) => void;
    resetRecord: () => void;
};
//# sourceMappingURL=usePollingRecord.d.ts.map