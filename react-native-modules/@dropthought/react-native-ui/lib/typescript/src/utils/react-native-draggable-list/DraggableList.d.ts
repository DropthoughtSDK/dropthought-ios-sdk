import React from 'react';
export type TransformedOption = {
    option: string;
    index: number;
    isNA: boolean;
    rowHeight?: number;
};
type DraggableListRenderItemInfo = {
    item: TransformedOption;
    index: number;
};
export type DraggableListRenderItem = (info: DraggableListRenderItemInfo) => React.ReactElement | null;
type DraggableListProps = {
    data: ReadonlyArray<TransformedOption>;
    renderItem: DraggableListRenderItem;
    onDragStart: () => void;
    onDragGrant: () => void;
    onDragRelease: () => void;
    onDragEnd: (newList: TransformedOption[]) => void;
};
declare function DraggableList({ data, renderItem, onDragStart, onDragGrant, onDragRelease, onDragEnd, }: DraggableListProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DraggableList>;
export default _default;
//# sourceMappingURL=DraggableList.d.ts.map