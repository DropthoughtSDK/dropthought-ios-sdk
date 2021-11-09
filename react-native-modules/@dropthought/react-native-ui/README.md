# react-native-sdk-ui

UI element for Dropthought React Native SDK

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
[react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context#getting-started)
## Usage
### KioskProvider
This component provides the theme setting to all components.
- Props:
  - `theme`: system | light | dark
  - `fontColor`: [React Native Color Reference](https://reactnative.dev/docs/colors)
  - `backgroundColor`: [React Native Color Reference](https://reactnative.dev/docs/colors)

```js
import { KioskProvider, THEME_OPTIONS } from "@dropthought/react-native-ui";

<KioskProvider
  theme={THEME_OPTIONS.SYSTEM}
  fontColor="white"
  backgroundColor="#4c3794"
>
  {/* ... */}
</KioskProvider>
```
### useTheme
A custom hook returns theme setting.
```js
import { useTheme } from "@dropthought/react-native-ui";

const { colorScheme, fontColor, backgroundColor } = useTheme()
```
### useDimensionWidthType
A custom hook returns current screen type.
- screen types: phone | tablet
```js
import { useDimensionWidthType } from "@dropthought/react-native-ui";

const widthType = useDimensionWidthType()
```
### i18n
A helper returns localization content.
```js
import { i18n } from "@dropthought/react-native-ui";

i18n.t('start-survey:placeholder-message')
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
### EndScreenLayout
Survey end screen component.
- Props:
  - `survey`: Survey
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
