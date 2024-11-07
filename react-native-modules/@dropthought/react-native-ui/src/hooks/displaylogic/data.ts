import type { Survey, Feedback } from '../../data';
export type * from '../../data';
export { default as useStateRef } from '../useStateRef';

export type UseDisplayLogicType = {
  survey: Survey;
  feedbacks: Feedback[];
  removeSingleFeedbackHandler: (questionId: string) => void;
  subLink?: ChannelSubLinkWithSurveyId;
};

// this type is reference from kiosk
interface ChannelSubLinkWithSurveyId {
  name: string;
  metadata: {
    [x: string]: string;
  };
  linkId: string;
  linkGroupUUID: string;
  active: boolean;
  url?: string;
  qrCode: string;
  qrCodeType: any;
  token?: string;
  tagLinkName?: string;
  surveyId: string;
}
