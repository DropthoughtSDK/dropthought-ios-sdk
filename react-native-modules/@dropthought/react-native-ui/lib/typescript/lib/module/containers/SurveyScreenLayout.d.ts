export namespace SurveyProgressBarPosition {
    const FixedBottom: number;
    const BelowBody: number;
}
export default SurveyScreenLayout;
declare function SurveyScreenLayout({ pageIndex, survey, onClose, onPrevPage, onNextPage, onSubmit, onUpload, isUploading, SurveyPageIndicator, SurveyProgressBar, surveyProgressBarPosition, preview }: {
    pageIndex?: number | undefined;
    survey: any;
    onClose: any;
    onPrevPage: any;
    onNextPage: any;
    onSubmit: any;
    onUpload: any;
    isUploading: any;
    SurveyPageIndicator?: React.MemoExoticComponent<(props: any) => React.CElement<import("react-native").ViewProps, View>> | undefined;
    SurveyProgressBar?: React.MemoExoticComponent<({ rtl, ...props }: {
        [x: string]: any;
        rtl: any;
    }) => React.CElement<import("react-native").ViewProps, View> | null> | undefined;
    surveyProgressBarPosition?: number | undefined;
    preview: any;
}): React.FunctionComponentElement<{
    children: any;
}>;
import { View } from "react-native";
import * as React from "react";
