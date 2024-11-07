import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
export async function get(key) {
  let defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  // For retrieving key
  let result = defaultValue;
  try {
    result = await RNSecureKeyStore.get(key);
  } catch (_err) {}
  return result;
}
export async function set(key, value) {
  await RNSecureKeyStore.set(key, value, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  });
  return value;
}
//# sourceMappingURL=secure-keystore.js.map