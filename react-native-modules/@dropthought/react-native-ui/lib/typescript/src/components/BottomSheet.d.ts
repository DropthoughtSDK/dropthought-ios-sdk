import React, { ReactChild } from 'react';
interface Props {
    coverScreen: boolean;
    title?: string;
    onBackdropPress?: () => void;
    componentInside?: ReactChild;
    componentHeight: number;
    visible: boolean;
    navigationComponent?: ReactChild;
}
interface NavProps {
    backgroundColor?: string;
    disableOnConfirm: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}
export declare const NavigationComponent: React.FC<NavProps>;
declare const BottomSheet: React.FC<Props>;
export default BottomSheet;
