# react-native-dt-sdk

This repository contains all the sources of dropthought SDK for react-native

## Latest version

- 5.2.0

## Features

- Multiple open question
- Matrix rating
- Dropdown
- Rating slider
- Ranking

## Requirement

- react-native version above 0.64.1

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

## initialize

To initialize Dropthought SDK with your apiKey & preferred storage. You can put the code inside the `index.js`

```js
import {
  SurveyModalContainer,
  initialize,
} from '@dropthought/react-native-dt-sdk';

initialize({
  apiKey: 'YOUR_API_KEY',
  storage: AsyncStorage,
});

// Add this container outer your compnent
<SurveyModalContainer>{/* Your components */}</SurveyModalContainer>;
```

_Note: You can find you API key on the web dashboard. (If you don't have permission, please contact your admin)_

<img src="https://github.com/DropthoughtSDK/dropthought-ios-sdk/raw/master/imgs/image_apiKey.jpeg">

</br>
</br>

## Open survey screen

Declare
`const openSurvey = useOpenSurvey()` and use `openSurvey` whenever you need to open the survey screen.

```js
import { useOpenSurvey } from '@dropthought/react-native-dt-sdk';

// ...

const onButtonPress = () => {
  // declare this hook
  const openSurvey = useOpenSurvey();

  // survey screen will be open by calling below method
  openSurvey({
    visibilityId: 'YOUR_VISIBILITY_ID',
  });
};
```

_Note: You can find and copy your visibility ID here in Enterprise app_

<img src="https://github.com/DropthoughtSDK/dropthought-ios-sdk/raw/master/imgs/image_visibility.jpeg">

</br>
</br>

## Additional features

### - Set survey metadata

```js
import { useOpenSurvey } from '@dropthought/react-native-dt-sdk';

// ...

const onButtonPress = () => {
  // declare this hook
  const openSurvey = useOpenSurvey();

  // declare the metadata you desire
  const metadata = { name: 'barney', age: '36' };

  // survey screen will be open by calling below method
  openSurvey({
    visibilityId: 'YOUR_VISIBILITY_ID',
    metadata: metadata,
  });
};
```

</br>

### - Upload offline feedbacks

Dropthought SDK will cache user's feedbacks if there has no network connection. You can call this function and we will check if there's any cached feedbacks and submit them again.

When user finishes a survey under no network or a bad network, the survey feedback is saved offline. Dropthought SDK will try to upload the offline feedbacks(if any) when app start.

Or, you could call

```
feedbackUploader.upload()
```

manually to try to upload the saved results once if your app has network status monitor.
</br>
</br>

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.
</br>
</br>

## License

MIT
