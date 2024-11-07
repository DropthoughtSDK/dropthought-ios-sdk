import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, StyleSheet, Text, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import GlobalStyle, { Colors } from '../styles';
import { useTheme } from '../contexts/theme';
import OpenURLButton from './OpenURLButton';
import ActivityIndicatorMask from './ActivityIndicatorMask';
import i18n from '../translation';
import useStateRef from '../hooks/useStateRef';
import { getImageSize } from '../utils/data';
const RELOAD_TIMEOUT = 30 * 1000;
const MAX_IMAGE_HEIGHT = 445;
const questionContainerWidth = Dimensions.get('window').width * 0.8;
const getImageExtension = url => {
  return (url === null || url === void 0 ? void 0 : url.split('.').pop()) || '';
};
const StatementQuestion = ({
  question,
  onFeedback
}) => {
  const {
    questionTitlePlain,
    statementProperty,
    questionId
  } = question;
  const {
    fontColor
  } = useTheme();
  const {
    addImage,
    addUrl,
    url = '',
    logo
  } = statementProperty;
  const rtl = i18n.dir() === 'rtl';
  const [size, setSize] = useState({
    width: questionContainerWidth,
    height: MAX_IMAGE_HEIGHT
  });
  const [loadingImage, setLoadingImage, loadingImageRef] = useStateRef(true);
  const [imageLoadError, setImageLoadError, imageLoadErrorRef] = useStateRef(false);
  const fetchImageSize = useCallback(
  /**
   * @param {string} uri
   */
  uri => {
    getImageSize(uri).then(imageSize => {
      const ratio = Math.min(questionContainerWidth / imageSize.width, MAX_IMAGE_HEIGHT / imageSize.height, 1);
      setSize({
        width: imageSize.width * ratio,
        height: imageSize.height * ratio
      });
    });
  }, []);
  useEffect(() => {
    if (logo && getImageExtension(logo) !== 'svg') {
      fetchImageSize(logo);
    }

    // this feedback means user has read it.
    onFeedback({
      questionId,
      answers: [''],
      type: 'statement'
    });
  }, [fetchImageSize, logo, onFeedback, questionId]);
  const descriptionStyle = [styles.description, rtl && GlobalStyle.textAlignRight, {
    color: fontColor
  }];

  //@ts-ignore
  const earthIcon = /*#__PURE__*/React.createElement(Image, {
    source: require('../assets/ic-earth.png')
  });
  const urlComponent = addUrl ? /*#__PURE__*/React.createElement(View, {
    style: [styles.urlContainer, rtl && GlobalStyle.flexRowReverse]
  }, earthIcon, /*#__PURE__*/React.createElement(OpenURLButton, {
    url: url
  })) : null;
  const triggerReload = useCallback(() => {
    if (logo && getImageExtension(logo) !== 'svg') {
      fetchImageSize(logo);
    }
    setImageLoadError(false);
    setLoadingImage(true);
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        if (!imageLoadErrorRef.current && loadingImageRef.current) {
          setImageLoadError(true);
          setLoadingImage(false);
        }
      }, RELOAD_TIMEOUT);
    }
  }, [fetchImageSize, imageLoadErrorRef, loadingImageRef, logo, setImageLoadError, setLoadingImage]);
  const reloadTextStyle = [styles.reloadText, {
    color: fontColor
  }];
  const imageComponent = () => {
    if (addImage) {
      if (imageLoadError) {
        return /*#__PURE__*/React.createElement(TouchableOpacity, {
          style: styles.reloadContainer,
          onPress: triggerReload
        }, /*#__PURE__*/React.createElement(Image, {
          source: require('../assets/ic_image_placeholder.png')
        }), /*#__PURE__*/React.createElement(View, {
          style: GlobalStyle.row
        }, /*#__PURE__*/React.createElement(Image, {
          source: require('../assets/ic_reload.png'),
          tintColor: fontColor
        }), /*#__PURE__*/React.createElement(Text, {
          style: reloadTextStyle
        }, `${i18n.t('picture-choice:reload')}`)));
      } else {
        return /*#__PURE__*/React.createElement(View, {
          style: styles.imageContainer
        }, getImageExtension(logo) === 'svg' ? /*#__PURE__*/React.createElement(SvgUri, {
          width: "100%",
          height: MAX_IMAGE_HEIGHT,
          uri: logo || '',
          onLoad: () => {
            setLoadingImage(false);
          }
        }) : /*#__PURE__*/React.createElement(Image, {
          style: [styles.image, size],
          source: {
            uri: logo
          },
          onLoadStart: () => setLoadingImage(true),
          onLoadEnd: () => setLoadingImage(false),
          onError: _ => {
            setImageLoadError(true);
            setLoadingImage(false);
          }
        }), /*#__PURE__*/React.createElement(ActivityIndicatorMask, {
          loading: loadingImage
        }));
      }
    }
    return null;
  };
  return /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.content
  }, imageComponent(), /*#__PURE__*/React.createElement(Text, {
    style: descriptionStyle
  }, questionTitlePlain), urlComponent));
};
export default /*#__PURE__*/React.memo(StatementQuestion);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    ...GlobalStyle.flex1
  },
  content: {
    gap: 20
  },
  image: {
    width: '100%',
    height: MAX_IMAGE_HEIGHT,
    resizeMode: 'contain',
    borderRadius: 20
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  urlContainer: {
    flexDirection: 'row',
    gap: 10
  },
  reloadContainer: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.rankingBorder,
    paddingVertical: 36,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 22
  },
  reloadText: {
    fontSize: 14,
    marginLeft: 6
  }
});
//# sourceMappingURL=StatementQuestion.js.map