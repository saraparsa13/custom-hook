import { useCallback, useRef } from "react";

const useLongPress = (
  onLongPress,
  defaultOptions
) => {
  const timeout = useRef();

  const start = useCallback(
    event => {
      timeout.current = setInterval(() => {
        onLongPress(event);
      }, defaultOptions.delay);
    },
    [onLongPress, defaultOptions.delay]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && onLongPress(event);
    },
    [onLongPress]
  );

  return {
    onMouseDown: e => start(e),
    onTouchStart: e => start(e),
    onMouseUp: e => clear(e),
    onMouseLeave: e => clear(e, false),
    onTouchEnd: e => clear(e)
  };
};

export default useLongPress;
