import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Platform,
} from 'react-native';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import GlobalStyle, { Colors } from '../styles';
import { isNil } from 'ramda';
import i18n from '../translation';
import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import type {
  Feedback as OriginFeedback,
  Question as OriginQuestion,
} from '../data';

type Feedback = OriginFeedback & {
  answers: string[];
};

type Question = OriginQuestion & {
  options: string[];
  scale: string;
};

const MIN_VALUE = 1;
const NPS_MIN_VALUE = 0;

const getInitialSelectedValue = (feedback: Feedback) => {
  if (feedback && feedback.answers && !isNil(feedback.answers[0])) {
    return parseInt(feedback.answers[0], 10);
  }
  return undefined;
};

const getLabelText = ({
  isPhone,
  question,
  maximumValue,
  valueData,
}: {
  isPhone: boolean;
  question: Question;
  maximumValue: number;
  valueData: number;
}) => {
  const labelText = `${
    valueData + (question.type === 'nps' ? NPS_MIN_VALUE : MIN_VALUE)
  }`;
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

type Props = {
  mandatoryErrorMessage: string;
  question: Question;
  onFeedback: ({
    questionId,
    answers,
    type,
  }: {
    questionId: string;
    answers: number[];
    type: string;
  }) => void;
  feedback: Feedback;
  forgot: boolean;
  themeColor: string;
};

const ClassicSliderRatingQuestion = ({
  mandatoryErrorMessage,
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor,
}: Props) => {
  const {
    colorScheme,
    fontColor,
    backgroundColor: themeBackgroundColor,
  } = useTheme();
  const [value, setValue] = React.useState(getInitialSelectedValue(feedback));
  const maximumValue = parseInt(question.scale, 10);

  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;

  const getBackgroundColorStyle = ({
    selected,
    darkMode,
  }: {
    selected: boolean;
    darkMode: boolean;
  }) => {
    if (selected) {
      return {
        backgroundColor: themeColor,
        resizeMode: 'contain',
      };
    }
    if (darkMode) {
      return styles.backgroundDark;
    }
    return { backgroundColor: themeBackgroundColor };
  };

  const getSliderIndicator = () => {
    const textStyle = [
      styles.label,
      {
        color: fontColor,
        minHeight: i18n.language === 'te' ? 25 : 0,
        marginTop: i18n.language === 'te' ? 8 : 0,
        marginBottom: i18n.language === 'te' ? 2 : 0,
      },
    ];
    return [...Array(maximumValue).keys()].map((valueData, index) => (
      <TouchableHighlight
        accessible={false}
        testID={`test:id/scale_option_${index === value}`}
        underlayColor={themeBackgroundColor}
        key={index.toString()}
        onPress={() => {
          onFeedback({
            questionId: question.questionId,
            answers: [index],
            type: question.type,
          });
          setValue(index);
        }}
      >
        <View
          style={[
            isPhone ? styles.backgroundPhone : styles.backgroundTablet,
            getBackgroundColorStyle({
              selected: index === value,
              darkMode: colorScheme === COLOR_SCHEMES.dark,
            }),
          ]}
        >
          <Text
            testID={`test:id/scale_label_${fontColor}`}
            style={[textStyle, index === value ? styles.selectedLabel : {}]}
          >
            {getLabelText({
              isPhone,
              question,
              maximumValue,
              valueData,
            })}
          </Text>
        </View>
      </TouchableHighlight>
    ));
  };

  const getWidthStyle = () => {
    let width =
      (maximumValue / 10.0) * 100 > 100 ? 100 : (maximumValue / 10.0) * 100;
    return {
      maxWidth: width + '%',
      marginTop: 22,
      paddingHorizontal: 10,
    };
  };

  const rtl = i18n.dir() === 'rtl';
  return (
    <View style={GlobalStyle.questionContainer}>
      <ClassicMandatoryTitle
        style={styles.marginBottom25}
        forgot={forgot}
        mandatoryErrorMessage={mandatoryErrorMessage}
        question={question}
      />
      {isPhone ? (
        <View style={[styles.vertical]}>{getSliderIndicator()}</View>
      ) : (
        <>
          <View style={rtl && GlobalStyle.flexRowReverse}>
            <View
              // @ts-ignore
              style={getWidthStyle()}
            >
              <View style={styles.line} />
              <View
                style={[styles.horizontal, rtl && GlobalStyle.flexRowReverse]}
              >
                {getSliderIndicator()}
              </View>
            </View>
          </View>
          <View style={rtl && GlobalStyle.flexRowReverse}>
            <View
              style={[
                styles.horizontal,
                styles.marginTop10,
                getWidthStyle(),
                rtl && GlobalStyle.flexRowReverse,
              ]}
            >
              <Text style={styles.options}>{question.options[0]}</Text>
              <Text style={styles.options}>
                {question.options[question.options.length - 1]}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default React.memo(ClassicSliderRatingQuestion);

const styles = StyleSheet.create({
  backgroundPhone: {
    backgroundColor: Colors.white,
    borderColor: Colors.sliderShadowColor,
    borderRadius: 2,
    elevation: 5,
    minHeight: 33,
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    width: '100%',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundTablet: {
    backgroundColor: Colors.white,
    borderColor: Colors.sliderShadowColor,
    borderRadius: 1000,
    elevation: 5,
    height: 45,
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 45,
  },
  backgroundDark: {
    backgroundColor: Colors.sliderBackgroundDark,
    elevation: 0,
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  vertical: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    ...Platform.select({
      android: {
        paddingHorizontal: 7,
      },
    }),
  },
  label: {
    textAlign: 'center',
  },
  line: {
    backgroundColor: Colors.sliderShadowColor,
    height: 1,
    top: '50%',
    width: '100%',
  },
  marginBottom10: {
    marginBottom: 10,
  },
  marginBottom25: {
    marginBottom: 25,
  },
  marginTop10: {
    marginTop: 10,
  },
  options: {
    fontSize: 12,
  },
  selectedLabel: {
    textAlign: 'center',
  },
});
