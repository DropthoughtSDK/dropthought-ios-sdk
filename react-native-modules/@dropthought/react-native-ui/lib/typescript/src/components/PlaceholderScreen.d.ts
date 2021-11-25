import * as React from 'react';
export declare enum PlaceholderImageTypes {
    NoInternet = "NoInternet",
    ProgramScheduled = "ProgramScheduled",
    ProgramExpired = "ProgramExpired",
    ProgramDeleted = "ProgramDeleted",
    ProgramDeactivated = "ProgramDeactivated",
    ProgramUnavailable = "ProgramUnavailable"
}
export declare type IPlaceholderImageTypesType = PlaceholderImageTypes.NoInternet | PlaceholderImageTypes.ProgramScheduled | PlaceholderImageTypes.ProgramExpired | PlaceholderImageTypes.ProgramDeleted | PlaceholderImageTypes.ProgramDeactivated | PlaceholderImageTypes.ProgramUnavailable;
declare type Props = {
    message?: string;
    imageSource?: string;
    imageType: IPlaceholderImageTypesType;
    children?: React.ReactNode;
};
declare const PlaceholderScreen: ({ message, imageSource, imageType, children, }: Props) => JSX.Element;
export default PlaceholderScreen;
