import * as React from 'react';

import { useIsVisible } from '../hooks/useIsVisible';

interface Props {}
export interface WithTrackingProps {
  isVisible?: boolean;
}

const event = () => {
  console.log('send tracking event');
};

export const withTracking = <P extends Props>(BaseComponent: React.FC<P>) => {
  return function Component(props: P) {
    const ref = React.useRef<HTMLDivElement>(null);
    const seen = React.useRef<boolean>(false);
    const isVisible = useIsVisible(ref);

    React.useEffect(() => {
      if (isVisible && !seen.current) {
        event();
        seen.current = true;
      }
    }, [isVisible]);
    return (
      <div ref={ref}>
        <BaseComponent {...props} newProp={true} />
      </div>
    );
  };
};
