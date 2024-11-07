function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useMemo, useState } from 'react';
import { View, Dimensions } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import i18n from '../translation';
const HtmlText = ({
  html,
  width,
  maxHeight,
  ...webViewProps
}) => {
  const rtl = i18n.dir() === 'rtl';
  const customStyle = `
            * {
                direction: ${rtl ? 'rtl' : 'ltr'};
            }
            a {
                pointer-events: none;
            }
        `;
  const [webViewSize, setWebViewSize] = useState({
    height: 0,
    width: 0
  });
  const webViewStyle = useMemo(() => {
    return {
      width: width ?? Dimensions.get('window').width * 0.8
    };
  }, [width]);
  return /*#__PURE__*/React.createElement(View, {
    style: [webViewSize, {
      maxHeight
    }]
  }, /*#__PURE__*/React.createElement(AutoHeightWebView, _extends({
    style: webViewStyle,
    onSizeUpdated: setWebViewSize,
    source: {
      html
    },
    scrollEnabled: maxHeight !== undefined,
    customStyle: customStyle
  }, webViewProps)));
};
export default HtmlText;
//# sourceMappingURL=HtmlText.js.map