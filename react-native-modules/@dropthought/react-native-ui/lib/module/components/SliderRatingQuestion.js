import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import MandatoryTitle from './MandatoryTitle';
import { Colors, addOpacityToColor } from '../styles';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import { isNil } from 'ramda';
const MIN_VALUE = 1;
const NPS_MIN_VALUE = 0;

const getInitialSelectedValue = feedback => {
  if (feedback && feedback.answers && !isNil(feedback.answers[0])) {
    return parseInt(feedback.answers[0], 10);
  }

  return undefined;
};

const getLabelText = ({
  isPhone,
  question,
  maximumValue,
  valueData
}) => {
  const labelText = `${valueData + (question.type === 'nps' ? NPS_MIN_VALUE : MIN_VALUE)}`;

  if (isPhone) {
    if (valueData === 0) {
      return `${labelText} - ${question.options[0]}`;
    }

    if (valueData === maximumValue - 1) {
      return `${labelText} - ${question.options[question.options.length - 1]}`;
    }
  }

  return labelText;
};

const SliderRatingQuestion = ({
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  const {
    questionId,
    scale
  } = question;
  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const {
    colorScheme,
    fontColor,
    backgroundColor
  } = useTheme();
  const appearanceBackgroundColor = addOpacityToColor(colorScheme === COLOR_SCHEMES.dark ? Colors.appearanceSubBlack : themeColor, 0.08);
  const buttonTextSelected = {
    backgroundColor: colorScheme === COLOR_SCHEMES.dark ? addOpacityToColor(themeColor, 0.3) : appearanceBackgroundColor,
    borderColor: themeColor,
    color: colorScheme === COLOR_SCHEMES.dark ? fontColor : themeColor
  };
  const buttonTextStyle = {
    backgroundColor: appearanceBackgroundColor,
    borderColor: backgroundColor,
    color: fontColor
  };
  const [value, setValue] = useState(getInitialSelectedValue(feedback));

  const onSelected = index => {
    onFeedback({
      questionId,
      answers: [index],
      type: 'nps'
    });
    setValue(index);
  };

  const maximumValue = parseInt(scale, 10);

  const getSliderIndicator = () => {
    return [...Array(maximumValue).keys()].map((valueData, index) => {
      const textStyle = value === index ? [styles.buttonText, buttonTextStyle, buttonTextSelected] : [styles.buttonText, buttonTextStyle];
      return /*#__PURE__*/React.createElement(TouchableOpacity, {
        key: index,
        onPress: () => onSelected(index)
      }, /*#__PURE__*/React.createElement(Text, {
        style: textStyle
      }, getLabelText({
        isPhone,
        question,
        maximumValue,
        valueData
      })));
    });
  };

  return /*#__PURE__*/React.createElement(ScrollView, {
    style: commonStyles.container
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    forgot: forgot,
    question: question
  }), getSliderIndicator());
};

export default /*#__PURE__*/React.memo(SliderRatingQuestion);
const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42
  }
});
const phoneStyles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 24
  },
  buttonText: {
    textAlign: 'center',
    paddingVertical: 9,
    marginBottom: 10,
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 1
  }
});
const tabletStyles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 24
  },
  buttonText: {
    textAlign: 'center',
    paddingVertical: 9,
    marginBottom: 10,
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 1
  }
});
//# sourceMappingURL=SliderRatingQuestion.js.map