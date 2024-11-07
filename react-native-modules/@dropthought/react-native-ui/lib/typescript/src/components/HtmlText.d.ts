import React from 'react';
import type { WebViewProps } from 'react-native-webview';
interface HtmlText {
    html: string;
    width?: number;
    maxHeight?: number;
}
type HtmlTextProps = HtmlText & WebViewProps;
declare const HtmlText: ({ html, width, maxHeight, ...webViewProps }: HtmlTextProps) => React.JSX.Element;
export default HtmlText;
//# sourceMappingURL=HtmlText.d.ts.map