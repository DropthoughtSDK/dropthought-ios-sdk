function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { isNil } from 'ramda';
import SmileyIcon from './SmileyIcon';
import MandatoryTitle from './MandatoryTitle';
import GlobalStyle from '../styles';
import i18n from '../translation';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

const noop = () => undefined;

const getInitialSelectedValue = (feedback, question) => {
  let prevAnswer;

  if (feedback && feedback.answers && !isNil(feedback.answers[0])) {
    prevAnswer = parseInt(feedback.answers[0], 10);
  }

  return question.options.map((_option, index) => prevAnswer === index);
};

const VeryDislikeIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}) => {
  const {
    colorScheme
  } = useTheme();
  return /*#__PURE__*/React.createElement(SmileyIcon, _extends({
    selected: selected,
    onPress: onPress,
    label: label
  }, restProps, {
    source: selected ? require('../assets/btn_very_dislike_selected.png') : colorScheme === COLOR_SCHEMES.dark ? require('../assets/btn_very_dislike_dark.png') : require('../assets/btn_very_dislike.png')
  }));
};

const VeryLikeIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}) => {
  const {
    colorScheme
  } = useTheme();
  return /*#__PURE__*/React.createElement(SmileyIcon, _extends({
    selected: selected,
    onPress: onPress,
    label: label
  }, restProps, {
    source: selected ? require('../assets/btn_very_like_selected.png') : colorScheme === COLOR_SCHEMES.dark ? require('../assets/btn_very_like_dark.png') : require('../assets/btn_very_like.png')
  }));
};

const NotSureIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}) => {
  const {
    colorScheme
  } = useTheme();
  return /*#__PURE__*/React.createElement(SmileyIcon, _extends({
    selected: selected,
    onPress: onPress,
    label: label
  }, restProps, {
    source: selected ? require('../assets/btn_not_sure_selected.png') : colorScheme === COLOR_SCHEMES.dark ? require('../assets/btn_not_sure_dark.png') : require('../assets/btn_not_sure.png')
  }));
};

const LikeIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}) => {
  const {
    colorScheme
  } = useTheme();
  return /*#__PURE__*/React.createElement(SmileyIcon, _extends({
    selected: selected,
    onPress: onPress,
    label: label
  }, restProps, {
    source: selected ? require('../assets/btn_like_selected.png') : colorScheme === COLOR_SCHEMES.dark ? require('../assets/btn_like_dark.png') : require('../assets/btn_like.png')
  }));
};

const DislikeIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}) => {
  const {
    colorScheme
  } = useTheme();
  return /*#__PURE__*/React.createElement(SmileyIcon, _extends({
    selected: selected,
    onPress: onPress,
    label: label
  }, restProps, {
    source: selected ? require('../assets/btn_dislike_selected.png') : colorScheme === COLOR_SCHEMES.dark ? require('../assets/btn_dislike_dark.png') : require('../assets/btn_dislike.png')
  }));
};

const SmileyRatingQuestion = ({
  question,
  onFeedback,
  feedback,
  forgot
}) => {
  const [selected, setSelected] = React.useState(getInitialSelectedValue(feedback, question));
  const setSelectedAndFeedback = React.useCallback(index => {
    let selectedMap = question.options.map(() => false);
    selectedMap[index] = true;
    setSelected(selectedMap);
    onFeedback({
      questionId: question.questionId,
      answers: [index],
      type: 'rating'
    });
  }, [onFeedback, question.options, question.questionId]);
  const rtl = i18n.dir() === 'rtl';
  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const fakeSmiley = !isPhone && /*#__PURE__*/React.createElement(SmileyIcon, {
    selected: false,
    onPress: noop,
    label: ""
  });

  const renderSmiley = () => {
    const viewStyle = isPhone ? styles.containter : [styles.containter, rtl && GlobalStyle.flexRowReverse];
    const {
      options
    } = question;

    switch (options.length) {
      case 2:
        return /*#__PURE__*/React.createElement(View, {
          style: viewStyle
        }, /*#__PURE__*/React.createElement(VeryDislikeIcon, {
          selected: selected[0],
          onPress: () => setSelectedAndFeedback(0),
          label: options[0]
        }), /*#__PURE__*/React.createElement(VeryLikeIcon, {
          selected: selected[1],
          onPress: () => setSelectedAndFeedback(1),
          label: options[1]
        }), fakeSmiley, fakeSmiley, fakeSmiley);

      case 3:
        return /*#__PURE__*/React.createElement(View, {
          style: viewStyle
        }, /*#__PURE__*/React.createElement(VeryDislikeIcon, {
          selected: selected[0],
          onPress: () => setSelectedAndFeedback(0),
          label: options[0]
        }), /*#__PURE__*/React.createElement(NotSureIcon, {
          selected: selected[1],
          onPress: () => setSelectedAndFeedback(1),
          label: options[1]
        }), /*#__PURE__*/React.createElement(VeryLikeIcon, {
          selected: selected[2],
          onPress: () => setSelectedAndFeedback(2),
          label: options[2]
        }), fakeSmiley, fakeSmiley);

      case 4:
        return /*#__PURE__*/React.createElement(View, {
          style: viewStyle
        }, /*#__PURE__*/React.createElement(VeryDislikeIcon, {
          selected: selected[0],
          onPress: () => setSelectedAndFeedback(0),
          label: options[0]
        }), /*#__PURE__*/React.createElement(NotSureIcon, {
          selected: selected[1],
          onPress: () => setSelectedAndFeedback(1),
          label: options[1]
        }), /*#__PURE__*/React.createElement(LikeIcon, {
          selected: selected[2],
          onPress: () => setSelectedAndFeedback(2),
          label: options[2]
        }), /*#__PURE__*/React.createElement(VeryLikeIcon, {
          selected: selected[3],
          onPress: () => setSelectedAndFeedback(3),
          label: options[3]
        }), fakeSmiley);

      case 5:
        return /*#__PURE__*/React.createElement(View, {
          style: viewStyle
        }, /*#__PURE__*/React.createElement(VeryDislikeIcon, {
          selected: selected[0],
          onPress: () => setSelectedAndFeedback(0),
          label: options[0]
        }), /*#__PURE__*/React.createElement(DislikeIcon, {
          selected: selected[1],
          onPress: () => setSelectedAndFeedback(1),
          label: options[1]
        }), /*#__PURE__*/React.createElement(NotSureIcon, {
          selected: selected[2],
          onPress: () => setSelectedAndFeedback(2),
          label: options[2]
        }), /*#__PURE__*/React.createElement(LikeIcon, {
          selected: selected[3],
          onPress: () => setSelectedAndFeedback(3),
          label: options[3]
        }), /*#__PURE__*/React.createElement(VeryLikeIcon, {
          selected: selected[4],
          onPress: () => setSelectedAndFeedback(4),
          label: options[4]
        }));

      default:
        return null;
    }
  };

  return /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.questionContainer
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    forgot: forgot,
    question: question
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.smileyRowContainer, rtl && GlobalStyle.flexEnd]
  }, renderSmiley()));
};

export default /*#__PURE__*/React.memo(SmileyRatingQuestion);
const phoneStyles = StyleSheet.create({
  containter: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between'
  },
  smileyRowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 6
  }
});
const tabletStyles = StyleSheet.create({
  containter: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 560,
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  smileyRowContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});
//# sourceMappingURL=SmileyRatingQuestion.js.map