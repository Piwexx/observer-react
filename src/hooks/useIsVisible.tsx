import { observeElements } from 'observer-ts';
import { useEffect, useRef, useState } from 'react';

export function useIsVisible(ref: React.RefObject<Element>, options: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    stopRef.current = observeElements(
      el,
      (entry: IntersectionObserverEntry) => {
        setIsVisible(entry.isIntersecting);
      },
      options,
    );

    return () => {
      stopRef.current?.();
    };
  }, [ref.current, JSON.stringify(options)]);

  return isVisible;
}
