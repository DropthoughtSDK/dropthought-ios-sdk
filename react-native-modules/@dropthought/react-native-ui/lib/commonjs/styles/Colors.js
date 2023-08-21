"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.opacity60 = exports.opacity30 = exports.opacity15 = exports.opacity10 = exports.addOpacityToColor = exports.Option1BackgroundColorDark = exports.Option1BackgroundColor = exports.Colors = void 0;
const Colors = {
  purple: '#4c3794',
  border: '#9b9b9b',
  secondary: '#ECEFF4',
  borderColor: '#c2c2c2',
  borderColorDark: '#5454548F',
  borderFocusedColor: '#4c3794',
  backgroundGrey: '#f5f6fa',
  backgroundGreyMask: '#f5f6facf',
  white: '#ffffff',
  dateGrey: '#8b8b8b',
  buttonGrey: '#dcdcdc',
  black: '#000000',
  backdropBG: '#rgba(0,0,0,0.24)',
  dividerGrey: '#d1d1d1',
  errorHintColor: '#a30000',
  statusBarDivider: '#CCC',
  sliderBarGrey: '#efefef',
  transparent: '#00000000',
  settingsGreyText: '#676767',
  settingsBlackText: '#464646',
  settingsStatusText: '#7d7d7d',
  settingsButtonDisable: '#c9c8c8',
  maskColor: '#2229',
  warnRed: '#FAE1E0',
  red: '#a30000',
  statusBarGrey: '#2b2b2b',
  questionGrey: '#828282',
  openQuestionSubTitle: '#91979f',
  sliderShadowColor: '#e2e2e2',
  versionGrey: '#8c8c8c',
  inputPlaceholder: '#a5a5a5',
  progressBarText: '#5f626a',
  mandatoryRed: '#e64119',
  loadingMaskBG: '#FFFFFF9C',
  placeholderText: '#443f57',
  defaultThemeColor: '#5e9ae2',
  fontColorLight: '#000',
  fontColorDark: '#FFFFFFDE',
  backgroundColorLight: '#FFF',
  backgroundColorDark: '#171717',
  sliderBackgroundDark: '#FFFFFF1A',
  unSelectedBackground: '#f1f4f9',
  smileyRatingScoreGray: '#adadb2',
  appearanceSubBlack: '#f5f5f7',
  warningRed: '#cb4647',
  rankingBorder: '#e1e4eb',
  rankingBorderDark: '#343434',
  rankingBG: '#fafbfc',
  rankingBGDark: '#272727',
  rankingContainerBorder: '#c7cad1',
  rankingContainerBorderDark: '#404040',
  rankingContainerBgDark: '#39393a',
  divider: 'rgba(60, 60, 67, 0.36)',
  rankingCheckBoxBorder: '#a8a8a8',
  sliderLabel: '#848a93',
  sliderTrack: '#4b3694',
  contentBackground: '#F3F5F8'
};
exports.Colors = Colors;

const addOpacityToColor = (hexColor, opacity) => {
  const o = Math.max(0, Math.min(1, opacity)); // bound opacity from 0 to 1

  const intValue = Math.round(o * 255); // map percent to nearest integer (0 - 255)

  const hexValue = intValue.toString(16); // get hexadecimal representation

  return `${hexColor}${hexValue.padStart(2, '0').toUpperCase()}`; // format with leading 0 and upper case characters
}; // https://css-tricks.com/8-digit-hex-codes/


exports.addOpacityToColor = addOpacityToColor;

const opacity10 = color => `${color}1a`;

exports.opacity10 = opacity10;

const opacity15 = color => `${color}26`;

exports.opacity15 = opacity15;

const opacity30 = color => `${color}4d`;

exports.opacity30 = opacity30;

const opacity60 = color => `${color}99`;

exports.opacity60 = opacity60;
const Option1BackgroundColor = ['#ff8d8d', '#ffca8d', '#8de0ff', '#dbffb1', '#feed8d'];
exports.Option1BackgroundColor = Option1BackgroundColor;
const Option1BackgroundColorDark = ['#b2706d', '#b5976e', '#76a3bb', '#a4b986', '#b8af6e'];
exports.Option1BackgroundColorDark = Option1BackgroundColorDark;
//# sourceMappingURL=Colors.js.map