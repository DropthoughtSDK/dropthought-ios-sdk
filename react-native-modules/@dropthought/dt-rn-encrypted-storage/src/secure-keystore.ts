import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store'

export async function get(
  key: string,
  defaultValue: string = ''
): Promise<string> {
  // For retrieving key
  let result = defaultValue
  try {
    result = await RNSecureKeyStore.get(key)
  } catch (_err) {}
  return result
}

export async function set(key: string, value: string): Promise<string> {
  await RNSecureKeyStore.set(key, value, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
  })
  return value
}
