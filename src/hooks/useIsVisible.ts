import * as React from 'react';

type Ref = React.RefObject<Element | null>;

export function useIsVisible(ref: Ref): boolean {
  const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false);

  const observer = new IntersectionObserver((entries) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
  });

  React.useEffect(() => {
    const currentRef = ref.current;
    if (currentRef !== null) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef !== null) {
        observer.unobserve(currentRef);
      }
    };
  }, [observer, ref]);

  return isIntersecting;
}
