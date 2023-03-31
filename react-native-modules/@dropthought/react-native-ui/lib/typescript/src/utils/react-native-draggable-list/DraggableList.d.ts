import React from 'react';
export declare type TransformedOption = {
    option: string;
    index: number;
    isNA: boolean;
    rowHeight?: number;
};
declare type DraggableListRenderItemInfo = {
    item: TransformedOption;
    index: number;
};
export declare type DraggableListRenderItem = (info: DraggableListRenderItemInfo) => React.ReactElement | null;
declare type DraggableListProps = {
    data: ReadonlyArray<TransformedOption>;
    renderItem: DraggableListRenderItem;
    onDragEnd: (newList: TransformedOption[]) => void;
};
declare function DraggableList({ data, renderItem, onDragEnd }: DraggableListProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DraggableList>;
export default _default;
