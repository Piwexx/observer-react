import { useEffect, useRef, useState } from 'react';
import { observe } from 'tu-libreria';

export function useIsVisible(ref: React.RefObject<Element>, options: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    stopRef.current = observe(
      el,
      (entry) => {
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
