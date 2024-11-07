export const Colors = {
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
  contentBackground: '#F3F5F8',
  nonSelectCircle: '#aeb3be',
  lightActionText: '#121212',
  darkActionText: '#e1e1e1',
  bijlirideBackgroundColor: '#32cbf1',
  bijlirideHexCode: '#407d37',
  lightActionBackground: 'rgba(249, 249, 249, 0.78)',
  urlBlue: '#218ddd',
};

export const addOpacityToColor = (hexColor: string, opacity: number) => {
  const o = Math.max(0, Math.min(1, opacity)); // bound opacity from 0 to 1
  const intValue = Math.round(o * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return `${hexColor}${hexValue.padStart(2, '0').toUpperCase()}`; // format with leading 0 and upper case characters
};

// https://css-tricks.com/8-digit-hex-codes/
export const opacity10 = (color: string) => `${color}1a`;
export const opacity15 = (color: string) => `${color}26`;
export const opacity30 = (color: string) => `${color}4d`;
export const opacity60 = (color: string) => `${color}99`;

export const Option1BackgroundColor = [
  '#ff8d8d',
  '#ffca8d',
  '#8de0ff',
  '#dbffb1',
  '#feed8d',
];

export const Option1BackgroundColorDark = [
  '#b2706d',
  '#b5976e',
  '#76a3bb',
  '#a4b986',
  '#b8af6e',
];

export function addOpacityToHex(hexColor: string, opacity: number) {
  const o = Math.max(0, Math.min(1, opacity)); // bound opacity from 0 to 1
  const intValue = Math.round(o * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return `${hexColor}${hexValue.padStart(2, '0').toUpperCase()}`; // format with leading 0 and upper case characters
}
