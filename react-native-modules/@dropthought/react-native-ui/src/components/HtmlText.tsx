import React, { useMemo, useState } from 'react';
import { View, Dimensions } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import type { WebViewProps } from 'react-native-webview';
import i18n from '../translation';

interface HtmlText {
  html: string;
  width?: number;
  maxHeight?: number;
}

type HtmlTextProps = HtmlText & WebViewProps;

const HtmlText = ({
  html,
  width,
  maxHeight,
  ...webViewProps
}: HtmlTextProps) => {
  const rtl = i18n.dir() === 'rtl';

  const customStyle = `
            * {
                direction: ${rtl ? 'rtl' : 'ltr'};
            }
            a {
                pointer-events: none;
            }
        `;

  const [webViewSize, setWebViewSize] = useState({ height: 0, width: 0 });
  const webViewStyle = useMemo(() => {
    return { width: width ?? Dimensions.get('window').width * 0.8 };
  }, [width]);

  return (
    <View style={[webViewSize, { maxHeight }]}>
      <AutoHeightWebView
        style={webViewStyle}
        onSizeUpdated={setWebViewSize}
        source={{ html }}
        scrollEnabled={maxHeight !== undefined}
        customStyle={customStyle}
        {...webViewProps}
      />
    </View>
  );
};

export default HtmlText;
