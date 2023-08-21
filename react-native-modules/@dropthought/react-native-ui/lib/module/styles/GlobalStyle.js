import { StyleSheet } from 'react-native';
import { Colors } from './Colors';
import { DimensionWidthType } from '../hooks/useWindowDimensions';
export const QuestionContentTextSize = StyleSheet.create({
  [DimensionWidthType.phone]: {
    fontSize: 17
  },
  [DimensionWidthType.tablet]: {
    fontSize: 15
  }
});
export const GlobalStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center'
  },
  dialog: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingBottom: 30,
    paddingLeft: 46,
    paddingRight: 46,
    paddingTop: 40
  },
  dialogButton: {
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 5
  },
  dialogDescription: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20
  },
  dialogLeftButtonDescription: {
    color: Colors.purple,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center'
  },
  dialogPrimaryButton: {
    backgroundColor: Colors.purple
  },
  dialogRightButtonDescription: {
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center'
  },
  flex1: {
    flex: 1
  },
  flexEnd: {
    justifyContent: 'flex-end'
  },
  flexRowReverse: {
    flexDirection: 'row-reverse'
  },
  horizontalFlip: {
    transform: [{
      rotateY: '180deg'
    }]
  },
  null: {},
  // used in OpenQuestion, SliderRatingQuestion, ...the survey question component
  questionContainer: {
    fontSize: 18,
    marginTop: 45
  },
  textAlignLeft: {
    textAlign: 'left'
  },
  textAlignRight: {
    textAlign: 'right'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fullCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexShrink1: {
    flexShrink: 1
  },
  loadingMask: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.loadingMaskBG,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
});
//# sourceMappingURL=GlobalStyle.js.map