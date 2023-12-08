export function ThemeProvider({ children, themeOption, appearance, hexCode, fontColor, backgroundColor }: {
    children: any;
    themeOption: any;
    appearance: any;
    hexCode: any;
    fontColor: any;
    backgroundColor: any;
}): React.FunctionComponentElement<React.ProviderProps<{
    themeOption: any;
    hexCode: string;
    colorScheme: string;
    fontColor: string;
    backgroundColor: string;
    customFontColor: string;
    customBackgroundColor: string;
}>>;
import * as React from "react";
