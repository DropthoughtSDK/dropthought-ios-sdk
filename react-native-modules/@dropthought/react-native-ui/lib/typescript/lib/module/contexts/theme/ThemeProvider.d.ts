export function ThemeProvider({ children, themeOption, appearance, fontColor, backgroundColor }: {
    children: any;
    themeOption: any;
    appearance: any;
    fontColor: any;
    backgroundColor: any;
}): React.FunctionComponentElement<React.ProviderProps<{
    themeOption: any;
    colorScheme: string;
    fontColor: string;
    backgroundColor: string;
    customFontColor: string;
    customBackgroundColor: string;
}>>;
import * as React from "react";
