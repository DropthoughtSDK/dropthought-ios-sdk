// @ts-check
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import type { TextStyle } from 'react-native';
import { WebView } from 'react-native-webview';
import GlobalStyle, { Colors } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import i18n from '../translation';

/**
 * @param {OpenURLButtonProps} param0
 * @returns
 */

type OpenURLButtonProps = {
  url: string;
  textStyle?: TextStyle;
};

const OpenURLButton: React.FC<OpenURLButtonProps> = ({ url, textStyle }) => {
  const [visible, setVisible] = useState(false);
  const { backgroundColor, fontColor, colorScheme } = useTheme();
  const { top } = useSafeAreaInsets();
  const rtl = i18n.dir() === 'rtl';

  const urlStyle = [
    styles.url,
    { color: colorScheme === COLOR_SCHEMES.dark ? fontColor : Colors.urlBlue },
    rtl && GlobalStyle.textAlignRight,
    textStyle,
  ];
  const modalContentStyle = [
    styles.modalContent,
    {
      paddingTop: top,
      backgroundColor: backgroundColor,
    },
  ];
  const headerStyle = [
    styles.header,
    {
      backgroundColor: backgroundColor,
    },
  ];
  const iconStyle = {
    tintColor: fontColor,
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={GlobalStyle.flex1}
      >
        <Text testID="test:id/statement_url" style={urlStyle} numberOfLines={1}>
          {url}
        </Text>
      </TouchableOpacity>
      <Modal visible={visible}>
        <View style={modalContentStyle}>
          <View style={headerStyle}>
            <TouchableOpacity
              testID="test:id/icon_statement_webview_close"
              style={styles.closeIcon}
              onPress={() => setVisible(false)}
            >
              <Image
                style={iconStyle}
                // @ts-ignore
                source={require('../assets/icClose24Px.png')}
              />
            </TouchableOpacity>
          </View>
          <WebView
            source={{ uri: url }}
            style={GlobalStyle.flex1}
            nestedScrollEnabled
          />
        </View>
      </Modal>
    </>
  );
};

export default OpenURLButton;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderBottomWidth: 0.3,
    borderBottomColor: '#00000030',
    paddingHorizontal: 4,
  },
  closeIcon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  url: {
    fontSize: 16,
    fontWeight: '500',
  },
});
