import ClassicQuestionContainer from './containers/ClassicQuestionContainer';
import QuestionContainer from './containers/QuestionContainer';
import SurveyScreenLayout, {
  SurveyProgressBarPosition,
} from './containers/SurveyScreenLayout';
import EndScreenLayout from './containers/EndScreenLayout';
import StartScreenLayout from './containers/StartScreenLayout';
import PlaceholderScreen from './components/PlaceholderScreen';
export * from './components/PlaceholderScreen';
import { KioskProvider, KioskProviderProps } from './KioskProvider';
import i18n from './translation';
export { Colors, GlobalStyle } from './styles';
export * from './hooks/useWindowDimensions';
export * from './contexts/theme';

import ActivityIndicatorMask from './components/ActivityIndicatorMask';

export {
  ClassicQuestionContainer,
  QuestionContainer,
  SurveyScreenLayout,
  EndScreenLayout,
  StartScreenLayout,
  PlaceholderScreen,
  KioskProvider,
  KioskProviderProps,
  ActivityIndicatorMask,
  i18n,
  SurveyProgressBarPosition,
};

export * from './data';
