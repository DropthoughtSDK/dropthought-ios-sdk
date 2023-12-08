export var __esModule: boolean;
export function multiplePictureChoiceValidator(question: any, feedback: any): boolean;
export function usePictureChoice(question: any, onFeedback: any, feedback: any): {
    images: any;
    otherPictureEnable: boolean;
    otherPictureAnswer: {
        image: any;
        value: any;
    };
    setOtherPictureAnswerText: (text: any) => void;
    setOtherPictureAnswerUrl: (url: any) => void;
    otherPictureSelected: boolean;
    setOtherPictureSelected: _react.Dispatch<_react.SetStateAction<boolean>>;
    selectIndex: any;
    onSelectIndex: (selected: any) => void;
    replaceSelectIndex: (selectedList: any) => void;
    isMultipleChoice: boolean;
    resetOtherPicture: () => void;
    invalidMessage: undefined;
    setInvalidMessage: _react.Dispatch<_react.SetStateAction<undefined>>;
};
import _react = require("react");
