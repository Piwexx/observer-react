import { act, render } from '@testing-library/react';
import * as observerModule from 'observer-ts'; // ✅ para spyOn
import { useEffect, useRef } from 'react';

import { useIsVisible } from '../useIsVisible';

let triggerCallback: (entry: IntersectionObserverEntry) => void;

vi.mock('observer-ts');

beforeEach(() => {
  // Mock de observeElements: captura el callback y devuelve cleanup simulado
  vi.spyOn(observerModule, 'observeElements').mockImplementation((element, callback, options) => {
    triggerCallback = callback;

    return vi.fn(); // función de cleanup
  });
});

function MockComponent({ onVisible }: { onVisible: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref, { threshold: 0.5 });

  useEffect(() => {
    if (isVisible) {
      onVisible();
    }
  }, [isVisible]);

  return <div ref={ref} data-testid="target" />;
}

describe('useIsVisible', () => {
  it('debe ejecutar el callback cuando el elemento se vuelve visible', () => {
    const onVisible = vi.fn();
    const { getByTestId } = render(<MockComponent onVisible={onVisible} />);
    const el = getByTestId('target');

    // Simula que el elemento es visible
    act(() => {
      triggerCallback({
        target: el,
        isIntersecting: true,
      } as IntersectionObserverEntry);
    });

    expect(onVisible).toHaveBeenCalled();
  });

  it('no debe ejecutar el callback si el elemento no es visible', () => {
    const onVisible = vi.fn();
    const { getByTestId } = render(<MockComponent onVisible={onVisible} />);
    const el = getByTestId('target');

    // Simula que el elemento no es visible
    act(() => {
      triggerCallback({
        target: el,
        isIntersecting: false,
      } as IntersectionObserverEntry);
    });

    expect(onVisible).not.toHaveBeenCalled();
  });

  it('debe limpiar la observación al desmontar', () => {
    const cleanup = vi.fn();
    vi.spyOn(observerModule, 'observeElements').mockImplementation((element, callback, options) => {
      triggerCallback = callback;
      return cleanup;
    });

    const { unmount } = render(<MockComponent onVisible={() => {}} />);
    unmount();

    expect(cleanup).toHaveBeenCalled();
  });
});
