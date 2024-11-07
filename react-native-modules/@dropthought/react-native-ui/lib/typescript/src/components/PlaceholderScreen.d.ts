import * as React from 'react';
export declare enum PlaceholderImageTypes {
    NoInternet = "NoInternet",
    ProgramScheduled = "ProgramScheduled",
    ProgramExpired = "ProgramExpired",
    ProgramDeleted = "ProgramDeleted",
    ProgramDeactivated = "ProgramDeactivated",
    ProgramUnavailable = "ProgramUnavailable"
}
export type IPlaceholderImageTypesType = PlaceholderImageTypes.NoInternet | PlaceholderImageTypes.ProgramScheduled | PlaceholderImageTypes.ProgramExpired | PlaceholderImageTypes.ProgramDeleted | PlaceholderImageTypes.ProgramDeactivated | PlaceholderImageTypes.ProgramUnavailable;
type Props = {
    message?: string;
    imageSource?: string;
    imageType: IPlaceholderImageTypesType;
    children?: React.ReactNode;
};
declare const PlaceholderScreen: ({ message, imageSource, imageType, children, }: Props) => React.JSX.Element;
export default PlaceholderScreen;
//# sourceMappingURL=PlaceholderScreen.d.ts.map