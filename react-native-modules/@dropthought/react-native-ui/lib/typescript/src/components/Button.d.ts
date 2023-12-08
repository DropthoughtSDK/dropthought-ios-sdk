import { TouchableOpacityProps, ViewStyle } from 'react-native';
interface Props {
    title: string;
    width?: number;
    color?: string;
    containerStyle?: ViewStyle;
    disabled?: boolean;
}
declare const Button: ({ title, disabled, width, containerStyle, color, ...props }: Props & TouchableOpacityProps) => JSX.Element;
export default Button;
