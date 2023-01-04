import * as React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';

import { Colors, addOpacityToColor } from '../styles';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

const noop = (_id: any) => undefined;

type IconProps = {
  type: 'radio' | 'checkbox';
  checked: boolean;
  themeColor: string;
};

const Icon = ({ type, checked, themeColor }: IconProps) => {
  const { fontColor, colorScheme, backgroundColor } = useTheme();

  const checkboxContainerStyle = [
    styles.checkboxBorderBox,
    {
      borderColor: colorScheme === COLOR_SCHEMES.dark ? fontColor : themeColor,
      backgroundColor: addOpacityToColor(
        colorScheme === COLOR_SCHEMES.dark ? backgroundColor : themeColor,
        0.1
      ),
    },
  ];

  const checkboxContentStyle = [
    styles.checkboxContent,
    {
      backgroundColor: themeColor,
      opacity: checked ? 1 : 0,
    },
  ];

  const radioContainerStyle = [
    styles.radioBorderBox,
    {
      borderColor: themeColor,
      backgroundColor: addOpacityToColor(
        colorScheme === COLOR_SCHEMES.dark ? themeColor : backgroundColor,
        0.1
      ),
    },
  ];

  const radioContentStyle = [
    styles.radioContent,
    {
      backgroundColor:
        colorScheme === COLOR_SCHEMES.dark ? fontColor : themeColor,
      opacity: checked ? 1 : 0,
    },
  ];

  let content: React.ReactElement;
  if (type === 'checkbox') {
    content = checked ? (
      <View style={checkboxContentStyle}>
        <Image source={require('../assets/ic-check.png')} />
      </View>
    ) : (
      <View style={checkboxContainerStyle} />
    );
  } else {
    content = (
      <View>
        <View style={radioContainerStyle} />
        {checked ? <View style={radioContentStyle} /> : null}
      </View>
    );
  }

  return <View>{content}</View>;
};

export type Props = {
  type?: 'radio' | 'checkbox';
  id: any;
  title: string | React.ReactNode;
  checked: boolean;
  themeColor: string;
  onPress: (id: any) => void;
};

function NewOptionWithHighlight({
  type = 'radio',
  id: value,
  title,
  checked,
  themeColor,
  onPress = noop,
}: Props) {
  const { fontColor, colorScheme, backgroundColor } = useTheme();

  const appearanceBackgroundColor = addOpacityToColor(
    colorScheme === COLOR_SCHEMES.dark ? Colors.appearanceSubBlack : themeColor,
    0.08
  );

  const buttonContainerSelected = {
    backgroundColor:
      colorScheme === COLOR_SCHEMES.dark
        ? addOpacityToColor(themeColor, 0.3)
        : appearanceBackgroundColor,
    borderColor: themeColor,
    color: colorScheme === COLOR_SCHEMES.dark ? fontColor : themeColor,
  };

  const buttonContainerStyle = {
    backgroundColor: appearanceBackgroundColor,
    borderColor: backgroundColor,
    color: fontColor,
  };

  const containerStyle = checked
    ? [styles.buttonContainer, buttonContainerStyle, buttonContainerSelected]
    : [styles.buttonContainer, buttonContainerStyle];

  const textStyle = checked
    ? { color: colorScheme === COLOR_SCHEMES.dark ? fontColor : themeColor }
    : { color: fontColor };

  let content;
  if (typeof title === 'string') {
    content = <Text style={textStyle}>{title}</Text>;
  } else {
    content = title;
  }

  return (
    <TouchableOpacity onPress={() => onPress(value)}>
      <View style={containerStyle}>
        <Icon type={type} checked={checked} themeColor={themeColor} />
        {content}
        <View style={styles.dummyComponent} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
  },
  checkboxContent: {
    width: 18,
    height: 18,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBorderBox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 1,
  },
  radioContent: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 10,
    height: 10,
    borderRadius: 8,
  },
  radioBorderBox: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
  },
  dummyComponent: {
    width: 18,
    height: 18,
  },
});

export default React.memo(NewOptionWithHighlight);
