import React, { useContext, useMemo } from "react";
const DraggableFlatListContext = /*#__PURE__*/React.createContext(undefined);
export default function DraggableFlatListProvider(_ref) {
  let {
    activeKey,
    keyExtractor,
    horizontal,
    children
  } = _ref;
  const value = useMemo(() => ({
    activeKey,
    keyExtractor,
    horizontal
  }), [activeKey, keyExtractor, horizontal]);
  return /*#__PURE__*/React.createElement(DraggableFlatListContext.Provider, {
    value: value
  }, children);
}
export function useDraggableFlatListContext() {
  const value = useContext(DraggableFlatListContext);

  if (!value) {
    throw new Error("useDraggableFlatListContext must be called within DraggableFlatListProvider");
  }

  return value;
}
//# sourceMappingURL=draggableFlatListContext.js.map