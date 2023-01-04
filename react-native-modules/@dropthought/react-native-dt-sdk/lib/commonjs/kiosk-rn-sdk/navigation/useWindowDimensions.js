"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useWindowDimensions() {
  const [dimensions, setDimensions] = React.useState(() => {
    const {
      height = 0,
      width = 0
    } = _reactNative.Dimensions.get('window');

    return {
      height,
      width
    };
  });
  React.useEffect(() => {
    const onChange = ({
      window
    }) => {
      const {
        width,
        height
      } = window;
      setDimensions(d => {
        if (width === d.width && height === d.height) {
          return d;
        }

        return {
          width,
          height
        };
      });
    };

    onChange({
      window: _reactNative.Dimensions.get('window')
    });

    const listener = _reactNative.Dimensions.addEventListener('change', onChange);

    return () => {
      listener === null || listener === void 0 ? void 0 : listener.remove();
    };
  }, []);
  return dimensions;
}

var _default = useWindowDimensions;
exports.default = _default;
//# sourceMappingURL=useWindowDimensions.js.map