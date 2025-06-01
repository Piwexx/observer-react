import { mutationElements } from 'observer-ts';
import { useEffect, useRef, useState } from 'react';

type ExtractorFn = (target: Element) => string;

export function useMutationObserver(
  ref: React.RefObject<Element>,
  options?: MutationObserverInit,
  extractor: ExtractorFn = (el) => el.textContent || '',
): String {
  const [value, setValue] = useState('');
  const prevSizeRef = useRef('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const stop = mutationElements(
      el,
      (mutation: MutationRecord) => {
        const current = extractor(mutation.target as Element);

        if (current !== prevSizeRef.current) {
          prevSizeRef.current = current;
          setValue(current);
        }
      },
      options || {},
    );

    return () => {
      stop();
    };
  }, [ref, options, extractor]);

  return value;
}
