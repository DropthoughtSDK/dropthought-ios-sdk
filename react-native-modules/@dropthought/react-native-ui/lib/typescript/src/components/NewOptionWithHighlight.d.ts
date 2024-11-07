import * as React from 'react';
export type Props = {
    type?: 'radio' | 'checkbox';
    id: any;
    title: string | React.ReactNode;
    checked: boolean;
    themeColor: string;
    onPress: (id: any) => void;
};
declare function NewOptionWithHighlight({ type, id: value, title, checked, themeColor, onPress, }: Props): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof NewOptionWithHighlight>;
export default _default;
//# sourceMappingURL=NewOptionWithHighlight.d.ts.map