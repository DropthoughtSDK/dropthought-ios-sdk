import ClassicQuestionContainer from './containers/ClassicQuestionContainer';
import QuestionContainer from './containers/QuestionContainer';
import SurveyScreenLayout, {
  SurveyProgressBarPosition,
} from './containers/SurveyScreenLayout';
import EndScreenLayout from './containers/EndScreenLayout';
import StartScreenLayout from './containers/StartScreenLayout';
import PlaceholderScreen from './components/PlaceholderScreen';
import ActivityIndicatorMask from './components/ActivityIndicatorMask';
import i18n from './translation';

export {
  ClassicQuestionContainer,
  QuestionContainer,
  SurveyScreenLayout,
  SurveyProgressBarPosition,
  EndScreenLayout,
  StartScreenLayout,
  PlaceholderScreen,
  ActivityIndicatorMask,
  i18n,
};

export { Colors, GlobalStyle } from './styles';

export * from './components/PlaceholderScreen';
export * from './KioskProvider';
export * from './hooks/useWindowDimensions';
export * from './contexts/feedback';
export * from './contexts/theme';
export * from './components/Button';
export * from './components/KeyboardAvoidingView';
export * from './components/FileIcon';
export * from './data';
