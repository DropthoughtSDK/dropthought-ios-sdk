export function ThemeProvider({ children, theme, fontColor, backgroundColor }: {
    children: any;
    theme: any;
    fontColor: any;
    backgroundColor: any;
}): React.FunctionComponentElement<React.ProviderProps<{
    colorScheme: string;
    fontColor: string;
    backgroundColor: string;
}>>;
import * as React from "react";
