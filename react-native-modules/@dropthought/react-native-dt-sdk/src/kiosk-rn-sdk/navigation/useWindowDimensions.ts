import * as React from 'react';
import { Dimensions } from 'react-native';
import type { ScaledSize } from 'react-native';

type DimensionsType = {
  height: number;
  width: number;
};

function useWindowDimensions() {
  const [dimensions, setDimensions] = React.useState<DimensionsType>(() => {
    const { height = 0, width = 0 } = Dimensions.get('window');
    return {
      height,
      width,
    };
  });
  React.useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      const { width, height } = window;
      setDimensions((d) => {
        if (width === d.width && height === d.height) {
          return d;
        }

        return {
          width,
          height,
        };
      });
    };
    onChange({
      window: Dimensions.get('window'),
    });
    const listener = Dimensions.addEventListener('change', onChange);

    return () => {
      listener?.remove();
    };
  }, []);

  return dimensions;
}

export default useWindowDimensions;
