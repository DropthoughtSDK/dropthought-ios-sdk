"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.set = set;

var _reactNativeSecureKeyStore = _interopRequireWildcard(require("react-native-secure-key-store"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function get(key, defaultValue = '') {
  // For retrieving key
  let result = defaultValue;

  try {
    result = await _reactNativeSecureKeyStore.default.get(key);
  } catch (_err) {}

  return result;
}

async function set(key, value) {
  await _reactNativeSecureKeyStore.default.set(key, value, {
    accessible: _reactNativeSecureKeyStore.ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
  });
  return value;
}
//# sourceMappingURL=secure-keystore.js.map