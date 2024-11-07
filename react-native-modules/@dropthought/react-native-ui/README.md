# react-native-ui

UI element for Dropthought React Native SDK

## Latest version

- 5.12.0

## Minimum RN version required

- &gt;= 0.69 (Please refer: [react-native-document-picker](https://github.com/rnmods/react-native-document-picker#rn--069))

## Installation

Using npm:

```sh
npm install @dropthought/react-native-ui
```

or using yarn:

```sh
yarn add @dropthought/react-native-ui
```

### Installing dependencies

- [lottie-react-native](https://github.com/lottie-react-native/lottie-react-native)
- [react-native-document-picker](https://github.com/rnmods/react-native-document-picker)
- [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context#getting-started)
- [react-native-webview](https://github.com/react-native-webview/react-native-webview)
- [react-native-svg](https://github.com/react-native-community/react-native-svg)

## Usage

### KioskProvider

This component provides the theme (classic) setting to all components.

- Props:
  - `themeOption`: THEME_OPTION.CLASSIC | THEME_OPTION.OPTION1 | THEME_OPTION.OPTION2 | THEME_OPTION.OPTION3 | THEME_OPTION.OPTION4 | THEME_OPTION.OPTION6 | THEME_OPTION.BIJLIRIDE(NEW)
  - `appearance`: APPEARANCE.SYSTEM | APPEARANCE.LIGHT | APPEARANCE.DARK
  - `hexCode`: [React Native Color Reference](https://reactnative.dev/docs/colors)
  - `fontColor`: [React Native Color Reference](https://reactnative.dev/docs/colors)
  - `backgroundColor`: [React Native Color Reference](https://reactnative.dev/docs/colors)
  - `autoClose`: Boolean (enable auto close on end page)
  - `autoCloseCountdown`: Number (countdown in ms)

```js
import { KioskProvider, APPEARANCE } from '@dropthought/react-native-ui';

<KioskProvider
  themeOption={THEME_OPTION.CLASSIC}
  appearance={APPEARANCE.SYSTEM}
  hex="#4b3693"
  fontColor="white"
  backgroundColor="#4c3794"
  autoClose={true}
  autoCloseCountdown={3000}
>
  {/* ... */}
</KioskProvider>;
```

### useTheme

A custom hook returns theme setting.

```js
import { useTheme } from '@dropthought/react-native-ui';

const {
  themeOption,
  colorScheme,
  hexCode,
  fontColor,
  backgroundColor,
  autoClose,
  autoCloseCountdown,
} = useTheme();
```

### useDimensionWidthType

A custom hook returns current screen type.

- screen types: phone | tablet

```js
import { useDimensionWidthType } from '@dropthought/react-native-ui';

const widthType = useDimensionWidthType();
```

### i18n

A helper returns localization content.

```js
import { i18n } from '@dropthought/react-native-ui';

i18n.t('start-survey:placeholder-message');
```

### GlobalStyle

Collection of predefined styles.

### ActivityIndicatorMask

A activity indicator component.

- Props:
  - `loading`: true | false

### PlaceholderScreen

Activity indicator component.

- Props:
  - `message`: string
  - `imageSource`: string
  - `imageType`: IPlaceholderImageTypesType

### StartScreenLayout

Survey start screen component.

- Props:
  - `onLanguageSelect`: (language: string) => void
  - `onStart`: () => void
  - `survey`: Survey

### SurveyScreenLayout

Survey component.

- Props:
  - `pageIndex`: number
  - `survey`: Survey
  - `onSubmit`: (surveyFeedback: SurveyFeedback) => void
  - `onNextPage`: (nextPageIndex: number) => void
  - `onPrevPage`: () => void
  - `onPageEnter`: () => void
  - `onPageLeave`: () => void
  - `onFeedback`: () => void
  - `SurveyProgressBar`: ReactNode
  - `surveyProgressBarPosition`: ReactNode
  - `SurveyPageIndicator`: ReactNode
  - `onUpload`: (file: ImageFileProps) => Promise<string | undefined>
  - `isUploading`: boolean | undefined;

### EndScreenLayout

Survey end screen component.

- Props:
  - `survey`: Survey

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
