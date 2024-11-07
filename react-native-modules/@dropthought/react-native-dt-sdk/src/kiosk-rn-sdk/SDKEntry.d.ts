import type { THEME_OPTION } from '@dropthought/react-native-ui';
import type { CustomProps } from './contexts/custom-props/CustomPropsContext';

export type ThemeType = 'system' | 'light' | 'dark';

export interface SDKEntryOwnProps {
  apiKey?: string;
  visibilityId?: string;
  surveyId?: string;
  defaultLanguage?: string;
  baseURL?: string;
  onClose?: () => void;
  themeOption?: THEME_OPTION;
  appearance?: ThemeType;
  fontColor?: string;
  backgroundColor?: string;
  timezone?: string;
  preview?: boolean;
  autoClose?: boolean;
  autoCloseCountdown?: number;
}

export interface SDKEntryProps extends CustomProps, SDKEntryOwnProps {}

export declare const SDKEntry: (props: SDKEntryProps) => React.JSX.Element;
