import React from "react";
declare type Props<T> = {
    activeKey: string | null;
    onDragEnd: ([from, to]: readonly number[]) => void;
    keyExtractor: (item: T, index: number) => string;
    horizontal: boolean;
    children: React.ReactNode;
};
declare type DraggableFlatListContextValue<T> = Omit<Props<T>, "children">;
export default function DraggableFlatListProvider<T>({ activeKey, onDragEnd, keyExtractor, horizontal, children, }: Props<T>): JSX.Element;
export declare function useDraggableFlatListContext<T>(): DraggableFlatListContextValue<T>;
export {};
