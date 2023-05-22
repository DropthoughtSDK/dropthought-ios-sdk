/**
 * @param {SurveyModalProps & SDKEntryProps & ModalProps } props
 */
export function SurveyModal(props: SurveyModalProps & SDKEntryProps & ModalProps): React.FunctionComponentElement<null>;
/** @type {React.Context<(param: OpenSurveyProps=) => void>} */
export const SurveyModalOpenSurveyContext: React.Context<(param?: OpenSurveyProps) => void>;
export function useOpenSurvey(): (param?: OpenSurveyProps) => void;
export function SurveyModalContainer({ children, onClose, ...props }: SurveyModalProps & SDKEntryProps & ModalProps): React.FunctionComponentElement<React.ProviderProps<(param?: OpenSurveyProps) => void>>;
export type SDKEntryProps = import('./SDKEntry').SDKEntryProps;
export type ModalProps = any;
export type SurveyModalProps = {
    visible: boolean;
};
export type OpenSurveyProps = SDKEntryProps & ModalProps;
declare const ModalProps: string[];
import * as React from "react";
export {};
