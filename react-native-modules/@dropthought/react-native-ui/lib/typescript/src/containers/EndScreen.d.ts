import type { Survey } from '../data';
declare type Props = {
    survey: Survey;
    onClose: () => void;
};
declare const EndScreen: ({ survey, onClose }: Props) => JSX.Element;
export default EndScreen;
