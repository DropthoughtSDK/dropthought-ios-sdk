interface Props {
    list: string[];
    scale?: string;
    selectedIndex: number;
    updateScore: (currentIndex: number) => void;
}
declare const RotaryPhonePicker: ({ list, scale, selectedIndex, updateScore, }: Props) => JSX.Element;
export default RotaryPhonePicker;
