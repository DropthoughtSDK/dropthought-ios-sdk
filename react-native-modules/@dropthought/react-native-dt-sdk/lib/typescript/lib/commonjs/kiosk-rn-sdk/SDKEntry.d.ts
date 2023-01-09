export var __esModule: boolean;
export default SDKEntry;
export type ThemeType = "system" | "light" | "dark";
export type SDKEntryOwnProps = {
    apiKey: string;
    visibilityId?: string | undefined;
    surveyId?: string | undefined;
    /**
     * if not provided, default is "en"
     */
    defaultLanguage?: string | undefined;
    /**
     * if not provided, default is ...
     */
    baseURL?: string | undefined;
    /**
     * when the close icon is pressed in the header
     */
    onClose?: (() => void) | undefined;
    themeOption: any;
    appearance?: ThemeType | undefined;
    fontColor?: string | undefined;
    backgroundColor?: string | undefined;
    timezone?: string | undefined;
};
export type SDKEntryProps = import('./contexts/custom-props').CustomProps & SDKEntryOwnProps;
/** @typedef {"system" | "light" | "dark"} ThemeType */
/**
 * @typedef {object} SDKEntryOwnProps
 * @property {string} apiKey
 * @property {string=} visibilityId
 * @property {string=} surveyId
 * @property {string=} defaultLanguage if not provided, default is "en"
 * @property {string=} baseURL if not provided, default is ...
 * @property {()=>void=} onClose when the close icon is pressed in the header
 * @property {THEME_OPTION} themeOption
 * @property {ThemeType=} appearance
 * @property {string=} fontColor
 * @property {string=} backgroundColor
 * @property {string=} timezone
 */
/**
 * @typedef {import('./contexts/custom-props').CustomProps & SDKEntryOwnProps} SDKEntryProps
 */
/**
 * @param {SDKEntryProps} props
 */
declare function SDKEntry(props: SDKEntryProps): any;
