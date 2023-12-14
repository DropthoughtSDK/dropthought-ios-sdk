import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import GlobalStyle, { Colors, addOpacityToHex } from '../styles';
import ActivityIndicatorMask from './ActivityIndicatorMask';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import i18n from '../translation';

type ChooseIconProps = {
  isMultipleChoice: boolean;
  selected: boolean;
  themeColor: string;
};
export const ChooseIcon = ({
  isMultipleChoice,
  selected,
  themeColor,
}: ChooseIconProps) => {
  const iconStyle = {
    tintColor: themeColor,
    height: 18,
    width: 18,
  };

  const cubeStyle = isMultipleChoice
    ? [styles.nonSelectedSquare, { borderColor: themeColor }]
    : [styles.nonSelectedCirle, { borderColor: themeColor }];

  return selected ? (
    <Image
      style={iconStyle}
      source={
        isMultipleChoice
          ? require('../assets/icCheckBox24Px.png')
          : require('../assets/ic_picture_select.png')
      }
    />
  ) : (
    <View style={cubeStyle} />
  );
};

type Props = {
  title: string;
  uri: string;
  isMultipleChoice: boolean;
  selected: boolean;
  columnGap: number;
  onPress: () => void;
  index: number;
  themeColor: string;
};
const PictureChoiceItem = ({
  title,
  uri,
  isMultipleChoice,
  selected,
  columnGap,
  onPress,
  index,
  themeColor,
}: Props) => {
  const { fontColor, colorScheme } = useTheme();
  const rtl = i18n.dir() === 'rtl';

  const itemGapStyle = useMemo(() => {
    if (rtl) {
      return {
        marginLeft: index % 2 === 0 ? columnGap : 0,
      };
    } else {
      return {
        marginRight: index % 2 === 0 ? columnGap : 0,
      };
    }
  }, [columnGap, index, rtl]);

  const { width } = Dimensions.get('window');
  const questionMargin = 30;
  const itemWidth = Math.floor((width - 2 * questionMargin - columnGap) / 2);

  const [loadingImage, setLoadingImage] = useState(true);
  const [imageLoadError, setImageLoadError] = useState(false);

  const photo = useMemo(() => {
    const iconStyle = { tintColor: themeColor };
    const photoStyle = [styles.picture, { width: itemWidth }];
    const reloadTextStyle = [
      styles.reloadText,
      {
        color: fontColor,
      },
    ];
    if (imageLoadError) {
      const reloadStyle = [
        styles.pictureReloadContainer,
        {
          width: itemWidth,
          backgroundColor: addOpacityToHex(themeColor, 0.1),
          borderColor: themeColor,
        },
      ];
      const reloadPlacholderStyle = [styles.reloadPlaceholderImage, iconStyle];
      return (
        <View style={reloadStyle}>
          <Image
            style={reloadPlacholderStyle}
            source={require('../assets/ic_image_placeholder.png')}
          />
          <View style={GlobalStyle.row}>
            <Image
              style={iconStyle}
              source={require('../assets/ic_reload.png')}
            />
            <Text style={reloadTextStyle}>
              {`${i18n.t('picture-choice:reload')}`}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <Image
          style={photoStyle}
          source={{ uri }}
          onLoadStart={() => setLoadingImage(true)}
          onLoadEnd={() => setLoadingImage(false)}
          onError={(_error) => {
            setImageLoadError(true);
            setLoadingImage(false);
          }}
        />
      );
    }
  }, [fontColor, imageLoadError, itemWidth, themeColor, uri]);

  const border = useMemo(() => {
    const containerStyle = [
      styles.borderContainer,
      {
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? themeColor : Colors.rankingBorder,
        width: itemWidth,
      },
    ];
    const maskStyle = {
      backgroundColor: addOpacityToHex(themeColor, 0.1),
    };
    return (
      <View style={containerStyle}>
        <ActivityIndicatorMask loading={loadingImage} style={maskStyle} />
      </View>
    );
  }, [itemWidth, loadingImage, selected, themeColor]);

  const selection = useMemo(() => {
    const containerStyle = [
      styles.optionContainer,
      rtl && GlobalStyle.flexRowReverse,
    ];

    const textStyle =
      colorScheme === COLOR_SCHEMES.dark
        ? [styles.optionText, { color: fontColor ?? Colors.appearanceSubBlack }]
        : [styles.optionText, { color: fontColor }];
    return (
      <View style={containerStyle}>
        <ChooseIcon
          isMultipleChoice={isMultipleChoice}
          selected={selected}
          themeColor={themeColor}
        />
        <Text style={textStyle}>{title}</Text>
      </View>
    );
  }, [
    colorScheme,
    fontColor,
    isMultipleChoice,
    rtl,
    selected,
    themeColor,
    title,
  ]);

  return (
    <TouchableOpacity
      style={itemGapStyle}
      onPress={() => {
        if (imageLoadError) {
          setImageLoadError(false);
          setLoadingImage(true);
        } else {
          onPress();
        }
      }}
    >
      {/* keep this <View>, otherwise the photo's height will increase accroding to PictureChoiceOtherItem */}
      <View>
        {photo}
        {border}
        {selection}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(PictureChoiceItem);

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 25,
    minHeight: 20,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 5,
  },
  picture: {
    height: 138,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.rankingBorder,
  },
  pictureReloadContainer: {
    height: 138,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.rankingBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reloadPlaceholderImage: {
    marginBottom: 8,
  },
  reloadText: {
    fontSize: 12,
    marginLeft: 4,
  },
  nonSelectedCirle: {
    width: 18,
    height: 18,
    borderColor: Colors.nonSelectCircle,
    borderWidth: 1,
    borderRadius: 9,
    marginTop: 1,
  },
  nonSelectedSquare: {
    width: 18,
    height: 18,
    borderColor: Colors.nonSelectCircle,
    borderWidth: 1,
    borderRadius: 2,
    marginTop: 1,
  },
  borderContainer: {
    position: 'absolute',
    height: 138,
    borderRadius: 12,
    borderColor: 'red',
    overflow: 'hidden',
  },
});
