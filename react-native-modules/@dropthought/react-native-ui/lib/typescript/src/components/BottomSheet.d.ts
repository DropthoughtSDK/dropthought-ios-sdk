import React from 'react';
interface Props {
    coverScreen: boolean;
    title?: string;
    onBackdropPress?: () => void;
    componentInside?: React.ReactNode;
    componentHeight: number;
    visible: boolean;
    navigationComponent?: React.ReactNode;
    children?: React.ReactNode;
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
//# sourceMappingURL=BottomSheet.d.ts.map