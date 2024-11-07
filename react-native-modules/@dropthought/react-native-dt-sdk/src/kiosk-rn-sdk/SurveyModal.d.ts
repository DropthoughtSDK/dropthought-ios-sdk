import { ModalProps } from 'react-native';
import type { SDKEntryProps } from './SDKEntry';

export declare const useOpenSurvey: () => (
  param?: SDKEntryProps & ModalProps
) => void;

export interface SurveyModalProps {
  visible?: boolean;
}
export declare const SurveyModalContainer: ({
  children,
  onClose,
  ...props
}: SurveyModalProps & SDKEntryProps & ModalProps) => React.JSX.Element;
