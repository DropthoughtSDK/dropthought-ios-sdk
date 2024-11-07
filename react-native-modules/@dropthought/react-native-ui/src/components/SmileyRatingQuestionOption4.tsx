import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { Colors } from '../styles';
import i18n from '../translation';
import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import type {
  Feedback as OriginFeedback,
  Question as OriginQuestion,
  Survey,
} from '../data';
import LottieView from 'lottie-react-native';
import SurveyFooter from '../containers/SurveyFooter';
import SurveyHeader from '../containers/SurveyHeader';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import MandatoryTitle from './MandatoryTitle';
import {
  scaleLogic,
  option4FaceTable as faceTable,
  option4LoopFaceTable as loopFaceTable,
  option4TransformTable as transformTable,
} from '../utils/data';
import { isNil } from 'ramda';

type Feedback = OriginFeedback & {
  answers: string[];
};

type Question = OriginQuestion & {
  options: string[];
  scale: string;
};

type Props = {
  survey: Survey;
  pageIndex: number;
  question: Question;
  forgot: boolean;
  onClose: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
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
  isLastPage: boolean;
};

const SmileyRatingQuestionOption4 = ({
  survey,
  pageIndex,
  question,
  forgot,
  onClose,
  onPrevPage,
  onNextPage,
  onFeedback,
  feedback,
  isLastPage,
}: Props) => {
  const answered =
    feedback &&
    feedback.answers &&
    !isNil(feedback.answers[0]) &&
    typeof feedback.answers[0] === 'number';
  const answeredValue: number =
    answered && feedback.answers[0] ? parseInt(feedback.answers[0], 10) : 0;

  const windowHeight = Dimensions.get('window').height;
  const { questionId, scale, options } = question;
  const [selectedIndex, setSelectedIndex] = React.useState<number>(
    answered ? answeredValue : 0
  );
  const [score, setScore] = React.useState<number>(
    answered ? answeredValue : -1
  );
  const [isLoop, setIsLoop] = React.useState<boolean>(true);
  const [loopLotties, setLoopLotties] = React.useState<string[]>([]);
  const [transformLotties, setTransformLotties] = React.useState<string[]>([]);
  const scoreContainerOpacity = React.useRef(
    new Animated.Value(answered ? 1 : 0)
  ).current;
  const scoreOpacity = React.useRef(
    new Animated.Value(answered ? 1 : 0)
  ).current;
  const descriptionYAxis = React.useRef(
    new Animated.Value(answered ? 1 : windowHeight / 2 - 246 + 37)
  ).current;
  // 37 -> one text line height
  // 246 -> Padding Vertical 123

  const lottieRef = React.useRef<LottieView>();

  const totalScore = Number(scale);
  const renderScore = score + 1;
  const hasEdited = score >= 0;

  // choose which scale logic we want to use.
  const scaleLogicList = scaleLogic[scale];

  useEffect(() => {
    if (scaleLogicList) {
      const loopList = scaleLogicList.map((value, index) => {
        const scaleKey = String(index + 1) + faceTable[value];
        return loopFaceTable.get(scaleKey);
      });

      const transformList = scaleLogicList.map((value, index, array) => {
        if (index === 0) return '';
        // @ts-ignore
        const fromScale = String(index) + faceTable[array[index - 1]];
        const toScale = String(index + 1) + faceTable[value];
        const key = `${fromScale}-${toScale}`;
        return transformTable.get(key);
      });

      setLoopLotties(loopList);
      setTransformLotties(transformList);
    }
  }, [scaleLogicList]);

  const imageLignt = require('../assets/icOption4Info.png');
  const imageDark = require('../assets/icOption4InfoDark.png');

  const updateScore = React.useCallback(
    (number: number) => {
      const isAtCoverScreen = score === -1;
      const newScore = score + number;

      setScore(newScore);

      if (!isAtCoverScreen) {
        setSelectedIndex(newScore);
        if (number > 0) {
          setIsLoop(false);
        } else {
          setIsLoop(true);
          setTimeout(() => {
            lottieRef.current?.play();
          }, 100);
        }
      }

      //animtaion--
      scoreOpacity.setValue(0);
      if (isAtCoverScreen) {
        Animated.sequence([
          Animated.timing(descriptionYAxis, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scoreContainerOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scoreOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.timing(scoreOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
      //animtaion--

      onFeedback({
        questionId,
        answers: [newScore],
        type: 'rating',
      });
    },
    [
      score,
      scoreOpacity,
      onFeedback,
      questionId,
      descriptionYAxis,
      scoreContainerOpacity,
    ]
  );
  const { hexCode, backgroundColor, fontColor, colorScheme } = useTheme();

  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;

  const containerStyle = [commonStyles.container, { backgroundColor }];

  const scoreSelectedStyle = [
    styles.scoreSelected,
    { opacity: scoreOpacity, color: fontColor },
  ];

  const descStyle = [
    styles.desc,
    {
      transform: [{ translateY: descriptionYAxis }],
      opacity: scoreContainerOpacity,
      color: fontColor,
      lineHeight: i18n.language === 'te' ? 42 : undefined,
    },
  ];

  const slashStyle = [
    styles.slash,
    {
      opacity: scoreContainerOpacity,
      marginBottom: Platform.OS === 'ios' ? 14 : 7,
    },
  ];

  const scoreTotalStyle = [
    styles.scoreTotal,
    {
      opacity: scoreContainerOpacity,
      marginBottom: Platform.OS === 'ios' ? 5 : 4,
    },
  ];

  const hintContainerStyle = hasEdited ? null : commonStyles.hintContainer;

  const hintTextStyle = [commonStyles.hintText, { color: fontColor }];

  const hintSubTextStyle = [commonStyles.hintSubText, { color: fontColor }];

  useEffect(() => {
    if (isLoop) {
      setTimeout(() => {
        lottieRef.current?.play();
      }, 100);
    }
  }, [isLoop]);

  const handleDecreaseScore = () => {
    if (score > 0) updateScore(-1);
  };

  const lottieContainer = isLoop ? (
    <View
      accessibilityLabel={`selected_custom_star_${selectedIndex}`}
      style={commonStyles.lottieContainer}
    >
      <TouchableWithoutFeedback onPress={handleDecreaseScore}>
        {loopLotties[selectedIndex] ? (
          <LottieView
            /* @ts-ignore */
            ref={lottieRef}
            source={loopLotties[selectedIndex]}
            style={commonStyles.lottieContent}
            autoPlay
            loop
          />
        ) : (
          <></>
        )}
      </TouchableWithoutFeedback>
    </View>
  ) : (
    <View style={commonStyles.lottieContainer}>
      <TouchableWithoutFeedback onPress={handleDecreaseScore}>
        {transformLotties[selectedIndex] ? (
          <LottieView
            source={transformLotties[selectedIndex]}
            style={commonStyles.lottieContent}
            autoPlay
            loop={false}
            onAnimationFinish={(isCancel) => {
              setTimeout(() => {
                if (!isCancel) setIsLoop(true);
              }, 500);
            }}
          />
        ) : (
          <></>
        )}
      </TouchableWithoutFeedback>
    </View>
  );

  const infoImage = (
    <Image
      style={commonStyles.infoImage}
      source={colorScheme === COLOR_SCHEMES.dark ? imageDark : imageLignt}
    />
  );

  const scoreContainer = (
    <TouchableWithoutFeedback
      onPress={() => {
        if (renderScore < totalScore) updateScore(1);
      }}
    >
      <View style={commonStyles.scoreContainer}>
        <View
          testID="test:id/custom_star_score_value"
          style={commonStyles.scoreText}
        >
          <Animated.Text
            testID="test:id/custom_star_render_score"
            style={scoreSelectedStyle}
          >
            {renderScore}
          </Animated.Text>
          <Animated.Text style={slashStyle}>{'/'}</Animated.Text>
          <Animated.Text
            testID="test:id/custom_star_total_score"
            style={scoreTotalStyle}
          >
            {totalScore}
          </Animated.Text>
        </View>
        <Animated.Text
          testID="test:id/custom_star_score_desc"
          style={descStyle}
        >
          {options[selectedIndex]}
        </Animated.Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <SurveyHeader
        survey={survey}
        pageIndex={pageIndex}
        backgroundColor={backgroundColor}
        onClose={onClose}
      />
      <View style={containerStyle}>
        <MandatoryTitle
          question={question}
          mandatoryErrorMessage={survey.mandatoryErrorMessage}
          forgot={forgot}
        />
        <View style={commonStyles.contentContainer}>
          {hasEdited ? (
            <>
              {lottieContainer}
              {scoreContainer}
            </>
          ) : null}
          <TouchableOpacity
            style={hintContainerStyle}
            disabled={score > -1}
            onPress={() => updateScore(1)}
          >
            <>
              {hasEdited ? null : infoImage}
              <Text
                testID={`test:id/custom_star_title_${colorScheme}`}
                style={hintTextStyle}
              >
                {`${i18n.t('option4HintDescription:title')}`}
              </Text>
              <Text
                testID="test:id/custom_star_subtitle"
                style={hintSubTextStyle}
              >
                {`${i18n.t('option4HintDescription:subTitle', {
                  count: totalScore,
                })}`}
              </Text>
            </>
          </TouchableOpacity>
        </View>
      </View>
      <SurveyFooter
        submitSurvey={survey.submitSurvey}
        surveyColor={hexCode}
        isFirstPage={pageIndex === 0}
        isLastPage={isLastPage}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        backgroundColor={backgroundColor}
      />
    </>
  );
};

export default SmileyRatingQuestionOption4;

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingBottom: 7,
  },
  contentContainer: {
    width: '100%',
    flex: 5,
    alignItems: 'center',
  },
  infoImage: {
    marginBottom: 30,
  },
  hintContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 6,
  },
  hintSubText: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  lottieContainer: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  scoreText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  lottieContent: {
    width: '100%',
    height: '100%',
  },
});

const phoneStyles = StyleSheet.create({
  desc: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreSelected: {
    fontSize: 74,
    textAlign: 'center',
    alignItems: 'baseline',
  },
  scoreTotal: {
    fontSize: 55,
    color: Colors.smileyRatingScoreGray,
  },
  slash: {
    fontSize: 55,
    color: Colors.smileyRatingScoreGray,
  },
});

const tabletStyles = StyleSheet.create({
  desc: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreSelected: {
    fontSize: 74,
    textAlign: 'center',
    alignItems: 'baseline',
  },
  scoreTotal: {
    fontSize: 55,
    color: Colors.smileyRatingScoreGray,
  },
  slash: {
    fontSize: 37,
    color: Colors.smileyRatingScoreGray,
  },
});
