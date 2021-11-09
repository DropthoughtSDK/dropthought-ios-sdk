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

## Usage

```js
import {
  SurveyModalContainer,
  useOpenSurvey,
  initialize,
  THEME_OPTIONS,
} from 'react-native-dt-sdk';

initialize({
  apiKey: API_KEY,
  storage: AsyncStorage,
});

<SurveyModalContainer
  surveyId={surveyId}
  theme={theme}
  fontColor={fontColor}
  backgroundColor={backgroundColor}
  onClose={() => {}}
>
  {/* ... */}
</SurveyModalContainer>;
```

### initialize

Used to initialize Dropthought with your apiKey & preferred storage

```js
import { initialize } from 'react-native-dt-sdk';
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
  - `theme`: system | light | dark
  - `fontColor`: [React Native Color Reference](https://reactnative.dev/docs/colors)
  - `backgroundColor`: [React Native Color Reference](https://reactnative.dev/docs/colors)
  - `onClose`: The `onClose` prop allows passing a function that will be called once the modal has been closed.

```js
import { SurveyModalContainer, THEME_OPTIONS } from 'react-native-dt-sdk';

<SurveyModalContainer
  surveyId={surveyId}
  theme={theme}
  fontColor={fontColor}
  backgroundColor={backgroundColor}
  onClose={() => {}}
>
  {/* ... */}
</SurveyModalContainer>;
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
