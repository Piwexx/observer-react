import { observeElements } from 'observer-ts';
import { useEffect, useState } from 'react';

export function useIsVisible(ref: React.RefObject<Element>, options: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const stop = observeElements(
      el,
      (entry: IntersectionObserverEntry) => {
        setIsVisible(entry.isIntersecting);
      },
      options,
    );

    return () => {
      stop();
    };
  }, [options]);

  return isVisible;
}
