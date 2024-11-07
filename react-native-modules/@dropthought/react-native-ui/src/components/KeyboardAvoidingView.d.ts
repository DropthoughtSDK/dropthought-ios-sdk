import type {
  ViewStyle,
  ViewProps,
  ScrollView,
  ScrollViewProps,
} from 'react-native';

export interface KeyboardAvoidingViewProps extends ViewProps {
  contentContainerStyle?: ViewStyle;
  extraAvoidingSpace?: number;
}

export declare const KeyboardAvoidingView: React.FunctionComponent<KeyboardAvoidingViewProps>;

export interface KeyboardAvoidingScrollViewProps extends ScrollViewProps {
  contentContainerStyle?: ViewStyle;
  extraAvoidingSpace?: number;
}

export declare const KeyboardAvoidingScrollView: React.ForwardRefExoticComponent<
  KeyboardAvoidingScrollViewProps & React.RefAttributes<ScrollView>
>;
