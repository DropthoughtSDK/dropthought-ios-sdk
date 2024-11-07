# dt-rn-encrypted-storage

encrypted storage for DT

## Installation

### Install Dependencies

```sh
yarn add react-native-aes-crypto react-native-secure-key-store
```

### Install package

```sh
yarn add @dropthought/dt-rn-encrypted-storage
```

## Usage

### Create an instance of EncryptedStorage

you should pass the storage you want to use (for example, AsyncStorage):

```js
import AsyncStorage from '@react-native-async-storage/async-storage'
import {EncryptedStorage} from '@dropthought/dt-rn-encrypted-storage'

const encryptedStorageClient = new EncryptedStorage(AsyncStorage)
```

### Set the account and the passphrase

this library would use the passphrase you provide to create a key for this account; whenever you use the `encryptedStorageClient` to set/get data from storage, the data would be prefixed with your account and encrypted with the key:

```js
encryptedStorageClient.setAccount(
  accountText,
  'any phrase, token, password, ...'
)
```

### get/set data with setItemT and getItemT for JSON object

it use `JSON.stringify` and `JSON.parse` to serialize/deserialize the data

```js
await encryptedStorageClient.setItemT('key1', {
  time: Date.now(),
  value: 1234,
  arr: [1, 2, 3],
})

const data = await encryptedStorageClient.getItemT('key1')

// the data should be the object above
```

### get/set data with setItem and getItem for string

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
