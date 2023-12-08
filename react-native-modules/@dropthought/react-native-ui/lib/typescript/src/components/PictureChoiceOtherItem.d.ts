import type { ImageFileProps } from '../data';
declare type Props = {
    otherPicture: {
        image: string;
        value: string;
    };
    isMultipleChoice: boolean;
    selected: boolean;
    placeholder: string;
    columnGap: number;
    onChooseImage: () => void;
    onSelect: () => void;
    onUpload: (file: ImageFileProps) => Promise<void>;
    onError: (msg: string) => void;
    onChangeText: (text: string) => void;
    themeColor: string;
    preview: boolean;
};
declare const PictureChoiceOtherItem: ({ otherPicture, isMultipleChoice, selected, placeholder, columnGap, onChooseImage, onSelect, onUpload, onError, onChangeText, themeColor, preview, }: Props) => JSX.Element;
export default PictureChoiceOtherItem;
