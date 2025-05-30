import { resizeElements } from 'observer-ts';
import { useEffect, useRef, useState } from 'react';

type Size = {
  width: number | undefined;
  height: number | undefined;
};

const initialSize: Size = {
  width: undefined,
  height: undefined,
};

export function useResizeObserver(
  ref: React.RefObject<Element>,
  options?: ResizeObserverOptions,
): Size {
  const [size, setSize] = useState(initialSize);
  const prevSizeRef = useRef<Size>(initialSize);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const stop = resizeElements(
      el,
      (entry: ResizeObserverEntry) => {
        const { width, height } = entry.contentRect;
        const prev = prevSizeRef.current;

        if (width !== prev.width || height !== prev.height) {
          prevSizeRef.current = { width, height };
          setSize({ width, height });
        }
      },
      options || {},
    );

    return () => {
      stop();
    };
  }, [ref, options]);

  return size;
}
