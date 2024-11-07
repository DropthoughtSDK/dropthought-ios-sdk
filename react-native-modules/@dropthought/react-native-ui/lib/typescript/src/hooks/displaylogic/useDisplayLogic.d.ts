import type { Page, DisplayLogics, UseDisplayLogicType } from './data';
declare const useDisplayLogic: ({ survey, feedbacks, removeSingleFeedbackHandler, subLink, }: UseDisplayLogicType) => {
    displayDictionary: any;
    displayDictionaryRef: any;
    getDisplayStatusForPage: (page: Page) => any[];
    checkAllowToDisplay: (displayLogics?: DisplayLogics) => boolean;
};
export default useDisplayLogic;
//# sourceMappingURL=useDisplayLogic.d.ts.map