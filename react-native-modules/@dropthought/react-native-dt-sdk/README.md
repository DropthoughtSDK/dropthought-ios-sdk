# react-native-dt-sdk

dropthought sdk for react-native

## Installation

Using npm:

```sh
npm install @dropthought/react-native-dt-sdk
```

or using yarn:

```sh
yarn add @dropthought/react-native-dt-sdk
```

### Installing dependencies

- [react-native-aes-crypto](https://www.npmjs.com/package/react-native-aes-crypto)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context#getting-started)
- [react-native-secure-key-store](https://www.npmjs.com/package/react-native-secure-key-store)
- [lottie-react-native](https://github.com/lottie-react-native/lottie-react-native)
- [ramda](https://github.com/ramda/ramda)
- [react-native-draggable-flatlist](https://github.com/computerjazz/react-native-draggable-flatlist)
- [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)

## Usage

```js
import {
  SurveyModalContainer,
  useOpenSurvey,
  initialize,
  APPEARANCE,
  THEME_OPTIONS,
} from '@dropthought/react-native-dt-sdk';

initialize({
  apiKey: API_KEY,
  storage: AsyncStorage,
});

<SurveyModalContainer>
  {/* ... */}
</SurveyModalContainer>;
```

### initialize

Used to initialize Dropthought with your apiKey & preferred storage

```js
import { initialize } from '@dropthought/react-native-dt-sdk';
import AsyncStorage from '@react-native-community/async-storage';

initialize({
  apiKey: 'your apiKey',
  storage: AsyncStorage,
});
```

### SurveyModalContainer

This component configures the survey settings.

- Props:
  - `surveyId`: survey id
  - `themeOption`: THEME_OPTION.CLASSIC | THEME_OPTION.OPTION1 | THEME_OPTION.OPTION2 | ...
  - `appearance`: APPEARANCE.SYSTEM | APPEARANCE.LIGHT | APPEARANCE.DARK
  - `fontColor`: [React Native Color Reference](https://reactnative.dev/docs/colors)
  - `backgroundColor`: [React Native Color Reference](https://reactnative.dev/docs/colors)
  - `onClose`: The `onClose` prop allows passing a function that will be called once the modal has been closed.

```js
import { SurveyModalContainer, THEME_OPTIONS } from 'react-native-dt-sdk';

<SurveyModalContainer
  surveyId={surveyId}
  themeOption={themeOption}
  appearance={appearance}
  fontColor={fontColor}
  backgroundColor={backgroundColor}
  onClose={() => {}}
>
  {/* ... */}
</SurveyModalContainer>;
```
It's not necessary to pass these props at `SurveyModalContainer`. You can pass them though `openSurvey`

```js
const openSurvey = useOpenSurvey();

// use visibility
openSurvey({
  visibilityId,
});

// use surveyId
openSurvey({
  surveyId,
  themeOption,
  appearance,
  fontColor,
  backgroundColor,
});
```

### useOpenSurvey

A custom hook returns the function that opens the dropthought survey.

```js
import { useTheme } from '@dropthought/react-native-ui';

const openSurvey = useOpenSurvey();
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
