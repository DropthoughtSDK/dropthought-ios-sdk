import React from "react";
declare type Props = {
    isActive: boolean;
    children: React.ReactNode;
};
export default function CellProvider({ isActive, children }: Props): JSX.Element;
export declare function useIsActive(): boolean;
export {};
