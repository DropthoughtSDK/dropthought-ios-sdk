import * as React from 'react';
import { View, Modal, Dimensions } from 'react-native';
import { pick, omit } from 'ramda';
import { GlobalStyle, Colors } from '@dropthought/react-native-ui';
import SDKEntry from './SDKEntry';

const ModalProps = [
  'animated',
  'animationType',
  'transparent',
  'visible',
  'onRequestClose',
  'onShow',
  'presentationStyle',
  'supportedOrientations',
  'onDismiss',
  'onOrientationChange',
  'hardwareAccelerated',
];

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
/**
 * @param {SurveyModalProps & SDKEntryProps & ModalProps } props
 */
export function SurveyModal(props) {
  const sdkProps = omit(ModalProps, props);
  const modalProps = pick(ModalProps, props);
  //[DK-3764] add backgroundColor to prevent the broken ui issue
  const { backgroundColor, appearance } = props;
  let dummyBackgroundColor = Colors.white;
  if (backgroundColor) {
    dummyBackgroundColor = backgroundColor;
  } else if (appearance === 'dark') {
    dummyBackgroundColor = Colors.backgroundColorDark;
  }
  const containerStyle = {
    height,
    width,
    backgroundColor: dummyBackgroundColor,
  };
  return (
    <>
      <View style={containerStyle} />
      <Modal presentationStyle="overFullScreen" transparent {...modalProps}>
        <View style={GlobalStyle.flex1}>
          <SDKEntry {...sdkProps} />
        </View>
      </Modal>
    </>
  );
}

/** @type {React.Context<(param: OpenSurveyProps=) => void>} */
export const SurveyModalOpenSurveyContext = React.createContext(
  () => undefined
);

export const useOpenSurvey = () => {
  const context = React.useContext(SurveyModalOpenSurveyContext);
  if (context === undefined) {
    throw new Error('useOpenSurvey must be used within a SurveyModalContainer');
  }

  return context;
};

/**
 * @param {SurveyModalProps & SDKEntryProps & ModalProps } param0
 */
export const SurveyModalContainer = ({ children, onClose, ...props }) => {
  const [visible, setVisible] = React.useState(false);

  const [openSurveyProps, setOpenSurveyProps] = React.useState();

  const openSurvey = React.useCallback(
    (/** @type {SDKEntryProps} */ inputProps) => {
      setOpenSurveyProps(inputProps);
      setVisible(true);
    },
    []
  );

  const onCloseSurveyHandler = React.useCallback(() => {
    onClose && onClose();
    setVisible(false);
  }, [onClose]);

  return (
    <SurveyModalOpenSurveyContext.Provider value={openSurvey}>
      {children}
      {visible ? (
        <SurveyModal
          {...props}
          {...openSurveyProps}
          visible={visible}
          onClose={onCloseSurveyHandler}
        />
      ) : null}
    </SurveyModalOpenSurveyContext.Provider>
  );
};

/**
 * @typedef {import('./SurveyModal').SurveyModalProps} SurveyModalProps
 * @typedef {import('./SDKEntry').SDKEntryProps} SDKEntryProps
 * @typedef {import('react-native').ModalProps} ModalProps
 */

/**
 * @typedef {SDKEntryProps & ModalProps} OpenSurveyProps
 */
