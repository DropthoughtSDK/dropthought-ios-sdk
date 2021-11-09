export var __esModule: boolean;
export type SDKEntryProps = import('./SDKEntry').SDKEntryProps;
export type ModalProps = any;
export type SurveyModalProps = {
    visible: boolean;
};
export type OpenSurveyProps = SDKEntryProps & ModalProps;
/**
 * @param {SurveyModalProps & SDKEntryProps & ModalProps } props
 */
export function SurveyModal(props: SurveyModalProps & SDKEntryProps & ModalProps): any;
/** @type {React.Context<(param: OpenSurveyProps=) => void>} */
export const SurveyModalOpenSurveyContext: React.Context<(param?: OpenSurveyProps) => void>;
export function useOpenSurvey(): any;
export function SurveyModalContainer({ children, onClose, ...props }: {
    [x: string]: any;
    children: any;
    onClose: any;
}): any;
declare const ModalProps: string[];
declare var React: any;
export {};
