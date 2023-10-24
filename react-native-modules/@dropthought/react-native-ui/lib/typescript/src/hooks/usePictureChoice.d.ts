/// <reference types="react" />
import type { Question, Feedback } from '../data';
export declare const usePictureChoice: (question: Question, onFeedback: (feedback: Feedback) => void, feedback?: Feedback | undefined) => {
    images: {
        uri: string;
        option: string;
    }[];
    otherPictureEnable: boolean;
    otherPictureAnswer: {
        image: string;
        value: string;
    };
    setOtherPictureAnswerText: (text: string) => void;
    setOtherPictureAnswerUrl: (url: string) => void;
    otherPictureSelected: boolean;
    setOtherPictureSelected: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    selectIndex: (string | number | import("../dt-common/types/data").PictureChoiceOtherAnswer | undefined)[];
    onSelectIndex: (selected: number) => void;
    replaceSelectIndex: (selectedList: number[] | []) => void;
    isMultipleChoice: boolean;
    resetOtherPicture: () => void;
    invalidMessage: string | undefined;
    setInvalidMessage: import("react").Dispatch<import("react").SetStateAction<string | undefined>>;
};
