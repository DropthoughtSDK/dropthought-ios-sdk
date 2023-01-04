import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  i18n,
  useDimensionWidthType,
  DimensionWidthType,
  useTheme,
  THEME_OPTION,
} from '@dropthought/react-native-ui';
import CloseButton, { ICON_SIZE } from '../components/CloseButton';

/**
 * @typedef {object} Props
 * @property {string} title
 * @property {string} themeColor
 * @property {()=>void=} onClose
 */

/**
 * @type {React.FunctionComponent<Props>}
 * @param {Props} props
 */
const Header = ({ title, themeColor, onClose }) => {
  const { themeOption } = useTheme();
  const insets = useSafeAreaInsets();
  const isRtl = i18n.dir() === 'rtl';
  const isPhone = useDimensionWidthType() === DimensionWidthType.phone;

  const classicHeader = (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColor, paddingTop: insets.top },
      ]}
    >
      <View style={styles.header}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            isPhone ? styles.titleIPhone : styles.titleAndroid,
          ]}
        >
          {title}
        </Text>
        <View
          style={[
            styles.closeButtonWrapper,
            isRtl ? styles.closeButtonWrapperRtl : styles.closeButtonWrapperLtr,
          ]}
        >
          <CloseButton onPress={onClose} />
        </View>
      </View>
    </View>
  );

  return themeOption === THEME_OPTION.CLASSIC ? classicHeader : null;
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    height: ICON_SIZE,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: ICON_SIZE,
  },
  titleIPhone: {
    textAlign: 'left',
  },
  titleAndroid: {
    textAlign: 'center',
  },
  closeButtonWrapper: {
    position: 'absolute',
  },
  closeButtonWrapperRtl: {
    right: 0,
  },
  closeButtonWrapperLtr: { left: 0 },
});
