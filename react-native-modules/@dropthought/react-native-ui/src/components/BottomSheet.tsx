import React, { ReactChild } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Modal,
  Text,
} from 'react-native';
//@ts-ignore
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/theme';

import { Colors, GlobalStyle } from '../styles';

interface Props {
  coverScreen: boolean;
  title?: string;
  onBackdropPress?: () => void;
  componentInside?: ReactChild;
  componentHeight: number;
  visible: boolean;
  navigationComponent?: ReactChild;
}

interface NavProps {
  backgroundColor?: string;
  disableOnConfirm: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const NavigationComponent: React.FC<NavProps> = ({
  backgroundColor = '#ffffff',
  disableOnConfirm = true,
  onCancel,
  onConfirm,
}) => {
  const containerStyle = [
    navStyles.container,
    { backgroundColor: backgroundColor },
  ];
  const buttonRightStyle = [
    navStyles.buttonContainer,
    { opacity: disableOnConfirm ? 0.3 : 1 },
  ];
  return (
    <View style={containerStyle}>
      <View style={navStyles.content}>
        <TouchableOpacity style={navStyles.buttonContainer} onPress={onCancel}>
          <Text style={navStyles.buttonLeft}>Cancel</Text>
        </TouchableOpacity>
        <View style={navStyles.labelContaienr}>
          <Text style={navStyles.label}>Select your option</Text>
        </View>
        <TouchableOpacity
          disabled={disableOnConfirm}
          style={buttonRightStyle}
          onPress={onConfirm}
        >
          <Image
            style={navStyles.buttonRight}
            source={require('../assets/ic-check.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BottomSheet: React.FC<Props> = ({
  coverScreen = false,
  title,
  onBackdropPress,
  componentInside,
  componentHeight,
  navigationComponent,
  visible,
  children,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { backgroundColor } = useTheme();

  const heightValueRef = React.useRef(0);
  const animatedHeightRef = React.useRef(new Animated.Value(0));
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    let toValue = 0;
    if (visible) {
      let titleBarHeight = 48;
      toValue = titleBarHeight + componentHeight + bottom;
      if (coverScreen) setModalVisible(true);
    }

    if (heightValueRef.current === toValue) {
      // when current height value is the same as toValue, skip animation
      return;
    }
    heightValueRef.current = toValue;
    Animated.timing(animatedHeightRef.current, {
      toValue: toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      if (!visible && coverScreen) setModalVisible(false);
    });
  }, [visible, componentHeight, bottom, coverScreen]);

  const contentNavStyle = [
    styles.container,
    { height: animatedHeightRef.current },
    { paddingBottom: bottom, backgroundColor: backgroundColor },
  ];

  const contentView = (
    <Animated.View style={contentNavStyle} testID={`${title}-bottom-sheet`}>
      {navigationComponent ? (
        navigationComponent
      ) : (
        <View style={styles.divider} />
      )}
      {children || componentInside}
    </Animated.View>
  );

  if (!coverScreen) {
    return contentView;
  }

  return (
    <Modal
      onRequestClose={onBackdropPress}
      animationType="none"
      transparent
      //@ts-ignore
      statusBarTranslucent
      visible={modalVisible}
    >
      <View style={styles.backdrop}>
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View style={GlobalStyle.flex1} />
        </TouchableWithoutFeedback>
        {contentView}
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    height: 368,
    width: '100%',
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  divider: {
    height: 2,
    width: 150,
    // TODO: later set this back to Colors.secondaryDivider, when applying gesture
    backgroundColor: Colors.transparent,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  navigationArea: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 15,
  },
  title: {},
  subTitle: {
    marginTop: 4,
  },
  backdrop: {
    backgroundColor: Colors.backdropBG,
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
});

const navStyles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 84,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLeft: {
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 17,
    color: Colors.white,
  },
  buttonRight: {
    width: 18,
    height: 14,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },
  labelContaienr: {
    flex: 1,
  },
});
