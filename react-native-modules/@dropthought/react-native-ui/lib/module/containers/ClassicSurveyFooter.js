/**
 * @description a extension UI/UX component of SurveyScreenLayout
 * it displays three buttons:
 *  - Back, displayed when page is > 0
 *  - Next, displayed when page is not end
 *  - Submit, displayed when page is the last page
 * When "Back" is pressed, call props.onPrevPage
 * When "Next" or "Submit" is pressed, call props.onNextPage
 */
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import Button from '../components/Button';
import { GlobalStyle } from '../styles';
import i18n from '../translation';

const DummyButton = ({
  width
}) => /*#__PURE__*/React.createElement(View, {
  style: {
    width
  }
});

const ClassicSurveyFooter = props => {
  const dimensionWidthType = useDimensionWidthType();
  const rtl = i18n.dir() === 'rtl';
  const {
    survey,
    pageIndex = 0,
    onPrevPage,
    onNextPage
  } = props;
  const lastPage = pageIndex === survey.pageOrder.length - 1; // why use a dummy button here? we use 'space-between' to layout the buttons

  let LeftButtonComponent = Button;

  if (!pageIndex || pageIndex <= 0) {
    // @ts-ignore
    LeftButtonComponent = DummyButton;
  }

  const themeColor = props.survey.surveyProperty.hexCode;
  const btnWidth = dimensionWidthType === DimensionWidthType.phone ? 76 : 100;
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, rtl && GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(LeftButtonComponent, {
    width: btnWidth,
    title: i18n.t('survey:survey-back'),
    color: themeColor,
    onPress: onPrevPage // @ts-ignore
    ,
    containerStyle: styles.leftBtnContainer
  }), lastPage ? /*#__PURE__*/React.createElement(Button, {
    disabled: submitDisabled,
    width: btnWidth,
    title: i18n.t('survey:survey-submit'),
    color: themeColor,
    onPress: () => {
      setSubmitDisabled(true);
      onNextPage();
    } // @ts-ignore
    ,
    containerStyle: styles.rightBtnContainer
  }) : /*#__PURE__*/React.createElement(Button, {
    width: btnWidth,
    title: i18n.t('survey:survey-next'),
    color: themeColor,
    onPress: onNextPage // @ts-ignore
    ,
    containerStyle: styles.rightBtnContainer
  }));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...GlobalStyle.row,
    justifyContent: 'space-between',
    marginVertical: 30
  }
});
export default /*#__PURE__*/React.memo(ClassicSurveyFooter);
//# sourceMappingURL=ClassicSurveyFooter.js.map