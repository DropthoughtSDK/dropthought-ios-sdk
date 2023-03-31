import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SmileyIcon from './SmileyIcon';
import { isNil } from 'ramda';
import MandatoryTitle from './MandatoryTitle';
import GlobalStyle from '../styles';
import i18n from '../translation';
import { defaultIcon, getIcons, getSelectedIcons, RatingIconType } from '../constants/RatingQuestionConstants';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import { useTheme } from '../contexts/theme';

const FakeSmiley = () => {
  return /*#__PURE__*/React.createElement(SmileyIcon, {
    selected: false,
    onPress: () => {},
    label: ""
  });
};

const ClassicIconRatingQuestion = ({
  question,
  feedback,
  forgot,
  onFeedback
}) => {
  const {
    colorScheme
  } = useTheme();
  const rtl = i18n.dir() === 'rtl';
  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const {
    options = [],
    subType = 'smiley',
    questionId
  } = question;
  const optionAmount = options.length;
  const fakeSmileyAmount = 5 - optionAmount;
  const [selectedIndex, setSelectedIndex] = useState();
  const baseIcon = useMemo(() => defaultIcon(subType, colorScheme), [colorScheme, subType]);
  const icons = useMemo(() => getIcons(subType, optionAmount), [subType, optionAmount]);
  const selectedIcons = useMemo(() => getSelectedIcons(subType, optionAmount), [subType, optionAmount]);
  useEffect(() => {
    getInitialSelectedValueFromFeedbackProps(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInitialSelectedValueFromFeedbackProps = () => {
    let prevAnswer;

    if (feedback && feedback.answers && !isNil(feedback.answers[0])) {
      prevAnswer = parseInt(feedback.answers[0], 10);
      setSelectedIndex(prevAnswer);
    }
  };

  const setSelectedAndFeedback = index => {
    setSelectedIndex(index);
    const result = {
      questionId,
      answers: [index],
      type: 'rating'
    };
    onFeedback(result);
  };

  const iconRow = /*#__PURE__*/React.createElement(View, {
    style: [styles.horizontal, rtl && GlobalStyle.flexRowReverse]
  }, options.map((option, index) => {
    const isSelected = selectedIndex === index;
    let source;

    if (subType === RatingIconType.star || subType === RatingIconType.heart) {
      if (selectedIndex !== undefined) {
        source = selectedIndex >= index ? icons[selectedIndex] : baseIcon;
      } else {
        source = baseIcon;
      }
    } else {
      source = isSelected ? selectedIcons[index] : icons[index];
    }

    return /*#__PURE__*/React.createElement(SmileyIcon, {
      selected: isSelected,
      source: source,
      label: option,
      onPress: () => setSelectedAndFeedback(index),
      key: index.toString()
    });
  }), Array(fakeSmileyAmount).map((_, index) => /*#__PURE__*/React.createElement(FakeSmiley, {
    key: index.toString()
  })));
  return /*#__PURE__*/React.createElement(View, {
    style: commonStyles.container
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    forgot: forgot,
    question: question
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.smileyRowContainer, rtl && GlobalStyle.flexEnd]
  }, iconRow));
};

export default /*#__PURE__*/React.memo(ClassicIconRatingQuestion);
const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42
  }
});
const phoneStyles = StyleSheet.create({
  horizontal: {
    flex: 1,
    flexDirection: 'column',
    maxWidth: 560,
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  smileyRowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 6
  }
});
const tabletStyles = StyleSheet.create({
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 560,
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  smileyRowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 6
  }
});
//# sourceMappingURL=IconRatingQuestion.js.map