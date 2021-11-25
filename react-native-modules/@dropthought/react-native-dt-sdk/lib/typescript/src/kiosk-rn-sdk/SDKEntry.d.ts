/** @typedef {"system" | "light" | "dark"} ThemeType */
/**
 * @typedef {object} SDKEntryOwnProps
 * @property {string} apiKey
 * @property {string} surveyId
 * @property {string=} defaultLanguage if not provided, default is "en"
 * @property {string=} baseURL if not provided, default is ...
 * @property {()=>void=} onClose when the close icon is pressed in the header
 * @property {ThemeType=} theme
 * @property {string=} fontColor
 * @property {string=} backgroundColor
 */
/**
 * @typedef {import('./contexts/custom-props').CustomProps & SDKEntryOwnProps} SDKEntryProps
 */
/**
 * @param {SDKEntryProps} props
 */
export default function SDKEntry({ theme, fontColor, backgroundColor, ...props }: SDKEntryProps): JSX.Element;
export type ThemeType = "system" | "light" | "dark";
export type SDKEntryOwnProps = {
    apiKey: string;
    surveyId: string;
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
    theme?: ThemeType | undefined;
    fontColor?: string | undefined;
    backgroundColor?: string | undefined;
};
export type SDKEntryProps = import('./contexts/custom-props').CustomProps & SDKEntryOwnProps;
