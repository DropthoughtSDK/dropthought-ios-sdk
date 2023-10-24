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
    onUpload: (file: ImageFileProps) => void;
    isUploading: boolean;
    onError: (msg: string) => void;
    onChangeText: (text: string) => void;
    themeColor: string;
};
declare const PictureChoiceOtherItem: ({ otherPicture, isMultipleChoice, selected, placeholder, columnGap, onChooseImage, onSelect, onUpload, isUploading, onError, onChangeText, themeColor, }: Props) => JSX.Element;
export default PictureChoiceOtherItem;
