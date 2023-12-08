export function metadataTypeKeyboard(metadataType: any): string;
export function metadataTypeAutoCapitalize(metadataType: any): "none" | "words" | "sentences";
export default OpenQuestion;
declare function OpenQuestion({ mandatoryErrorMessage, anonymous, question, onFeedback, feedback, forgot, themeColor }: {
    mandatoryErrorMessage: any;
    anonymous: any;
    question: any;
    onFeedback: any;
    feedback: any;
    forgot: any;
    themeColor: any;
}): React.CElement<import("react-native").ViewProps, View>;
import { View } from "react-native";
import React from "react";
