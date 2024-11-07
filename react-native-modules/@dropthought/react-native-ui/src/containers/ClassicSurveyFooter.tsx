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

import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import Button from '../components/Button';
import { GlobalStyle } from '../styles';
import i18n from '../translation';
import type { Survey } from '../data';
import { useTheme } from '../contexts/theme';

const DummyButton = ({ width }: { width: number }) => (
  <View style={{ width }} />
);

type Props = {
  survey: Survey;
  pageIndex: number;
  isLast: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
};

const ClassicSurveyFooter = (props: Props) => {
  const { hexCode } = useTheme();
  const dimensionWidthType = useDimensionWidthType();
  const rtl = i18n.dir() === 'rtl';
  const { survey, pageIndex = 0, isLast, onPrevPage, onNextPage } = props;

  // why use a dummy button here? we use 'space-between' to layout the buttons
  let LeftButtonComponent = Button;
  if (!pageIndex || pageIndex <= 0) {
    // @ts-ignore
    LeftButtonComponent = DummyButton;
  }

  const themeColor = hexCode;
  const btnWidth = dimensionWidthType === DimensionWidthType.phone ? 76 : 100;

  const [submitDisabled, setSubmitDisabled] = React.useState(false);

  return (
    <View style={[styles.container, rtl && GlobalStyle.flexRowReverse]}>
      <LeftButtonComponent
        testID="test:id/button_back_preview"
        width={btnWidth}
        title={survey.backPage}
        color={themeColor}
        onPress={onPrevPage}
        // @ts-ignore
        containerStyle={styles.leftBtnContainer}
      />
      {isLast ? (
        <Button
          testID="test:id/button_submit_preview"
          disabled={submitDisabled}
          width={btnWidth}
          title={survey.submitSurvey}
          color={themeColor}
          onPress={() => {
            setSubmitDisabled(true);
            setTimeout(() => setSubmitDisabled(false), 1000);
            onNextPage();
          }}
          // @ts-ignore
          containerStyle={styles.rightBtnContainer}
        />
      ) : (
        <Button
          testID="test:id/button_next_preview"
          width={btnWidth}
          title={survey.nextPage}
          color={themeColor}
          onPress={onNextPage}
          // @ts-ignore
          containerStyle={styles.rightBtnContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...GlobalStyle.row,
    justifyContent: 'space-between',
    marginVertical: 30,
  },
});

export default React.memo(ClassicSurveyFooter);
